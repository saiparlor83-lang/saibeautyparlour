import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const stagingDir = path.join(rootDir, 'staging_optimized');
const srcImagesDir = path.join(rootDir, 'src', 'assets', 'images');
const publicDir = path.join(rootDir, 'public');

// 1. Copy public images
const faviconStaged = path.join(stagingDir, 'public_favicon.png');
const ogImageStaged = path.join(stagingDir, 'public_og-image.png');

if (fs.existsSync(faviconStaged)) {
  fs.copyFileSync(faviconStaged, path.join(publicDir, 'favicon.png'));
  console.log('Applied optimized public/favicon.png');
}

if (fs.existsSync(ogImageStaged)) {
  fs.copyFileSync(ogImageStaged, path.join(publicDir, 'og-image.png'));
  console.log('Applied optimized public/og-image.png');
}

// 2. In src/assets/images:
// Remove old jpg/jpeg/png files (we have original_assets_backup safely stored)
const existingFiles = fs.readdirSync(srcImagesDir);
for (const file of existingFiles) {
  if (file === 'testimonial.mp4') continue;
  fs.unlinkSync(path.join(srcImagesDir, file));
}
console.log('Cleaned old unoptimized assets from src/assets/images');

// 3. Copy all staged assets into src/assets/images
const stagedFiles = fs.readdirSync(stagingDir);
for (const file of stagedFiles) {
  if (file.startsWith('public_')) continue;
  fs.copyFileSync(path.join(stagingDir, file), path.join(srcImagesDir, file));
}
console.log(`Copied ${stagedFiles.filter(f => !f.startsWith('public_')).length} optimized assets into src/assets/images`);

// 4. Calculate total new directory sizes
let newTotalBytes = 0;
const finalFiles = fs.readdirSync(srcImagesDir);
for (const file of finalFiles) {
  if (file === 'testimonial.mp4') continue; // keep video separate in image audit
  newTotalBytes += fs.statSync(path.join(srcImagesDir, file)).size;
}
const pubFavicon = fs.statSync(path.join(publicDir, 'favicon.png')).size;
const pubOg = fs.statSync(path.join(publicDir, 'og-image.png')).size;
newTotalBytes += pubFavicon + pubOg;

console.log(`New total image size: ${(newTotalBytes / (1024 * 1024)).toFixed(2)} MB (${newTotalBytes} bytes)`);
