import type { SeedDoc } from '../types'

/** `imageFile` is a file of src/seed/media/project-images; the seed uploads it and links it. */
export const projects: SeedDoc[] = [
  {
    shared: {
      category: 'ia',
      order: 1,
      showOnHome: true,
      year: '2025',
      imageFile: 'support-ia.webp',
      imageWidth: 2956,
      imageHeight: 1812,
      stack: 'Anthropic, n8n, Node.js, PostgreSQL',
    },
    fr: {
      title: 'Assistant support client',
      tag: 'Agent IA',
      shortDesc:
        'Agent connecté au CRM répondant aux demandes de niveau 1 pour une PME de services.',
      longDesc:
        'Agent connecté au CRM répondant aux demandes de niveau 1, escalade automatique vers un humain sur les cas complexes.',
      client: 'PME de services',
      result: '−60\u202f% de tickets traités manuellement',
      imageAlt:
        'Back-office de supervision d’un agent IA de support\u202f: points à arbitrer, part des demandes résolues sans humain et file d’escalade.',
    },
    en: {
      title: 'Customer support assistant',
      tag: 'AI agent',
      shortDesc: 'CRM-connected agent handling tier-1 requests for a services SME.',
      longDesc:
        'CRM-connected agent handling tier-1 requests, automatic escalation to a human on complex cases.',
      client: 'Services SME',
      result: '−60% tickets handled manually',
      imageAlt:
        'Supervision back-office for an AI support agent: items needing a decision, share of requests resolved without a human, and the escalation queue.',
    },
  },
  {
    shared: {
      category: 'web',
      order: 2,
      showOnHome: true,
      year: '2025',
      imageFile: 'booking-studio-reformer.webp',
      imageWidth: 3492,
      imageHeight: 2116,
      stack: 'Next.js, NestJS, Stripe, PostgreSQL',
    },
    fr: {
      title: 'Plateforme de réservation',
      tag: 'Web',
      shortDesc: 'Site + back-office pour une startup, paiement en ligne et espace client.',
      longDesc:
        'Site + back-office, paiement en ligne et espace client. Conçu pour évoluer avec l’offre.',
      client: 'Startup',
      result: 'Mise en ligne en 6 semaines',
      imageAlt:
        'Back-office d’un studio de Pilates\u202f: réservations du jour, taux de remplissage et planning des cours avec liste des inscrites.',
    },
    en: {
      title: 'Booking platform',
      tag: 'Web',
      shortDesc: 'Site + back-office for a startup, online payment and customer area.',
      longDesc:
        'Site + back-office, online payment and customer area. Built to grow with the offer.',
      client: 'Startup',
      result: 'Live in 6 weeks',
      imageAlt:
        'Pilates studio back-office: today’s bookings, occupancy rate, and the class schedule with the list of registered members.',
    },
  },
  {
    shared: {
      category: 'ia',
      order: 3,
      showOnHome: true,
      imageFile: 'obepine.webp',
      imageWidth: 1453,
      imageHeight: 830,
    },
    fr: {
      title: 'Rapports d’analyses scientifiques',
      tag: 'Automatisation',
      shortDesc:
        'Collecte automatisée de rapports d’analyses scientifiques pour un réseau de stations de filtration des eaux.',
      longDesc:
        'Collecte automatisée de rapports d’analyses scientifiques pour un réseau de stations de filtration des eaux.',
      imageAlt:
        'Interface du Réseau Obépine\u202f: liste des stations de traitement des eaux avec dépôt de rapport par station.',
    },
    en: {
      title: 'Scientific analysis reports',
      tag: 'Automation',
      shortDesc:
        'Automated collection of scientific analysis reports for a network of water filtration stations.',
      longDesc:
        'Automated collection of scientific analysis reports for a network of water filtration stations.',
      imageAlt:
        'Réseau Obépine interface: list of water treatment stations with per-station report upload.',
    },
  },
]
