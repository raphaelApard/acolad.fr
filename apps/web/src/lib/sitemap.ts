import { absoluteUrl, alternatesFor, type RouteEntry } from './routes'

const escapeXml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export type SitemapEntry = Pick<RouteEntry, 'key' | 'path'> & {
  /** Last modification, YYYY-MM-DD. */
  lastmod: string
}

/** sitemap.xml with the hreflang alternates of each page (French, English and x-default). */
export function buildSitemap(entries: SitemapEntry[], site: URL | string): string {
  const urls = entries.map(({ key, path, lastmod }) => {
    const alternates = alternatesFor(key)
      .map(
        ({ hreflang, path: alternate }) =>
          `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${escapeXml(absoluteUrl(alternate, site))}" />`,
      )
      .join('\n')

    return `  <url>\n    <loc>${escapeXml(absoluteUrl(path, site))}</loc>\n${alternates}\n    <lastmod>${lastmod}</lastmod>\n  </url>`
  })

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`
}
