import { business } from '../content/business';
import { defaultLang, href, langs, shareImagePath, type PageId, type ServiceId } from './routes';
import type { SiteContent } from './types';

// Structured data. The @ids are shared by every locale and page so search engines see one
// site, one company and one founder.

const abs = (path: string, site: URL) => new URL(path, site).href;

const ids = (site: URL) => ({
  website: abs('/#website', site),
  business: abs('/#business', site),
  founder: abs('/#founder', site),
});

/** Plain text of a rich string: link labels only, no markers, no all-caps [PLACEHOLDER]. */
const plain = (text: string) =>
  text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\s*\[[^\]\p{Ll}]*\]/gu, '')
    .replace(/\*\*|`/g, '');

/** Where a page sits in the site, from the home page down to the page itself. */
function breadcrumb(content: SiteContent, trail: { name: string; page: PageId }[], site: URL): object {
  const pageUrl = abs(href(trail[trail.length - 1]!.page, content.lang), site);
  return {
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    itemListElement: [{ name: content.siteName, page: 'home' as PageId }, ...trail].map(({ name, page }, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name,
      item: abs(href(page, content.lang), site),
    })),
  };
}

/** Pages described as a page of the site, with their schema.org type. */
const pageTypes = {
  work: 'CollectionPage',
  caseStudy: 'WebPage',
  about: 'AboutPage',
  contact: 'ContactPage',
  legal: 'WebPage',
} as const;

export type DescribedPage = keyof typeof pageTypes;

/** Work, case study, about, contact and legal pages: the page, about the company, and its trail. */
export function pageGraph(content: SiteContent, page: DescribedPage, site: URL): object {
  const id = ids(site);
  const url = abs(href(page, content.lang), site);
  const work = { name: content.nav.work, page: 'work' as PageId };
  const trails: Record<DescribedPage, { name: string; page: PageId }[]> = {
    work: [work],
    caseStudy: [work, { name: content.projects.ovhcloud.name, page: 'caseStudy' }],
    about: [{ name: content.nav.about, page: 'about' }],
    contact: [{ name: content.nav.contact, page: 'contact' }],
    legal: [{ name: content.legal.h1, page: 'legal' }],
  };
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': pageTypes[page],
        '@id': `${url}#webpage`,
        url,
        name: content[page].meta.title,
        description: content[page].meta.description,
        inLanguage: content.lang,
        isPartOf: { '@id': id.website },
        about: { '@id': id.business },
        breadcrumb: { '@id': `${url}#breadcrumb` },
      },
      breadcrumb(content, trails[page], site),
    ],
  };
}

/** Home page: the site, the company and its founder. */
export function homeGraph(content: SiteContent, site: URL): object {
  const id = ids(site);
  const url = abs(href('home', content.lang), site);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': id.website,
        url: abs(href('home', defaultLang), site),
        name: content.siteName,
        inLanguage: langs,
        publisher: { '@id': id.business },
      },
      {
        '@type': 'ProfessionalService',
        '@id': id.business,
        name: business.name,
        legalName: business.legalName,
        description: content.home.meta.description,
        url,
        logo: abs('/favicon.svg', site),
        image: abs(shareImagePath(content.lang), site),
        email: business.email,
        telephone: business.telephone,
        foundingDate: business.foundingDate,
        vatID: business.vatID,
        address: { '@type': 'PostalAddress', ...business.address },
        areaServed: [
          { '@type': 'City', name: business.workLocality },
          { '@type': 'Country', name: 'France' },
        ],
        founder: { '@id': id.founder },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: content.home.services.eyebrow,
          itemListElement: Object.entries(content.services).map(([serviceId, service]) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: service.name,
              url: abs(href(serviceId as ServiceId, content.lang), site),
            },
          })),
        },
      },
      {
        '@type': 'Person',
        '@id': id.founder,
        name: content.about.founder.name,
        worksFor: { '@id': id.business },
        address: { '@type': 'PostalAddress', ...business.home },
      },
    ],
  };
}

/** Service page: the service, offered by the company, its questions and answers, and its trail. */
export function serviceGraph(content: SiteContent, serviceId: ServiceId, site: URL): object {
  const service = content.services[serviceId];
  const url = abs(href(serviceId, content.lang), site);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: service.name,
        description: service.meta.description,
        url,
        inLanguage: content.lang,
        provider: { '@id': ids(site).business },
        areaServed: { '@type': 'Country', name: 'France' },
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        inLanguage: content.lang,
        // Answers that are still placeholders are left out.
        mainEntity: service.faq
          .filter(({ answer }) => !/^\[[^\]]*\]$/.test(answer))
          .map(({ question, answer }) => ({
            '@type': 'Question',
            name: question,
            acceptedAnswer: { '@type': 'Answer', text: plain(answer) },
          })),
      },
      breadcrumb(content, [{ name: service.name, page: serviceId }], site),
    ],
  };
}
