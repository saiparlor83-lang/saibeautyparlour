import fs from 'fs';

const res = JSON.parse(fs.readFileSync('audit-result.json', 'utf8'));

console.log('Top 35 largest images:');
console.log('Filename'.padEnd(30) + 'Size (KB)'.padStart(10) + '  Format  ' + 'Dimensions'.padEnd(14) + 'Refs');
console.log('-'.repeat(65));
res.allImages.slice(0, 35).forEach(img => {
  console.log(
    img.filename.padEnd(30) +
    String(img.sizeKB).padStart(10) +
    '  ' + String(img.format).padEnd(8) +
    String(`${img.width}x${img.height}`).padEnd(14) +
    img.refCount
  );
});

console.log('\nBreakdown by format:');
const byFormat = {};
res.allImages.forEach(img => {
  byFormat[img.format] = (byFormat[img.format] || 0) + 1;
});
console.log(byFormat);
