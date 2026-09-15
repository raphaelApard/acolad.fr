import type { Metadata } from "next";

import { defaultLocale, localePath, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { site } from "./site";

export function buildMetadata(lang: Locale): Metadata {
  const { meta } = getDictionary(lang);
  const url = localePath(lang);

  return {
    metadataBase: new URL(site.url),
    title: meta.title,
    description: meta.description,
    applicationName: site.name,
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, localePath(l)])),
        "x-default": localePath(defaultLocale),
      },
    },
    openGraph: {
      type: "website",
      url,
      siteName: site.name,
      title: meta.title,
      description: meta.description,
      locale: meta.ogLocale,
      alternateLocale: locales
        .filter((l) => l !== lang)
        .map((l) => getDictionary(l).meta.ogLocale),
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    formatDetection: { telephone: false, email: false, address: false },
  };
}
