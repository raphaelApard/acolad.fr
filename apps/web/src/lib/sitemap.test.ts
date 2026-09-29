import { describe, expect, it } from 'vitest'

import { allRoutes } from './routes'
import { buildSitemap } from './sitemap'

const entries = allRoutes().map((route) => ({ ...route, lastmod: '2026-09-30' }))
const xml = buildSitemap(entries, 'https://www.acolad.fr')

describe('buildSitemap', () => {
  it('lists the 12 pages', () => {
    expect(xml.match(/<url>/g)).toHaveLength(12)
    expect(xml).toContain('<loc>https://www.acolad.fr/</loc>')
    expect(xml).toContain('<loc>https://www.acolad.fr/en/work/</loc>')
  })

  it('gives every page its fr, en and x-default alternates', () => {
    const block = xml.split('<url>').find((chunk) => chunk.includes('<loc>https://www.acolad.fr/en/work/</loc>'))!
    expect(block).toContain('hreflang="fr" href="https://www.acolad.fr/projets/"')
    expect(block).toContain('hreflang="en" href="https://www.acolad.fr/en/work/"')
    expect(block).toContain('hreflang="x-default" href="https://www.acolad.fr/projets/"')
  })

  it('carries the last modification date and declares both namespaces', () => {
    expect(xml.match(/<lastmod>2026-09-30<\/lastmod>/g)).toHaveLength(12)
    expect(xml).toContain('xmlns:xhtml="http://www.w3.org/1999/xhtml"')
  })

  it('escapes XML special characters in URLs', () => {
    const custom = buildSitemap([{ key: 'home', path: '/?a=1&b=2', lastmod: '2026-01-01' }], 'https://x.test')
    expect(custom).toContain('https://x.test/?a=1&amp;b=2')
  })
})
