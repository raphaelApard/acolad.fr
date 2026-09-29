export const LOCALES = ['fr', 'en'] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'fr'

export const PAGE_KEYS = ['home', 'services', 'work', 'clients', 'background', 'contact'] as const
export type PageKey = (typeof PAGE_KEYS)[number]

/** Pages listed in the main navigation, in order. */
export const NAV_KEYS = ['services', 'work', 'clients', 'background', 'contact'] as const
export type NavKey = (typeof NAV_KEYS)[number]

/**
 * Single source of truth for URLs. Section slugs are translated (projets/work, parcours/background),
 * which is why Astro's built-in i18n routing is not used: it cannot pair them.
 */
const ROUTES: Record<PageKey, Record<Locale, string>> = {
  home: { fr: '/', en: '/en/' },
  services: { fr: '/services/', en: '/en/services/' },
  work: { fr: '/projets/', en: '/en/work/' },
  clients: { fr: '/clients/', en: '/en/clients/' },
  background: { fr: '/parcours/', en: '/en/background/' },
  contact: { fr: '/contact/', en: '/en/contact/' },
}

export const pathFor = (key: PageKey, locale: Locale) => ROUTES[key][locale]

export const absoluteUrl = (path: string, site: string | URL) => new URL(path, site).href

/** hreflang alternates of a page; x-default is the French page. */
export const alternatesFor = (key: PageKey) => [
  ...LOCALES.map((locale) => ({ hreflang: locale as string, path: pathFor(key, locale) })),
  { hreflang: 'x-default', path: pathFor(key, DEFAULT_LOCALE) },
]

export type RouteEntry = { key: PageKey; locale: Locale; path: string; slug: string | undefined }

/** `/en/work/` -> `en/work`, `/` -> undefined: the value of the `[...slug]` route parameter. */
export const slugOf = (path: string) => path.replace(/^\/|\/$/g, '') || undefined

/** Every page of the site, one entry per language. */
export const allRoutes = (): RouteEntry[] =>
  PAGE_KEYS.flatMap((key) =>
    LOCALES.map((locale) => {
      const path = pathFor(key, locale)
      return { key, locale, path, slug: slugOf(path) }
    }),
  )
