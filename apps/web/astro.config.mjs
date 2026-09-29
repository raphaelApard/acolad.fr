import { defineConfig } from 'astro/config'

// The site is generated from the CMS: PAYLOAD_URL must be reachable while building.
const cms = new URL(process.env.PAYLOAD_URL ?? 'http://localhost:3000')

export default defineConfig({
  site: 'https://www.acolad.fr',
  output: 'static',
  // Same URLs as the previous site: /services/, /en/work/…
  trailingSlash: 'always',
  build: {
    format: 'directory',
    // The stylesheet is small: inline it in every page instead of a render-blocking request.
    inlineStylesheets: 'always',
  },
  // Whitespace is trimmed like JSX (the default): formatted source must not add spaces inside links and list items.
  compressHTML: 'jsx',
  devToolbar: { enabled: false },
  image: {
    // Project screenshots and client logos are uploaded to the CMS and optimized at build time.
    remotePatterns: [
      {
        protocol: cms.protocol.replace(':', ''),
        hostname: cms.hostname,
        port: cms.port,
        pathname: '/api/media/file/**',
      },
    ],
  },
  server: { port: 4321 },
})
