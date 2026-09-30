import { describe, expect, it } from 'vitest'

import type { SitePage } from './pages'
import { buildSitemap } from './sitemap'

const page = (id: number, fr: string, en: string): SitePage => ({
  id,
  isHome: fr === '/',
  schemaType: 'WebPage',
  showInNav: true,
  order: id,
  homeAnchor: null,
  paths: { fr, en },
  navLabel: { fr: 'x', en: 'x' },
})
const entries = [
  { page: page(1, '/', '/en/'), lastmod: '2026-09-30' },
  { page: page(2, '/projets/', '/en/work/'), lastmod: '2026-09-30' },
]
const xml = buildSitemap(entries, 'https://www.acolad.fr')

describe('buildSitemap', () => {
  it('lists every page in both languages', () => {
    expect(xml.match(/<url>/g)).toHaveLength(4)
    for (const loc of ['/', '/en/', '/projets/', '/en/work/']) {
      expect(xml).toContain(`<loc>https://www.acolad.fr${loc}</loc>`)
    }
  })

  it('gives every URL the fr, en and x-default alternates of its page', () => {
    const block = xml.split('<url>').find((chunk) => chunk.includes('<loc>https://www.acolad.fr/en/work/</loc>'))!
    expect(block).toContain('hreflang="fr" href="https://www.acolad.fr/projets/"')
    expect(block).toContain('hreflang="en" href="https://www.acolad.fr/en/work/"')
    expect(block).toContain('hreflang="x-default" href="https://www.acolad.fr/projets/"')
  })

  it('carries the last modification date and declares both namespaces', () => {
    expect(xml.match(/<lastmod>2026-09-30<\/lastmod>/g)).toHaveLength(4)
    expect(xml).toContain('xmlns:xhtml="http://www.w3.org/1999/xhtml"')
  })

  it('escapes XML special characters in URLs', () => {
    const custom = buildSitemap([{ page: page(1, '/?a=1&b=2', '/en/?a=1&b=2'), lastmod: '2026-01-01' }], 'https://x.test')
    expect(custom).toContain('https://x.test/?a=1&amp;b=2')
  })
})
