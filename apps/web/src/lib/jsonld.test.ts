import { describe, expect, it } from 'vitest'

import { homeGraph, pageGraph, type JsonLdNode } from './jsonld'
import type { SitePage } from './pages'
import type { Service, Site } from './types'

const site = 'https://www.acolad.fr'
const settings = {
  name: 'Raphaël Apard',
  businessName: 'Acolad développement',
  jobTitle: 'Web Developer & AI Solutions',
  email: 'contact@raphaelapard.fr',
  address: { locality: 'Toulouse', region: 'Occitanie', country: 'FR' },
  socials: [{ label: 'GitHub', url: 'https://github.com/raphaelApard' }],
  knowsAbout: ['TypeScript'],
} as unknown as Site
const services = [{ title: 'Websites', shortDesc: 'Fast sites.' }] as unknown as Service[]
const seo = { title: 'Title', description: 'Description' }

const page = (overrides: Partial<SitePage>): SitePage => ({
  id: 1,
  isHome: false,
  schemaType: 'WebPage',
  showInNav: true,
  order: 1,
  homeAnchor: null,
  paths: { fr: '/x/', en: '/en/x/' },
  navLabel: { fr: 'X', en: 'X' },
  ...overrides,
})
const home = page({ id: 1, isHome: true, order: 0, paths: { fr: '/', en: '/en/' }, navLabel: { fr: 'Accueil', en: 'Home' } })
const work = page({ id: 2, paths: { fr: '/projets/', en: '/en/work/' }, navLabel: { fr: 'Projets', en: 'Work' } })
const contact = page({ id: 3, schemaType: 'ContactPage', paths: { fr: '/contact/', en: '/en/contact/' } })
const pages = [home, work, contact]

const byType = (graph: { '@graph': JsonLdNode[] }, type: string) =>
  graph['@graph'].find((node) => node['@type'] === type) as JsonLdNode

describe('homeGraph', () => {
  const graph = homeGraph({ site, locale: 'en', page: home, seo }, { settings, services, catalogName: 'Services' })

  it('declares the shared entities with stable ids on the French home', () => {
    expect(byType(graph, 'WebSite')).toMatchObject({
      '@id': 'https://www.acolad.fr/#website',
      url: 'https://www.acolad.fr/',
      inLanguage: ['fr', 'en'],
    })
    expect(byType(graph, 'Person')).toMatchObject({
      '@id': 'https://www.acolad.fr/#person',
      email: 'mailto:contact@raphaelapard.fr',
      sameAs: ['https://github.com/raphaelApard'],
      worksFor: { '@id': 'https://www.acolad.fr/#business' },
    })
  })

  it('describes the page in its own language and URL', () => {
    expect(byType(graph, 'WebPage')).toMatchObject({
      '@id': 'https://www.acolad.fr/en/#webpage',
      url: 'https://www.acolad.fr/en/',
      inLanguage: 'en',
      name: 'Title',
    })
  })

  it('turns the services into an offer catalog', () => {
    const business = byType(graph, 'ProfessionalService') as { hasOfferCatalog: unknown }
    expect(business.hasOfferCatalog).toEqual({
      '@type': 'OfferCatalog',
      name: 'Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Websites', description: 'Fast sites.' } },
      ],
    })
  })
})

describe('pageGraph', () => {
  it('links the page to the site entities and adds a two-level breadcrumb', () => {
    const graph = pageGraph({ site, locale: 'en', page: work, seo }, pages)
    expect(byType(graph, 'WebPage')).toMatchObject({
      '@id': 'https://www.acolad.fr/en/work/#webpage',
      isPartOf: { '@id': 'https://www.acolad.fr/#website' },
      about: { '@id': 'https://www.acolad.fr/#person' },
      breadcrumb: { '@id': 'https://www.acolad.fr/en/work/#breadcrumb' },
    })
    expect(byType(graph, 'BreadcrumbList')).toMatchObject({
      itemListElement: [
        { position: 1, name: 'Home', item: 'https://www.acolad.fr/en/' },
        { position: 2, name: 'Work', item: 'https://www.acolad.fr/en/work/' },
      ],
    })
  })

  it('uses the structured data type chosen for the page', () => {
    const graph = pageGraph({ site, locale: 'fr', page: contact, seo }, pages)
    expect(graph['@graph'][0]).toMatchObject({ '@type': 'ContactPage' })
  })
})
