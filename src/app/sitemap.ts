import type { MetadataRoute } from "next";

import { defaultLocale, localePath, locales } from "@/i18n/config";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, absoluteUrl(localePath(locale))]),
  );

  return locales.map((locale) => ({
    url: absoluteUrl(localePath(locale)),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: locale === defaultLocale ? 1 : 0.9,
    alternates: { languages },
  }));
}
