import type { SeedDoc } from '../types'

export const home: SeedDoc = {
  shared: {
    closing: {
      target: 'mailto',
    },
  },
  fr: {
    seo: {
      title: 'Raphaël Apard — Développeur Web & Solutions IA à Toulouse',
      description:
        'Développeur freelance à Toulouse / Revel : sites et applications web sur mesure (Next.js, React), agents IA, automatisation et intégration LLM / RAG. Missions sur site ou à distance.',
    },
    hero: {
      title: 'L’IA au service de la productivité des TPE et PME.',
      subtitle:
        'Automatisation des processus existants, création d’outils et d’applications sur mesure\u202f: je vous propose d’améliorer facilement votre efficacité opérationnelle au quotidien.',
      primaryCta: 'Contactez-moi',
      secondaryCta: 'Voir les projets',
      aside: [
        {
          text: 'Développeur Web & Solutions IA',
        },
        {
          text: 'Basé à Toulouse / Revel',
        },
        {
          text: 'Missions sur site ou à distance',
        },
      ],
    },
    sections: {
      services: 'Services',
      projects: 'Projets',
      clients: 'Clients',
      clientsHeading: 'Ils m’ont fait confiance',
      background: 'Parcours',
    },
    closing: {
      title: 'Un projet en tête\u202f? Parlons-en\u202f!',
    },
  },
  en: {
    seo: {
      title: 'Raphaël Apard — Web Developer & AI Solutions in Toulouse, France',
      description:
        'Freelance developer based in Toulouse, France: custom websites and web apps (Next.js, React), AI agents, automation and LLM / RAG integration. On-site or remote.',
    },
    hero: {
      title: 'AI that makes small and mid-sized businesses more productive.',
      subtitle:
        'Automating your existing processes, building tools and applications to measure: an easy way to improve your day-to-day operational efficiency.',
      primaryCta: 'Get in touch',
      secondaryCta: 'See the work',
      aside: [
        {
          text: 'Web Developer & AI Solutions',
        },
        {
          text: 'Based in Toulouse / Revel',
        },
        {
          text: 'On-site or remote',
        },
      ],
    },
    sections: {
      services: 'Services',
      projects: 'Work',
      clients: 'Clients',
      clientsHeading: 'Trusted by',
      background: 'Background',
    },
    closing: {
      title: 'Got a project? Let’s talk',
    },
  },
}

export const servicesPage: SeedDoc = {
  shared: {
    closing: {
      target: 'contact',
    },
  },
  fr: {
    seo: {
      title: 'Services — Raphaël Apard, Développeur Web & IA à Toulouse',
      description:
        'Sites et applications web, agents IA et automatisation, intégration LLM / RAG, audit et accompagnement\u202f: du cadrage à la mise en production, avec un seul interlocuteur.',
    },
    head: {
      title: 'Services',
      subtitle:
        'Du site vitrine à l’agent IA connecté à vos outils, avec un seul interlocuteur du cadrage à la mise en production.',
    },
    methodTitle: 'Méthode',
    process: [
      {
        title: 'Échange',
        description: 'Un premier appel pour comprendre le besoin et le contexte.',
      },
      {
        title: 'Cadrage',
        description: 'Périmètre, choix techniques et estimation écrite.',
      },
      {
        title: 'Réalisation',
        description: 'Livraisons régulières, retours intégrés au fil de l’eau.',
      },
      {
        title: 'Mise en ligne',
        description: 'Déploiement, passation et suivi après lancement.',
      },
    ],
    closing: {
      title: 'Un besoin précis\u202f? Parlons-en\u202f!',
    },
  },
  en: {
    seo: {
      title: 'Services — Raphaël Apard, Web Developer & AI in Toulouse',
      description:
        'Websites and web apps, AI agents and automation, LLM / RAG integration, audit and advisory: from scoping to production, with one point of contact.',
    },
    head: {
      title: 'Services',
      subtitle:
        'From marketing site to AI agent wired into your tools, with one point of contact from scoping to production.',
    },
    methodTitle: 'Process',
    process: [
      {
        title: 'Call',
        description: 'A first conversation to understand the need and context.',
      },
      {
        title: 'Scoping',
        description: 'Scope, technical choices and written estimate.',
      },
      {
        title: 'Build',
        description: 'Regular deliveries, feedback integrated as we go.',
      },
      {
        title: 'Launch',
        description: 'Deployment, handover and post-launch follow-up.',
      },
    ],
    closing: {
      title: 'A specific need? Let’s talk',
    },
  },
}

export const workPage: SeedDoc = {
  shared: {
    closing: {
      target: 'mailto',
    },
  },
  fr: {
    seo: {
      title: 'Projets — Raphaël Apard, Développeur Web & IA à Toulouse',
      description:
        'Une sélection de réalisations web et IA menées pour des PME, startups, institutions et agences\u202f: assistants IA, plateformes web, automatisation.',
    },
    head: {
      title: 'Projets',
      subtitle:
        'Une sélection de réalisations web et IA menées pour des PME, startups, institutions et agences.',
    },
    closing: {
      title: 'Un projet similaire\u202f? Parlons-en\u202f!',
    },
  },
  en: {
    seo: {
      title: 'Work — Raphaël Apard, Web Developer & AI in Toulouse',
      description:
        'Selected web and AI projects delivered for SMEs, startups, institutions and agencies: AI assistants, web platforms, automation.',
    },
    head: {
      title: 'Work',
      subtitle:
        'Selected web and AI projects delivered for SMEs, startups, institutions and agencies.',
    },
    closing: {
      title: 'A similar project? Let’s talk',
    },
  },
}

export const clientsPage: SeedDoc = {
  shared: {
    closing: {
      target: 'contact',
    },
  },
  fr: {
    seo: {
      title: 'Clients — Raphaël Apard, Développeur Web & IA à Toulouse',
      description:
        'Institutions, entreprises et agences pour lesquelles j’ai développé sites, applications et solutions IA, en direct ou en sous-traitance.',
    },
    head: {
      title: 'Ils m’ont fait confiance',
      subtitle:
        'Institutions, entreprises et agences pour lesquelles j’ai développé sites, applications et solutions IA, en direct ou en sous-traitance.',
    },
    countLabel: '{count} clients',
    closing: {
      title: 'Et vous\u202f?',
    },
  },
  en: {
    seo: {
      title: 'Clients — Raphaël Apard, Web Developer & AI in Toulouse',
      description:
        'Institutions, companies and agencies for which I built websites, apps and AI solutions, directly or as a subcontractor.',
    },
    head: {
      title: 'Trusted by',
      subtitle:
        'Institutions, companies and agencies for which I built websites, apps and AI solutions, directly or as a subcontractor.',
    },
    countLabel: '{count} clients',
    closing: {
      title: 'What about you?',
    },
  },
}

export const backgroundPage: SeedDoc = {
  shared: {
    closing: {
      target: 'contact',
    },
  },
  fr: {
    seo: {
      title: 'Parcours — Raphaël Apard, Développeur Web & IA à Toulouse',
      description:
        'Quinze ans de développement web\u202f: Drupal en agence, freelance sur React / Next.js, puis intégration d’IA générative dans des produits réels depuis 2023.',
    },
    head: {
      title: 'Parcours',
      subtitle:
        'Quinze ans de développement web, d’abord sur Drupal en agence, puis en freelance sur React / Next.js, et depuis 2023 sur l’intégration d’IA générative dans des produits réels.',
    },
    experienceTitle: 'Expérience',
    stackTitle: 'Stack',
    principlesTitle: 'Façon de travailler',
    principles: [
      {
        title: 'Un seul interlocuteur',
        description: 'Du cadrage à la mise en production, vous parlez à la personne qui code.',
      },
      {
        title: 'Livraisons régulières',
        description: 'Des versions testables tôt et souvent, pas de surprise en fin de projet.',
      },
      {
        title: 'Code transmissible',
        description:
          'Documenté, testé, prêt à être repris par votre équipe ou un autre prestataire.',
      },
    ],
    closing: {
      title: 'Envie de travailler ensemble\u202f?',
    },
  },
  en: {
    seo: {
      title: 'Background — Raphaël Apard, Web Developer & AI in Toulouse',
      description:
        'Fifteen years of web development: Drupal in agencies, freelance on React / Next.js, and integrating generative AI into real products since 2023.',
    },
    head: {
      title: 'Background',
      subtitle:
        'Fifteen years of web development: Drupal in agencies first, then freelance on React / Next.js, and since 2023 integrating generative AI into real products.',
    },
    experienceTitle: 'Experience',
    stackTitle: 'Stack',
    principlesTitle: 'How I work',
    principles: [
      {
        title: 'One point of contact',
        description: 'From scoping to production, you talk to the person writing the code.',
      },
      {
        title: 'Regular deliveries',
        description: 'Testable versions early and often, no surprises at the end.',
      },
      {
        title: 'Handover-ready code',
        description: 'Documented, tested, ready to be taken over by your team or another vendor.',
      },
    ],
    closing: {
      title: 'Want to work together?',
    },
  },
}

export const contactPage: SeedDoc = {
  shared: {},
  fr: {
    seo: {
      title: 'Contact — Raphaël Apard, Développeur Web & IA à Toulouse',
      description:
        'Décrivez votre besoin en quelques lignes\u202f: je vous réponds avec des premières pistes et une proposition de créneau. Développeur web et IA à Toulouse / Revel.',
    },
    head: {
      title: 'Un projet en tête\u202f? Parlons-en\u202f!',
      subtitle:
        'Décrivez votre besoin en quelques lignes, je vous réponds avec des premières pistes et une proposition de créneau.',
    },
    formTitle: 'Formulaire',
    form: {
      emailLabel: 'E-mail',
      messageLabel: 'Votre projet',
      messagePlaceholder: 'Contexte, objectif, délais souhaités…',
      submitLabel: 'Envoyer',
      privacyNote: 'Vos données ne servent qu’à répondre à votre demande.',
      subjectPrefix: 'Projet — ',
      sentTitle: 'Message envoyé, merci\u202f!',
      sentText: 'Je vous réponds sous 48 h ouvrées.',
      errorText: 'L’envoi a échoué : votre application de messagerie va s’ouvrir.',
    },
    reachTitle: 'Contact',
    reach: {
      emailLabel: 'Email',
      profilesLabel: 'Profils',
      locationLabel: 'Localisation',
      languagesLabel: 'Langues',
      brief:
        'Pour aller plus vite\u202f: contexte, objectif, délais souhaités et budget indicatif si vous en avez un.',
    },
  },
  en: {
    seo: {
      title: 'Contact — Raphaël Apard, Web Developer & AI in Toulouse',
      description:
        'Describe your need in a few lines: I’ll reply with first thoughts and a time to talk. Web and AI developer based in Toulouse / Revel, France.',
    },
    head: {
      title: 'Got a project? Let’s talk',
      subtitle:
        'Describe your need in a few lines, I’ll reply with first thoughts and a time to talk.',
    },
    formTitle: 'Form',
    form: {
      emailLabel: 'Email',
      messageLabel: 'Your project',
      messagePlaceholder: 'Context, goal, desired timeline…',
      submitLabel: 'Send',
      privacyNote: 'Your data is only used to reply to your request.',
      subjectPrefix: 'Project — ',
      sentTitle: 'Message sent, thank you!',
      sentText: 'I’ll reply within 2 business days.',
      errorText: 'Sending failed: your email app will open instead.',
    },
    reachTitle: 'Contact',
    reach: {
      emailLabel: 'Email',
      profilesLabel: 'Profiles',
      locationLabel: 'Location',
      languagesLabel: 'Languages',
      brief:
        'To move faster: context, goal, desired timeline and indicative budget if you have one.',
    },
  },
}
