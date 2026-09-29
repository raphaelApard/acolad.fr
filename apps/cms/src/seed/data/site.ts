import type { SeedDoc } from '../types'

/** Identity, contact details and SEO defaults (extracted from the legacy pages). */
export const site: SeedDoc = {
  shared: {
    name: 'Raphaël Apard',
    businessName: 'Acolad développement',
    copyrightHolder: 'Raphaël Apard - Acolad développement',
    email: 'contact@raphaelapard.fr',
    address: {
      locality: 'Toulouse',
      region: 'Occitanie',
      country: 'FR',
    },
    socials: [
      {
        label: 'LinkedIn',
        url: 'https://www.linkedin.com/in/raphael-apard-81b90924/',
      },
      {
        label: 'GitHub',
        url: 'https://github.com/raphaelApard',
      },
      {
        label: 'Malt',
        url: 'https://www.malt.fr/profile/raphaelapard',
      },
    ],
    knowsAbout: [
      'TypeScript',
      'React',
      'Next.js',
      'Node.js',
      'NestJS',
      'Python',
      'FastAPI',
      'PHP',
      'Drupal',
      'Symfony',
      'GraphQL',
      'OpenAI',
      'Anthropic',
      'Mistral',
      'LangChain',
      'AI Agents',
      'RAG',
      'MCP',
      'PostgreSQL',
      'Elasticsearch',
      'n8n',
      'Docker',
    ],
  },
  fr: {
    jobTitle: 'Développeur Web & Solutions IA',
    location: 'Toulouse / Revel',
    availability: 'Missions sur site ou à distance',
    languages: 'Français, English',
    ogImagePath: '/assets/og-fr.png',
    ogImageAlt: 'Raphaël Apard — Développeur Web & Solutions IA',
  },
  en: {
    jobTitle: 'Web Developer & AI Solutions',
    location: 'Toulouse / Revel',
    availability: 'On-site or remote',
    languages: 'Français, English',
    ogImagePath: '/assets/og-en.png',
    ogImageAlt: 'Raphaël Apard — Web Developer & AI Solutions',
  },
}
