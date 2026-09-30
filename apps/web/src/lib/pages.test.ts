import { describe, expect, it } from 'vitest'

import {
  alternatesOf,
  buildSitePages,
  collectionsOf,
  homeOf,
  navPagesOf,
  pagePath,
  pathOfRelation,
  relationId,
} from './pages'
import type { Page } from './types'

const page = (overrides: Partial<Page> & Pick<Page, 'id' | 'navLabel'>): Page =>
  ({ isHome: false, showInNav: true, order: 0, schemaType: 'WebPage', sections: [], ...overrides }) as unknown as Page

const french = [
  page({ id: 1, navLabel: 'Accueil', isHome: true, showInNav: false }),
  page({ id: 3, navLabel: 'Projets', slug: 'projets', order: 2, homeAnchor: 'projets' }),
  page({ id: 2, navLabel: 'Services', slug: 'services', order: 1 }),
]
const english = [
  page({ id: 1, navLabel: 'Home', isHome: true, showInNav: false }),
  page({ id: 3, navLabel: 'Work', slug: 'work', order: 2, homeAnchor: 'projets' }),
  page({ id: 2, navLabel: 'Services', slug: 'services', order: 1 }),
]

describe('pagePath', () => {
  it('serves the home page at / and /en/, the others under their slug', () => {
    expect(pagePath({ isHome: true }, 'fr')).toBe('/')
    expect(pagePath({ isHome: true }, 'en')).toBe('/en/')
    expect(pagePath({ slug: 'projets' }, 'fr')).toBe('/projets/')
    expect(pagePath({ slug: 'work' }, 'en')).toBe('/en/work/')
  })

  it('refuses a page without slug', () => {
    expect(() => pagePath({}, 'en')).toThrow(/no en slug/)
  })
})

describe('buildSitePages', () => {
  const pages = buildSitePages({ fr: french, en: english })

  it('pairs both languages of a page, with translated slugs', () => {
    const work = pages.find((candidate) => candidate.id === 3)!
    expect(work.paths).toEqual({ fr: '/projets/', en: '/en/work/' })
    expect(work.navLabel).toEqual({ fr: 'Projets', en: 'Work' })
    expect(work.homeAnchor).toBe('projets')
  })

  it('orders the pages by their order field', () => {
    expect(pages.map((candidate) => candidate.id)).toEqual([1, 2, 3])
  })

  it('exposes the home page and the pages of the menu', () => {
    expect(homeOf(pages).id).toBe(1)
    expect(navPagesOf(pages).map((candidate) => candidate.id)).toEqual([2, 3])
  })

  it('falls back to the French version of a page missing in English', () => {
    const partial = buildSitePages({ fr: french, en: english.filter((candidate) => candidate.id !== 3) })
    expect(partial.find((candidate) => candidate.id === 3)!.paths.en).toBe('/en/projets/')
  })

  it('needs exactly one home page', () => {
    const noHome = french.filter((candidate) => !candidate.isHome)
    expect(() => buildSitePages({ fr: noHome, en: noHome })).toThrow(/Exactly one page/)
    const twoHomes = [...french, page({ id: 9, navLabel: 'Other home', isHome: true })]
    expect(() => buildSitePages({ fr: twoHomes, en: twoHomes })).toThrow(/found 2/)
  })

  it('rejects two pages with the same URL', () => {
    const clash = [...french, page({ id: 7, navLabel: 'Copy', slug: 'services' })]
    expect(() => buildSitePages({ fr: clash, en: clash })).toThrow(/share the URL \/services\//)
  })

  it('lists the hreflang alternates with French as x-default', () => {
    const work = pages.find((candidate) => candidate.id === 3)!
    expect(alternatesOf(work)).toEqual([
      { hreflang: 'fr', path: '/projets/' },
      { hreflang: 'en', path: '/en/work/' },
      { hreflang: 'x-default', path: '/projets/' },
    ])
  })
})

describe('relations', () => {
  const pages = buildSitePages({ fr: french, en: english })

  it('reads an id or a populated document', () => {
    expect(relationId(3)).toBe(3)
    expect(relationId({ id: 4 })).toBe(4)
    expect(relationId(null)).toBeNull()
  })

  it('resolves the path of the linked page in the requested language', () => {
    expect(pathOfRelation(pages, 3, 'en')).toBe('/en/work/')
    expect(pathOfRelation(pages, { id: 2 }, 'fr')).toBe('/services/')
  })

  it('fails on a link to a missing page', () => {
    expect(() => pathOfRelation(pages, 99, 'fr')).toThrow(/page 99/)
  })
})

describe('collectionsOf', () => {
  it('lists the collections a page displays', () => {
    const sections = [
      { blockType: 'pageHead' },
      { blockType: 'services' },
      { blockType: 'backgroundSummary' },
      { blockType: 'clients' },
      { blockType: 'services' },
    ]
    const used = collectionsOf(page({ id: 5, navLabel: 'x', sections } as never))
    expect(used.sort()).toEqual(['clients', 'jobs', 'services', 'skill-groups'])
  })
})
