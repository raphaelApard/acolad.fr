import type { SitePage } from './pages'
import { alternatesOf } from './pages'
import { absoluteUrl, LOCALES, type Locale } from './routes'

export const OG_LOCALE: Record<Locale, string> = { fr: 'fr_FR', en: 'en_US' }
export const ROBOTS = 'index, follow, max-image-preview:large, max-snippet:-1'
export const THEME_COLOR = '#fafaf8'
/** Size of the social card images under /assets/og-*.png. */
export const OG_IMAGE_SIZE = { width: 1200, height: 630 }

export type HeadInput = {
  /** Origin of the site (Astro.site). */
  site: URL | string
  locale: Locale
  page: SitePage
  seo: { title: string; description: string }
  settings: { name: string; ogImagePath: string; ogImageAlt?: string | null }
}

/** Everything a page puts in its <head> to be found and shared: canonical, hreflang, Open Graph, Twitter. */
export function buildHead({ site, locale, page, seo, settings }: HeadInput) {
  const canonical = absoluteUrl(page.paths[locale], site)

  return {
    title: seo.title,
    description: seo.description,
    author: settings.name,
    robots: ROBOTS,
    canonical,
    alternates: alternatesOf(page).map(({ hreflang, path }) => ({
      hreflang,
      href: absoluteUrl(path, site),
    })),
    og: {
      siteName: settings.name,
      url: canonical,
      title: seo.title,
      description: seo.description,
      locale: OG_LOCALE[locale],
      alternateLocales: LOCALES.filter((other) => other !== locale).map((other) => OG_LOCALE[other]),
      image: {
        url: absoluteUrl(settings.ogImagePath, site),
        ...OG_IMAGE_SIZE,
        alt: settings.ogImageAlt ?? undefined,
      },
    },
  }
}
