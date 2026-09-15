import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build a plain static site into `out/` (upload that folder to any web server).
  output: "export",
  // Emit `en/index.html` instead of `en.html` so classic servers resolve `/en/`.
  trailingSlash: true,
  images: {
    // No image server in a static export: the loader points each srcset width
    // to a WebP variant generated at build time by scripts/postbuild.mjs.
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    deviceSizes: [640, 828, 1080, 1280, 1920],
    imageSizes: [128, 192, 256, 384],
  },
  experimental: {
    // Two root layouts (FR at `/`, EN at `/en/`) need a standalone 404 page.
    globalNotFound: true,
    // CSS is ~16 KB: inlining it removes the render-blocking stylesheet requests.
    inlineCss: true,
  },
  // Redirects and security/cache headers live in `public/.htaccess`.
};

export default nextConfig;
