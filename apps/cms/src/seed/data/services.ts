import type { SeedDoc } from '../types'

export const services: SeedDoc[] = [
  {
    shared: {
      anchor: 'web',
      order: 1,
    },
    fr: {
      title: 'Sites & applications web',
      shortDesc: 'Vitrines, e-commerce, back-offices. Next.js, performance et SEO soignés.',
      longDesc:
        'Sites vitrines, e-commerce, back-offices et applications métier. Performance, SEO et accessibilité soignés dès la conception.',
      deliverables: [
        {
          text: 'Site vitrine ou e-commerce prêt à publier',
        },
        {
          text: 'Application web ou back-office sur mesure',
        },
        {
          text: 'Refonte ou migration de site existant',
        },
        {
          text: 'Hébergement, déploiement et suivi',
        },
      ],
      stack: ['Next.js', 'React', 'TypeScript', 'NestJS', 'Drupal', 'PostgreSQL'],
    },
    en: {
      title: 'Websites & web apps',
      shortDesc:
        'Marketing sites, e-commerce, back-offices. Next.js, performance and SEO done right.',
      longDesc:
        'Marketing sites, e-commerce, back-offices and business apps. Performance, SEO and accessibility built in from day one.',
      deliverables: [
        {
          text: 'Marketing or e-commerce site ready to publish',
        },
        {
          text: 'Custom web app or back-office',
        },
        {
          text: 'Redesign or migration of an existing site',
        },
        {
          text: 'Hosting, deployment and follow-up',
        },
      ],
      stack: ['Next.js', 'React', 'TypeScript', 'NestJS', 'Drupal', 'PostgreSQL'],
    },
  },
  {
    shared: {
      anchor: 'agents',
      order: 2,
    },
    fr: {
      title: 'Agents IA & automatisation',
      shortDesc: 'Assistants métier, workflows automatisés, connexion à vos outils existants.',
      longDesc:
        'Assistants métier et workflows automatisés, connectés à votre CRM, vos e-mails et vos outils existants.',
      deliverables: [
        {
          text: 'Agent conversationnel pour le support ou la vente',
        },
        {
          text: 'Automatisation de tâches répétitives (devis, tri, saisie)',
        },
        {
          text: 'Connexion à vos outils\u202f: CRM, Google Workspace, Notion…',
        },
        {
          text: 'Supervision et garde-fous humains',
        },
      ],
      stack: ['Anthropic', 'OpenAI', 'n8n', 'MCP', 'Node.js'],
    },
    en: {
      title: 'AI agents & automation',
      shortDesc: 'Business assistants, automated workflows, connected to your existing tools.',
      longDesc:
        'Business assistants and automated workflows, connected to your CRM, email and existing tools.',
      deliverables: [
        {
          text: 'Conversational agent for support or sales',
        },
        {
          text: 'Automation of repetitive tasks (quotes, sorting, data entry)',
        },
        {
          text: 'Integration with your tools: CRM, Google Workspace, Notion…',
        },
        {
          text: 'Monitoring and human guardrails',
        },
      ],
      stack: ['Anthropic', 'OpenAI', 'n8n', 'MCP', 'Node.js'],
    },
  },
  {
    shared: {
      anchor: 'rag',
      order: 3,
    },
    fr: {
      title: 'Intégration LLM & RAG',
      shortDesc:
        'Recherche dans vos documents, chatbots fiables sur vos données. Intégration OpenAI / Anthropic / Mistral.',
      longDesc:
        'Recherche et questions-réponses fiables sur vos propres documents, avec réponses sourcées.',
      deliverables: [
        {
          text: 'Moteur de recherche documentaire interne',
        },
        {
          text: 'Chatbot fiable sur vos données',
        },
        {
          text: 'Pipeline d’ingestion et de mise à jour des documents',
        },
        {
          text: 'Évaluation de la qualité des réponses',
        },
      ],
      stack: ['Python', 'FastAPI', 'LangChain', 'Elasticsearch', 'Mistral'],
    },
    en: {
      title: 'LLM & RAG integration',
      shortDesc:
        'Search across your documents, reliable chatbots on your data. OpenAI / Anthropic / Mistral integration.',
      longDesc: 'Reliable search and Q&A over your own documents, with sourced answers.',
      deliverables: [
        {
          text: 'Internal document search engine',
        },
        {
          text: 'Reliable chatbot on your data',
        },
        {
          text: 'Document ingestion and update pipeline',
        },
        {
          text: 'Answer quality evaluation',
        },
      ],
      stack: ['Python', 'FastAPI', 'LangChain', 'Elasticsearch', 'Mistral'],
    },
  },
  {
    shared: {
      anchor: 'audit',
      order: 4,
    },
    fr: {
      title: 'Audit & accompagnement',
      shortDesc: 'Cadrage, choix techniques, montée en compétence de vos équipes.',
      longDesc: 'Cadrage de projet, choix techniques et montée en compétence de vos équipes.',
      deliverables: [
        {
          text: 'Audit technique et recommandations',
        },
        {
          text: 'Cadrage et estimation de projet',
        },
        {
          text: 'Formation React / Next.js / IA générative',
        },
        {
          text: 'Accompagnement d’équipe en cours de projet',
        },
      ],
      stack: ['Architecture', 'CI/CD', 'Docker', 'Formation'],
    },
    en: {
      title: 'Audit & advisory',
      shortDesc: 'Scoping, technical decisions, upskilling your team.',
      longDesc: 'Project scoping, technical decisions and upskilling your team.',
      deliverables: [
        {
          text: 'Technical audit and recommendations',
        },
        {
          text: 'Project scoping and estimate',
        },
        {
          text: 'React / Next.js / generative AI training',
        },
        {
          text: 'Team support during the project',
        },
      ],
      stack: ['Architecture', 'CI/CD', 'Docker', 'Training'],
    },
  },
]
