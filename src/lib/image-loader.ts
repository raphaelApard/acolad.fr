import type { ImageLoaderProps } from "next/image";

const OPTIMIZABLE = /^\/_next\/static\/media\/.+\.(?:png|jpe?g|webp|avif)$/i;

/**
 * Static export has no image server, so every width in `srcset` points to a
 * pre-generated WebP file (`name.hash.640w.webp`). Those files are created by
 * `scripts/postbuild.mjs` from the images referenced in the exported HTML.
 */
export default function imageLoader({ src, width }: ImageLoaderProps): string {
  if (!OPTIMIZABLE.test(src)) return src;

  // `next dev` serves original files only.
  if (process.env.NODE_ENV !== "production") return `${src}?w=${width}`;

  return src.replace(/\.[a-z0-9]+$/i, `.${width}w.webp`);
}
