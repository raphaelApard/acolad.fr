import { homeOf, type SitePage } from './pages'
import { absoluteUrl, DEFAULT_LOCALE, LOCALES, type Locale } from './routes'
import type { Service, Site } from './types'

type Common = {
  /** Origin of the site (Astro.site). */
  site: URL | string
  locale: Locale
  page: SitePage
  seo: { title: string; description: string }
}

export type JsonLdNode = Record<string, unknown>

const graph = (nodes: JsonLdNode[]) => ({ '@context': 'https://schema.org', '@graph': nodes })

/** Identifiers of the entities shared by every page: they are declared on the home page. */
const ids = (site: URL | string) => ({
  website: absoluteUrl('/#website', site),
  person: absoluteUrl('/#person', site),
  business: absoluteUrl('/#business', site),
})

const webPage = ({ site, locale, page, seo }: Common) => {
  const url = absoluteUrl(page.paths[locale], site)
  return {
    '@type': page.schemaType,
    '@id': `${url}#webpage`,
    url,
    name: seo.title,
    description: seo.description,
    inLanguage: locale,
    isPartOf: { '@id': ids(site).website },
    about: { '@id': ids(site).person },
  }
}

/** Home page: the site, the page, the person and their business with its offers. */
export function homeGraph(
  common: Common,
  { settings, services, catalogName }: { settings: Site; services: Service[]; catalogName: string },
) {
  const { site, page } = common
  const home = absoluteUrl(page.paths[DEFAULT_LOCALE], site)
  const address = {
    '@type': 'PostalAddress',
    addressLocality: settings.address.locality,
    addressRegion: settings.address.region,
    addressCountry: settings.address.country,
  }

  return graph([
    {
      '@type': 'WebSite',
      '@id': ids(site).website,
      url: home,
      name: settings.name,
      inLanguage: [...LOCALES],
      publisher: { '@id': ids(site).person },
    },
    webPage(common),
    {
      '@type': 'Person',
      '@id': ids(site).person,
      name: settings.name,
      url: home,
      email: `mailto:${settings.email}`,
      jobTitle: settings.jobTitle,
      address,
      knowsLanguage: [...LOCALES],
      knowsAbout: settings.knowsAbout ?? [],
      sameAs: (settings.socials ?? []).map((social) => social.url),
      worksFor: { '@id': ids(site).business },
    },
    {
      '@type': 'ProfessionalService',
      '@id': ids(site).business,
      name: settings.businessName,
      url: home,
      email: settings.email,
      founder: { '@id': ids(site).person },
      address,
      areaServed: [
        { '@type': 'City', name: settings.address.locality },
        { '@type': 'Country', name: 'France' },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: catalogName,
        itemListElement: services.map((service) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: service.title, description: service.shortDesc },
        })),
      },
    },
  ])
}

/** Any other page: the page itself and its breadcrumb (Home > page). */
export function pageGraph(common: Common, pages: SitePage[]) {
  const { site, locale, page } = common
  const url = absoluteUrl(page.paths[locale], site)
  const home = homeOf(pages)

  return graph([
    { ...webPage(common), breadcrumb: { '@id': `${url}#breadcrumb` } },
    {
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: home.navLabel[locale],
          item: absoluteUrl(home.paths[locale], site),
        },
        { '@type': 'ListItem', position: 2, name: page.navLabel[locale], item: url },
      ],
    },
  ])
}
