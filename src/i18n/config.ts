export const locales = ["fr", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fr";

/**
 * The default locale lives at the site root, other locales under a prefix.
 * Paths end with a slash to match the static export (`trailingSlash: true`).
 */
export function localePath(locale: Locale): string {
  return locale === defaultLocale ? "/" : `/${locale}/`;
}
