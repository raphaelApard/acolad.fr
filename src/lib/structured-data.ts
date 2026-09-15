import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { absoluteUrl, site, stack } from "./site";

export function buildStructuredData(locale: Locale, dict: Dictionary) {
  const pageUrl = absoluteUrl(localePath(locale));
  const ids = {
    website: `${site.url}/#website`,
    person: `${site.url}/#person`,
    business: `${site.url}/#business`,
  };
  const address = {
    "@type": "PostalAddress",
    addressLocality: "Toulouse",
    addressRegion: "Occitanie",
    addressCountry: "FR",
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": ids.website,
        url: site.url,
        name: site.name,
        inLanguage: ["fr", "en"],
        publisher: { "@id": ids.person },
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: dict.meta.title,
        description: dict.meta.description,
        inLanguage: locale,
        isPartOf: { "@id": ids.website },
        about: { "@id": ids.person },
      },
      {
        "@type": "Person",
        "@id": ids.person,
        name: site.name,
        url: site.url,
        email: `mailto:${site.email}`,
        jobTitle: dict.hero.role,
        address,
        knowsAbout: stack,
        knowsLanguage: ["fr", "en"],
        sameAs: site.socials.map((social) => social.href),
        worksFor: { "@id": ids.business },
      },
      {
        "@type": "ProfessionalService",
        "@id": ids.business,
        name: site.business,
        url: site.url,
        email: site.email,
        founder: { "@id": ids.person },
        address,
        areaServed: [
          { "@type": "City", name: "Toulouse" },
          { "@type": "Country", name: "France" },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: dict.nav.services,
          itemListElement: dict.services.map((service) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: service.title,
              description: service.desc,
            },
          })),
        },
      },
    ],
  };
}
