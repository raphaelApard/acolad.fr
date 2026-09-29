import type { SeedDoc } from '../types'

export const jobs: SeedDoc[] = [
  {
    shared: {
      order: 1,
      showOnHome: true,
    },
    fr: {
      years: '2014 — auj.',
      role: 'Développeur freelance Web & IA',
      org: 'Indépendant — Toulouse / Revel',
      description:
        'Sites, applications et solutions IA pour PME, startups, institutions et agences.',
    },
    en: {
      years: '2014 — now',
      role: 'Freelance Web & AI developer',
      org: 'Independent — Toulouse / Revel',
      description: 'Websites, apps and AI solutions for SMEs, startups, institutions and agencies.',
    },
  },
  {
    shared: {
      order: 2,
      showOnHome: true,
    },
    fr: {
      years: '2023 — 2026',
      role: 'Développeur Web',
      org: 'En mission chez OVHcloud',
      description: 'Développement front React / TypeScript au sein des équipes produit.',
    },
    en: {
      years: '2023 — 2026',
      role: 'Web developer',
      org: 'On assignment at OVHcloud',
      description: 'React / TypeScript front-end development within product teams.',
    },
  },
  {
    shared: {
      order: 3,
      showOnHome: true,
    },
    fr: {
      years: '2016 — 2021',
      role: 'Formateur en développement web',
      org: 'Simplon',
      description: 'Formation de développeurs juniors\u202f: HTML/CSS, JavaScript, React, PHP.',
    },
    en: {
      years: '2016 — 2021',
      role: 'Web development trainer',
      org: 'Simplon',
      description: 'Training junior developers: HTML/CSS, JavaScript, React, PHP.',
    },
  },
  {
    shared: {
      order: 4,
      showOnHome: true,
    },
    fr: {
      years: '2012 — 2014',
      role: 'Expert Drupal',
      org: 'Makina Corpus',
      description: 'Architecture et développement de sites institutionnels et cartographiques.',
    },
    en: {
      years: '2012 — 2014',
      role: 'Drupal expert',
      org: 'Makina Corpus',
      description: 'Architecture and development of institutional and mapping websites.',
    },
  },
  {
    shared: {
      order: 5,
      showOnHome: true,
    },
    fr: {
      years: '2011 — 2012',
      role: 'Développeur Drupal',
      org: 'X-Prime Groupe',
      description: 'Intégration et développement de modules pour sites d’agence.',
    },
    en: {
      years: '2011 — 2012',
      role: 'Drupal developer',
      org: 'X-Prime Groupe',
      description: 'Integration and module development for agency websites.',
    },
  },
]
