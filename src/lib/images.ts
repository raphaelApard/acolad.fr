import type { ImageMetadata } from 'astro';

// Content files reference images by their path under src/assets (e.g. `/img/portrait.webp`)
// so that Astro can optimise them and read their intrinsic size.
const files = import.meta.glob<{ default: ImageMetadata }>('../assets/**/*.{webp,png,jpg,jpeg}', { eager: true });

export function asset(src: string): ImageMetadata {
  const file = files[`../assets${src}`];
  if (!file) throw new Error(`Image not found in src/assets: ${src}`);
  return file.default;
}
