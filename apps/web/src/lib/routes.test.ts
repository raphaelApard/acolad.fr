import { describe, expect, it } from 'vitest'

import { absoluteUrl, allRoutes, alternatesFor, LOCALES, NAV_KEYS, pathFor, slugOf } from './routes'

describe('routes', () => {
  it('lists 12 unique pages, all with a trailing slash', () => {
    const paths = allRoutes().map((route) => route.path)
    expect(paths).toHaveLength(12)
    expect(new Set(paths).size).toBe(12)
    for (const path of paths) expect(path).toMatch(/\/$/)
  })

  it('keeps French unprefixed and prefixes English with /en/', () => {
    for (const { locale, path } of allRoutes()) {
      if (locale === 'fr') expect(path.startsWith('/en/')).toBe(false)
      else expect(path.startsWith('/en/')).toBe(true)
    }
  })

  it('translates the section slugs', () => {
    expect(pathFor('work', 'fr')).toBe('/projets/')
    expect(pathFor('work', 'en')).toBe('/en/work/')
    expect(pathFor('background', 'fr')).toBe('/parcours/')
    expect(pathFor('background', 'en')).toBe('/en/background/')
  })

  it('exposes every navigation page in both languages', () => {
    for (const key of NAV_KEYS) for (const locale of LOCALES) expect(pathFor(key, locale)).toBeTruthy()
  })

  it('pairs each page with its translation and points x-default at French', () => {
    expect(alternatesFor('work')).toEqual([
      { hreflang: 'fr', path: '/projets/' },
      { hreflang: 'en', path: '/en/work/' },
      { hreflang: 'x-default', path: '/projets/' },
    ])
  })

  it('derives the [...slug] parameter from a path', () => {
    expect(slugOf('/')).toBeUndefined()
    expect(slugOf('/en/')).toBe('en')
    expect(slugOf('/en/work/')).toBe('en/work')
  })

  it('builds absolute URLs on the site origin', () => {
    expect(absoluteUrl('/en/work/', 'https://www.acolad.fr')).toBe('https://www.acolad.fr/en/work/')
  })
})
