import { describe, expect, it } from 'vitest'

import { buildHead, OG_LOCALE } from './seo'

const base = {
  site: 'https://www.acolad.fr',
  seo: { title: 'Projets — Raphaël Apard', description: 'Une sélection de réalisations.' },
  settings: { name: 'Raphaël Apard', ogImagePath: '/assets/og-fr.png', ogImageAlt: 'Raphaël Apard' },
}

describe('buildHead', () => {
  it('builds absolute canonical and hreflang URLs from the route table', () => {
    const head = buildHead({ ...base, locale: 'fr', key: 'work' })
    expect(head.canonical).toBe('https://www.acolad.fr/projets/')
    expect(head.alternates).toEqual([
      { hreflang: 'fr', href: 'https://www.acolad.fr/projets/' },
      { hreflang: 'en', href: 'https://www.acolad.fr/en/work/' },
      { hreflang: 'x-default', href: 'https://www.acolad.fr/projets/' },
    ])
  })

  it('canonicalises English pages on their own URL but keeps French as x-default', () => {
    const head = buildHead({ ...base, locale: 'en', key: 'home' })
    expect(head.canonical).toBe('https://www.acolad.fr/en/')
    expect(head.alternates.at(-1)).toEqual({ hreflang: 'x-default', href: 'https://www.acolad.fr/' })
  })

  it('lists the other language as the alternate Open Graph locale', () => {
    expect(buildHead({ ...base, locale: 'fr', key: 'home' }).og).toMatchObject({
      locale: OG_LOCALE.fr,
      alternateLocales: [OG_LOCALE.en],
    })
    expect(buildHead({ ...base, locale: 'en', key: 'home' }).og.alternateLocales).toEqual([OG_LOCALE.fr])
  })

  it('shares the title and description with the social cards and gives the image an absolute URL', () => {
    const { og, title, description } = buildHead({ ...base, locale: 'fr', key: 'work' })
    expect(og.title).toBe(title)
    expect(og.description).toBe(description)
    expect(og.url).toBe('https://www.acolad.fr/projets/')
    expect(og.image).toEqual({
      url: 'https://www.acolad.fr/assets/og-fr.png',
      width: 1200,
      height: 630,
      alt: 'Raphaël Apard',
    })
  })
})
