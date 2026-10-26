import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import sharp from 'sharp';

const rootDir = process.cwd();
const imageExtensions = new Set(['.png', '.jpg', '.jpeg', '.webp', '.avif', '.svg', '.gif']);

// Find all files in a dir recursively
function getFiles(dir, files = []) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    if (item === 'node_modules' || item === 'dist' || item === '.git') continue;
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      getFiles(fullPath, files);
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

// Find all code files to check references
function getCodeFiles() {
  const allFiles = getFiles(rootDir);
  return allFiles.filter(f => {
    const ext = path.extname(f);
    return ['.ts', '.tsx', '.js', '.jsx', '.html', '.css', '.json'].includes(ext);
  });
}

async function audit() {
  const allFiles = getFiles(rootDir);
  const codeFiles = getCodeFiles();

  // Read all code file contents into memory for reference checking
  const codeContents = codeFiles.map(f => ({
    file: path.relative(rootDir, f),
    content: fs.readFileSync(f, 'utf8')
  }));

  const imageFiles = allFiles.filter(f => imageExtensions.has(path.extname(f).toLowerCase()));

  console.log(`Found ${imageFiles.length} image files.`);

  const auditData = [];
  const hashMap = new Map();

  for (const file of imageFiles) {
    const relativePath = path.relative(rootDir, file).replace(/\\/g, '/');
    const filename = path.basename(file);
    const stats = fs.statSync(file);
    const ext = path.extname(file).toLowerCase();

    // Compute hash to check duplicates
    const buffer = fs.readFileSync(file);
    const hash = crypto.createHash('sha256').update(buffer).digest('hex');

    // Get metadata
    let metadata = { width: null, height: null, format: ext.replace('.', '') };
    try {
      if (ext !== '.svg') {
        const meta = await sharp(buffer).metadata();
        metadata.width = meta.width;
        metadata.height = meta.height;
        metadata.format = meta.format;
      }
    } catch (e) {
      console.error(`Error reading metadata for ${relativePath}:`, e.message);
    }

    // Check references in code
    const references = [];
    for (const code of codeContents) {
      if (code.content.includes(filename)) {
        references.push(code.file);
      }
    }

    if (!hashMap.has(hash)) {
      hashMap.set(hash, []);
    }
    hashMap.get(hash).push(relativePath);

    auditData.push({
      path: relativePath,
      filename,
      sizeBytes: stats.size,
      sizeKB: Math.round((stats.size / 1024) * 100) / 100,
      width: metadata.width,
      height: metadata.height,
      format: metadata.format,
      refCount: references.length,
      references,
      hash
    });
  }

  // Identify duplicates
  const duplicates = [];
  for (const [hash, paths] of hashMap.entries()) {
    if (paths.length > 1) {
      duplicates.push(paths);
    }
  }

  // Sort by size descending
  auditData.sort((a, b) => b.sizeBytes - a.sizeBytes);

  const totalSize = auditData.reduce((acc, img) => acc + img.sizeBytes, 0);
  const over1MB = auditData.filter(img => img.sizeBytes >= 1024 * 1024);
  const over500KB = auditData.filter(img => img.sizeBytes >= 500 * 1024 && img.sizeBytes < 1024 * 1024);
  const over200KB = auditData.filter(img => img.sizeBytes >= 200 * 1024 && img.sizeBytes < 500 * 1024);
  const under200KB = auditData.filter(img => img.sizeBytes < 200 * 1024);
  const unusedImages = auditData.filter(img => img.refCount === 0);

  const report = {
    totalImages: auditData.length,
    totalSizeBytes: totalSize,
    totalSizeMB: (totalSize / (1024 * 1024)).toFixed(2),
    counts: {
      over1MB: over1MB.length,
      over500KB: over500KB.length,
      over200KB: over200KB.length,
      under200KB: under200KB.length,
      unused: unusedImages.length,
      duplicatesGroupCount: duplicates.length
    },
    duplicates,
    unusedImages: unusedImages.map(img => ({ path: img.path, sizeKB: img.sizeKB })),
    over1MB: over1MB.map(img => ({ path: img.path, sizeKB: img.sizeKB, dimensions: `${img.width}x${img.height}`, refs: img.refCount })),
    over500KB: over500KB.map(img => ({ path: img.path, sizeKB: img.sizeKB, dimensions: `${img.width}x${img.height}`, refs: img.refCount })),
    allImages: auditData
  };

  fs.writeFileSync('audit-result.json', JSON.stringify(report, null, 2));
  console.log('Audit complete! Results written to audit-result.json');
  console.log(`Total images: ${report.totalImages}`);
  console.log(`Total size: ${report.totalSizeMB} MB (${report.totalSizeBytes} bytes)`);
  console.log(`> 1 MB: ${report.counts.over1MB}`);
  console.log(`500 KB - 1 MB: ${report.counts.over500KB}`);
  console.log(`200 KB - 500 KB: ${report.counts.over200KB}`);
  console.log(`< 200 KB: ${report.counts.under200KB}`);
  console.log(`Unused images: ${report.counts.unused}`);
  console.log(`Duplicate groups: ${report.counts.duplicatesGroupCount}`);
}

audit().catch(console.error);
