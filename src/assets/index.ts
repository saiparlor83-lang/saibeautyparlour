/// <reference types="vite/client" />

const assets = import.meta.glob('./images/*', {
  eager: true,
  import: 'default',
  query: '?url',
}) as Record<string, string>;

export function assetUrl(fileName: string): string {
  // 1. Direct match (exact file name, e.g. 'nobg_sailogo.png' or 'testimonial.mp4')
  if (assets[`./images/${fileName}`]) {
    return assets[`./images/${fileName}`];
  }

  // 2. If requested with .jpg, .jpeg, or .png, resolve to .webp version
  const webpName = fileName.replace(/\.(jpe?g|png)$/i, '.webp');
  if (assets[`./images/${webpName}`]) {
    return assets[`./images/${webpName}`];
  }

  // 3. If requested with .webp, resolve to .png / .jpg fallback if needed
  const baseName = fileName.substring(0, fileName.lastIndexOf('.'));
  for (const ext of ['.webp', '.png', '.jpg', '.jpeg']) {
    const candidate = `./images/${baseName}${ext}`;
    if (assets[candidate]) {
      return assets[candidate];
    }
  }

  throw new Error(`Asset not found: ${fileName}`);
}

export const imageUrl = assetUrl;
export const videoUrl = assetUrl;

