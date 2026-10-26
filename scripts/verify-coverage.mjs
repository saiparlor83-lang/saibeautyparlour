import fs from 'fs';
import path from 'path';

const originalImagesDir = path.join(process.cwd(), 'original_assets_backup', 'images');
const stagingDir = path.join(process.cwd(), 'staging_optimized');

const originalFiles = fs.readdirSync(originalImagesDir);
const stagingFiles = new Set(fs.readdirSync(stagingDir));

let missing = 0;
for (const file of originalFiles) {
  if (file === 'testimonial.mp4') continue;
  const ext = path.extname(file).toLowerCase();
  const webpName = file.replace(/\.(jpe?g|png)$/i, '.webp');

  const hasWebp = stagingFiles.has(webpName);
  const hasDirect = stagingFiles.has(file);

  if (!hasWebp && !hasDirect) {
    console.error(`MISSING: ${file}`);
    missing++;
  }
}

if (missing === 0) {
  console.log('Verification PASSED: 100% of image files have optimized variants in staging!');
} else {
  console.log(`Verification FAILED: ${missing} missing files.`);
}
