import { business } from '../content/business';
import { defaultLang, href, langs, type ServiceId } from './routes';
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

/** Service page: the service, offered by the company, and its questions and answers. */
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
    ],
  };
}
