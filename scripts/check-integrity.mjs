import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const stagingDir = path.join(process.cwd(), 'staging_optimized');
const files = fs.readdirSync(stagingDir);

let valid = 0;
let errors = 0;

for (const file of files) {
  const full = path.join(stagingDir, file);
  try {
    const meta = await sharp(full).metadata();
    if (!meta.width || !meta.height) {
      console.error(`Invalid dimensions: ${file}`);
      errors++;
    } else {
      valid++;
    }
  } catch (err) {
    console.error(`Corrupt file ${file}:`, err.message);
    errors++;
  }
}

console.log(`Integrity check: ${valid} files valid, ${errors} errors.`);
if (errors === 0) {
  console.log('ALL OPTIMIZED FILES ARE 100% VALID AND READABLE!');
}
