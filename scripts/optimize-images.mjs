import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const rootDir = process.cwd();
const srcImagesDir = path.join(rootDir, 'src', 'assets', 'images');
const publicDir = path.join(rootDir, 'public');
const stagingDir = path.join(rootDir, 'staging_optimized');

// Ensure staging directory exists
if (!fs.existsSync(stagingDir)) {
  fs.mkdirSync(stagingDir, { recursive: true });
}

// Logo filenames that need transparency preserved as PNG or lossless/high-alpha WebP
const logoFiles = new Set([
  'nobg_sailogo.png',
  'sai_final_logo.png',
  'sai_bg_logo.png',
  'sai_gray_bg.png',
  'sai_logo-removebg-preview.png'
]);

async function processImage(inputPath, outputFileName, isPublic = false) {
  const filename = path.basename(inputPath);
  const ext = path.extname(filename).toLowerCase();
  const originalStats = fs.statSync(inputPath);
  const originalSize = originalStats.size;

  const outputPath = path.join(stagingDir, outputFileName);

  const image = sharp(inputPath);
  const metadata = await image.metadata();

  let targetWidth = metadata.width;
  let targetHeight = metadata.height;

  // Determine max dimensions based on usage
  if (filename === 'parlour_frontimg.jpeg' || filename === 'parlour_frontimg.jpg') {
    // Hero banner: max width 1920
    if (metadata.width > 1920) {
      targetWidth = 1920;
      targetHeight = Math.round(metadata.height * (1920 / metadata.width));
    }
  } else if (filename.startsWith('sai_interior')) {
    // Interior vertical photos: max height 1600
    if (metadata.height > 1600) {
      targetHeight = 1600;
      targetWidth = Math.round(metadata.width * (1600 / metadata.height));
    }
  } else if (filename === 'testimonial.png') {
    // Video poster: max width 800
    if (metadata.width > 800) {
      targetWidth = 800;
      targetHeight = Math.round(metadata.height * (800 / metadata.width));
    }
  } else if (filename === 'skincare.png') {
    // Skincare model photo: max dimension 1080
    const maxDim = Math.max(metadata.width, metadata.height);
    if (maxDim > 1080) {
      const scale = 1080 / maxDim;
      targetWidth = Math.round(metadata.width * scale);
      targetHeight = Math.round(metadata.height * scale);
    }
  } else if (logoFiles.has(filename) || isPublic && filename.includes('logo')) {
    // Logos: keep sharp, max 512px
    const maxDim = Math.max(metadata.width, metadata.height);
    if (maxDim > 512) {
      const scale = 512 / maxDim;
      targetWidth = Math.round(metadata.width * scale);
      targetHeight = Math.round(metadata.height * scale);
    }
  } else if (isPublic && filename === 'favicon.png') {
    // Favicon: 128x128 is crisp for all retina screens
    targetWidth = 128;
    targetHeight = 128;
  } else if (isPublic && filename === 'og-image.png') {
    // OG Image: keep 400x400 or max 600
    targetWidth = Math.min(metadata.width, 600);
    targetHeight = Math.min(metadata.height, 600);
  } else {
    // Standard photo (team, gallery, course): max dimension 1080px
    const maxDim = Math.max(metadata.width, metadata.height);
    if (maxDim > 1080) {
      const scale = 1080 / maxDim;
      targetWidth = Math.round(metadata.width * scale);
      targetHeight = Math.round(metadata.height * scale);
    }
  }

  let pipeline = sharp(inputPath);

  if (targetWidth !== metadata.width || targetHeight !== metadata.height) {
    pipeline = pipeline.resize(targetWidth, targetHeight, {
      fit: 'inside',
      withoutEnlargement: true,
      kernel: sharp.kernel.lanczos3
    });
  }

  const outExt = path.extname(outputFileName).toLowerCase();

  if (outExt === '.webp') {
    // Convert photo to WebP
    pipeline = pipeline.webp({
      quality: 82,
      effort: 6,
      smartSubsample: true
    });
  } else if (outExt === '.png') {
    // Optimize PNG logo with compression
    pipeline = pipeline.png({
      compressionLevel: 9,
      palette: true,
      quality: 90
    });
  } else if (outExt === '.jpg' || outExt === '.jpeg') {
    pipeline = pipeline.jpeg({
      quality: 82,
      mozjpeg: true
    });
  }

  await pipeline.toFile(outputPath);

  const optimizedStats = fs.statSync(outputPath);
  const optimizedSize = optimizedStats.size;
  const reductionPercent = Math.round(((originalSize - optimizedSize) / originalSize) * 10000) / 100;

  return {
    originalFile: filename,
    outputFile: outputFileName,
    originalSize,
    optimizedSize,
    originalDims: `${metadata.width}x${metadata.height}`,
    optimizedDims: `${targetWidth}x${targetHeight}`,
    savedBytes: originalSize - optimizedSize,
    reductionPercent
  };
}

async function run() {
  console.log('Starting optimization staging...');
  const results = [];

  // 1. Process all images in src/assets/images
  const srcFiles = fs.readdirSync(srcImagesDir);
  for (const file of srcFiles) {
    if (file === 'testimonial.mp4') {
      console.log('Skipping video file testimonial.mp4');
      continue;
    }
    const ext = path.extname(file).toLowerCase();
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;

    const fullPath = path.join(srcImagesDir, file);

    if (logoFiles.has(file)) {
      // Logos: produce optimized PNG and high quality WebP
      // First optimized PNG with transparency
      const pngResult = await processImage(fullPath, file, false);
      results.push(pngResult);

      // Also produce WebP variant for modern browsers
      const webpName = file.replace(/\.png$/i, '.webp');
      const webpResult = await processImage(fullPath, webpName, false);
      results.push(webpResult);
    } else {
      // Photograph (JPEG or photo PNG): convert to WebP
      const webpName = file.replace(/\.(jpe?g|png)$/i, '.webp');
      const res = await processImage(fullPath, webpName, false);
      results.push(res);
    }
  }

  // 2. Process public/ images (favicon.png, og-image.png)
  const publicFiles = fs.readdirSync(publicDir);
  for (const file of publicFiles) {
    const ext = path.extname(file).toLowerCase();
    if (!['.png', '.jpg', '.jpeg'].includes(ext)) continue;
    const fullPath = path.join(publicDir, file);
    const res = await processImage(fullPath, `public_${file}`, true);
    results.push(res);
  }

  const totalOriginal = results.reduce((acc, r) => acc + r.originalSize, 0);
  const totalOptimized = results.reduce((acc, r) => acc + r.optimizedSize, 0);
  const totalSaved = totalOriginal - totalOptimized;
  const totalReduction = Math.round((totalSaved / totalOriginal) * 10000) / 100;

  console.log('\n--- Optimization Staging Summary ---');
  console.log(`Total items processed: ${results.length}`);
  console.log(`Original total size: ${(totalOriginal / (1024 * 1024)).toFixed(2)} MB (${totalOriginal} bytes)`);
  console.log(`Optimized total size: ${(totalOptimized / (1024 * 1024)).toFixed(2)} MB (${totalOptimized} bytes)`);
  console.log(`Total payload reduction: ${totalReduction}% (Saved ${(totalSaved / (1024 * 1024)).toFixed(2)} MB)`);

  fs.writeFileSync('optimization-staging-results.json', JSON.stringify({
    totalOriginal,
    totalOptimized,
    totalSaved,
    totalReduction,
    results
  }, null, 2));
}

run().catch(console.error);
