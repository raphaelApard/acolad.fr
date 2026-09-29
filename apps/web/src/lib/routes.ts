export const LOCALES = ['fr', 'en'] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'fr'

export const absoluteUrl = (path: string, site: string | URL) => new URL(path, site).href

/** `/en/work/` -> `en/work`, `/` -> undefined: the value of the `[...slug]` route parameter. */
export const slugOf = (path: string) => path.replace(/^\/|\/$/g, '') || undefined
