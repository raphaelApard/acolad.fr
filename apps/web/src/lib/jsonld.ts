import { absoluteUrl, LOCALES, pathFor, type Locale, type PageKey } from './routes'
import type { Labels, Service, Site } from './types'

type Common = {
  /** Origin of the site (Astro.site). */
  site: URL | string
  locale: Locale
  key: PageKey
  seo: { title: string; description: string }
}

export type JsonLdNode = Record<string, unknown>

const graph = (nodes: JsonLdNode[]) => ({ '@context': 'https://schema.org', '@graph': nodes })

/** Identifiers of the entities shared by every page: they are declared on the French home page. */
const ids = (site: URL | string) => ({
  website: absoluteUrl('/#website', site),
  person: absoluteUrl('/#person', site),
  business: absoluteUrl('/#business', site),
})

const webPage = ({ site, locale, key, seo }: Common, type: 'WebPage' | 'ContactPage') => {
  const url = absoluteUrl(pathFor(key, locale), site)
  return {
    '@type': type,
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
  { settings, services, labels }: { settings: Site; services: Service[]; labels: Labels },
) {
  const { site } = common
  const home = absoluteUrl(pathFor('home', 'fr'), site)
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
    webPage(common, 'WebPage'),
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
        name: labels.nav.services,
        itemListElement: services.map((service) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: service.title, description: service.shortDesc },
        })),
      },
    },
  ])
}

/** Section page: the page itself and its breadcrumb (Home > page). */
export function pageGraph(common: Common, labels: Labels) {
  const { site, locale, key } = common
  const url = absoluteUrl(pathFor(key, locale), site)
  const label = key === 'home' ? labels.nav.home : labels.nav[key]

  return graph([
    {
      ...webPage(common, key === 'contact' ? 'ContactPage' : 'WebPage'),
      breadcrumb: { '@id': `${url}#breadcrumb` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: labels.nav.home,
          item: absoluteUrl(pathFor('home', locale), site),
        },
        { '@type': 'ListItem', position: 2, name: label, item: url },
      ],
    },
  ])
}
