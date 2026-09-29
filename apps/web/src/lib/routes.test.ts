import { describe, expect, it } from 'vitest'

import { absoluteUrl, DEFAULT_LOCALE, LOCALES, slugOf } from './routes'

describe('routes', () => {
  it('serves French by default and English as the other language', () => {
    expect(LOCALES).toEqual(['fr', 'en'])
    expect(DEFAULT_LOCALE).toBe('fr')
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
