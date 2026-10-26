import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const stagingDir = path.join(process.cwd(), 'staging_optimized');
const heroVariants = [
  { name: 'parlour_frontimg', input: 'original_assets_backup/images/parlour_frontimg.jpeg', width: 768 },
  { name: 'sai_interior', input: 'original_assets_backup/images/sai_interior.jpeg', width: 640 },
  { name: 'sai_interior2', input: 'original_assets_backup/images/sai_interior2.jpeg', width: 640 },
  { name: 'team1', input: 'original_assets_backup/images/team1.jpg', width: 768 },
  { name: 'training1', input: 'original_assets_backup/images/training1.jpg', width: 768 }
];

async function generateMobileVariants() {
  console.log('Generating responsive mobile variants for hero images...');
  for (const v of heroVariants) {
    const outName = `${v.name}-mobile.webp`;
    const outPath = path.join(stagingDir, outName);
    const meta = await sharp(v.input).metadata();
    const targetHeight = Math.round(meta.height * (v.width / meta.width));

    await sharp(v.input)
      .resize(v.width, targetHeight, {
        fit: 'inside',
        withoutEnlargement: true,
        kernel: sharp.kernel.lanczos3
      })
      .webp({ quality: 80, effort: 6 })
      .toFile(outPath);

    const stats = fs.statSync(outPath);
    console.log(`Created ${outName}: ${(stats.size / 1024).toFixed(1)} KB (${v.width}x${targetHeight})`);
  }
}

generateMobileVariants().catch(console.error);
