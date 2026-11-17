import type { SiteContent } from './types';

const email = 'raphael.apard@acolad.fr';

export const en: SiteContent = {
  lang: 'en',
  languageName: 'English',
  siteName: 'Acolad Développement',
  ui: {
    skipLink: 'Skip to content',
    mainNav: 'Main navigation',
    languageSwitch: 'Site language',
    openMenu: 'Open the menu',
    closeMenu: 'Close the menu',
    homeLink: 'Acolad Développement, home',
    technologies: 'Technologies',
    faqTitle: 'Frequently asked questions',
    processEyebrow: 'Process',
    servicePrefix: 'Service',
  },
  nav: { services: 'Services', work: 'Work', about: 'About', contact: 'Contact' },
  projects: {
    ovhcloud: { name: 'Mission OVHcloud', alt: 'Screenshot of the OVHcloud website' },
    docteurConso: { name: 'Docteur Conso', alt: 'Screenshot of the new Docteur Conso platform' },
    cnrs: { name: 'CNRS Images', alt: 'Screenshot of the CNRS Images platform' },
    obepine: { name: 'Obépine network', alt: 'Screenshot of the Obépine network platform' },
    issy: { name: 'City of Issy-les-Moulineaux', alt: 'Screenshot of the City of Issy-les-Moulineaux website' },
    syndex: { name: 'Syndex', alt: 'Screenshot of the Syndex website' },
    hospital: { name: 'American Hospital of Paris', alt: 'Screenshot of the American Hospital of Paris website' },
    meetToTravel: { name: 'Meet to Travel', alt: 'Screenshot of the Meet to Travel social network' },
    parisSaclay: { name: 'Paris-Saclay University', alt: 'Screenshot of the Paris-Saclay University website' },
  },
  cta: {
    title: 'A project to launch, an application to take over, a site to host?',
    text: 'Describe what you need in a few lines. You get a first reply with the questions that help scope the next steps.',
    button: 'Talk about your project',
  },
  footer: {
    tagline:
      'Web development company. Business applications, AI integration, audits, application maintenance, Drupal maintenance and hosting since 2014.',
    servicesTitle: 'Services',
    companyTitle: 'Company',
    contactTitle: 'Contact',
    location: 'Toulouse and Revel (Haute-Garonne, France)',
    copyright: 'Acolad Développement SASU',
    note: 'Static site, no advertising cookies',
  },
  home: {
    meta: {
      title: 'Web development company in Toulouse',
      description:
        'Acolad Développement, a web development company in Toulouse since 2014: business applications, AI integration, audits, maintenance, Drupal and hosting.',
    },
    eyebrow: 'Web development company · Toulouse · since 2014',
    h1: 'Your web applications, built, maintained and hosted.',
    h1Muted: 'Your web applications,',
    lead: 'Acolad Développement designs business applications, takes over the maintenance of existing ones, keeps your Drupal sites running and hosts them. A single point of contact, from scoping to operations.',
    primaryCta: 'Talk about your project',
    secondaryCta: 'See the work',
    clientsLabel: 'They have trusted Acolad',
    clientsPrevious: 'Previous logos',
    clientsNext: 'Next logos',
    clients: [
      { id: 'ovhcloud', name: 'OVHcloud' },
      { id: 'cnrs', name: 'CNRS Images' },
      { id: 'hospital', name: 'American Hospital of Paris' },
      { id: 'pantheonSorbonne', name: 'Université Paris 1 Panthéon-Sorbonne' },
      { id: 'eyFabernovel', name: 'EY Fabernovel' },
      { id: 'parisSaclay', name: 'Université Paris-Saclay' },
      { id: 'syndex', name: 'Syndex' },
      { id: 'muzeo', name: 'Muzéo' },
      { id: 'docteurConso', name: 'Docteur Conso' },
      { id: 'axess', name: 'Axess Open Web Services' },
      { id: 'issy', name: 'City of Issy-les-Moulineaux' },
      { id: 'humansConnexion', name: "Human's Connexion" },
      { id: 'makinaCorpus', name: 'Makina Corpus' },
    ],
    services: {
      eyebrow: 'Services',
      title: 'The whole life cycle of a web application, in one place.',
      text: 'Each service can be taken on its own. Together, they avoid handovers between the supplier that builds, the one that maintains and the one that hosts.',
    },
    method: {
      eyebrow: 'Method',
      title: 'From the need to operations, with the same contact throughout.',
      steps: [
        {
          title: 'Scoping',
          text: 'Understanding the need, the users and what already exists. A clear scope and estimate before starting.',
        },
        {
          title: 'Development',
          text: 'Short, regular, tested deliveries, visible on a staging environment.',
        },
        {
          title: 'Go-live',
          text: 'Automated deployment, with performance, security and accessibility checks.',
        },
        { title: 'Follow-up', text: 'Maintenance, changes and hosting: the same person after go-live.' },
      ],
    },
    work: {
      eyebrow: 'Work',
      title: 'Platforms in production, for public and private organisations.',
      link: 'All the work',
      items: [
        {
          project: 'cnrs',
          meta: '2020 – 2021 · Drupal, PHP, RGAA',
          text: "Technical lead and development of CNRS's photo and video platform.",
        },
        {
          project: 'issy',
          meta: 'Drupal, TypeScript, RGAA',
          text: "Technical lead and development of the city's website, to RGAA accessibility criteria.",
        },
        {
          project: 'hospital',
          meta: 'Drupal',
          text: "Technical lead and development of the hospital's public website.",
        },
      ],
    },
    company: {
      eyebrow: 'The company',
      title: 'A web development company, since 2014.',
      text: 'Acolad Développement was founded in 2014 by Raphaël Apard, a web developer for twenty years. You deal directly with the person who designs, builds and maintains your project.',
      link: 'More about the company',
      facts: [
        { label: 'Since', lines: ['2014'] },
        { label: 'Experience', lines: ['20 years of web application development'] },
        { label: 'Certifications', lines: ['Acquia Certified Developer, Opquast'] },
        { label: 'Location', lines: ['Toulouse, and remotely anywhere in France'] },
      ],
    },
  },
  services: {
    apps: {
      number: '02',
      name: 'Business applications',
      navLabel: 'Business applications',
      navText: 'Extranets, data platforms, back offices, portals.',
      card: {
        title: 'Business applications',
        text: 'Web tools built around your processes: extranets, data platforms, back offices, portals.',
        points: [
          'Scoping, architecture and technical choices',
          'TypeScript, React, Next.js, Node.js, PHP',
          'Automated tests and continuous integration',
        ],
        link: 'Explore bespoke development',
      },
      contactOption: 'Build a business application',
      meta: {
        title: 'Bespoke business application development in Toulouse',
        description:
          'Design and development of bespoke business web applications: extranets, back offices, data platforms. TypeScript, React, Next.js, Node.js, PHP.',
      },
      eyebrow: 'Bespoke development',
      h1: 'Business applications designed for the people who use them.',
      lead: 'When a spreadsheet or off-the-shelf software is no longer enough, Acolad Développement designs the web tool that fits your business: it implements your business rules, connects to your information system and grows with you.',
      cta: 'Describe your project',
      coverTitle: 'What the service covers',
      cover: [
        {
          title: 'Scoping and specifications',
          text: 'Workshops with users, user journeys, business rules and a prioritised scope.',
        },
        { title: 'Architecture', text: 'Reasoned technical choices, made for the lifetime of the application.' },
        {
          title: 'Front-end and back-end development',
          text: 'React and Next.js interfaces, REST or GraphQL APIs, PostgreSQL or MySQL databases.',
        },
        {
          title: 'Integrations and AI',
          text: 'OAuth authentication, third-party APIs, CMS, data feeds, AI features (generation, translation, assistants).',
        },
        {
          title: 'Quality and delivery',
          text: 'Unit, integration and end-to-end tests with Playwright, code review, CI/CD.',
        },
        {
          title: 'Accessibility and performance',
          text: 'Interfaces built to RGAA criteria (French accessibility standard) and monitored on Core Web Vitals.',
        },
      ],
      process: {
        title: 'A project split into stages you can see and test.',
        steps: [
          {
            title: 'Scoping workshop',
            text: 'Need, users, constraints. The outcome: a scope, priorities and an estimate.',
          },
          {
            title: 'Mock-ups and prototype',
            text: 'Key screens validated with users before writing the code that will stay.',
          },
          {
            title: 'Iterative development',
            text: 'Regular deliveries to a staging environment, tested automatically.',
          },
          {
            title: 'Go-live and follow-up',
            text: 'Deployment, documentation, then maintenance and hosting if you wish.',
          },
        ],
      },
      showcase: {
        eyebrow: 'References',
        title: 'Business applications in production',
        kind: 'projects',
        items: [
          {
            project: 'docteurConso',
            meta: '2026 · Next.js, React, PostgreSQL',
            text: 'Rebuild of the sustainability indicators platform with Next.js and PostgreSQL.',
          },
          {
            project: 'obepine',
            meta: '2020 – 2021 · Drupal, PHP, TypeScript',
            text: 'Reporting platform for the national wastewater monitoring network: automated data processing, advanced permissions for partner laboratories.',
          },
        ],
      },
      faq: [
        {
          question: 'Who owns the code?',
          answer: 'You do. The source code is delivered in your repository, with its documentation and tests.',
        },
        {
          question: 'Can an existing application be taken over?',
          answer:
            'Yes, that is the purpose of [third-party application maintenance](page:tma): a takeover audit, then fixes and enhancements.',
        },
        {
          question: 'Where is the application hosted?',
          answer:
            "On your own infrastructure, with your hosting provider, or as part of Acolad Développement's [hosting service](page:hosting).",
        },
      ],
    },
    tma: {
      number: '04',
      name: 'Application maintenance',
      navLabel: 'Maintenance',
      navText: 'Takeover and maintenance of existing applications.',
      card: {
        title: 'Application maintenance',
        text: 'Takeover and maintenance of existing applications, including those built by another supplier.',
        points: [
          'Takeover audit and documentation',
          'Fixes and functional enhancements',
          'Security updates and version upgrades',
        ],
        link: 'Explore application maintenance',
      },
      contactOption: 'Hand over the maintenance of an application',
      meta: {
        title: 'Application maintenance for web applications in Toulouse',
        description:
          'Takeover and maintenance of existing web applications: takeover audit, fixes, enhancements, security updates. PHP, Node.js, React, Next.js, Angular.',
      },
      eyebrow: 'Third-party application maintenance',
      h1: 'Your application taken over, maintained and put back on track.',
      lead: 'Your supplier has stopped, your developer has left or your in-house team no longer has the time? Acolad Développement takes over the maintenance of your web application: fixing, securing and improving it, without rewriting everything.',
      cta: 'Request a takeover audit',
      coverTitle: 'What the service covers',
      cover: [
        {
          title: 'Takeover audit',
          text: 'State of the code, dependencies, security and hosting. A report and a prioritised action plan.',
        },
        {
          title: 'Corrective maintenance',
          text: 'Diagnosis and correction of defects, with an automated test that stops them coming back.',
        },
        { title: 'Adaptive maintenance', text: 'New features and adaptations, estimated before work starts.' },
        {
          title: 'Preventive maintenance',
          text: 'Security updates, version upgrades of frameworks and dependencies.',
        },
        {
          title: 'Refactoring and tests',
          text: 'Gradual upgrading of the code, with tests added to the critical parts first.',
        },
        {
          title: 'Transparent tracking',
          text: 'Tracked tickets, a regular catch-up and a report of what has been done.',
        },
      ],
      process: {
        title: 'A takeover in four stages, with no service interruption.',
        steps: [
          { title: 'Audit', text: 'Review of the code and infrastructure, identification of risks, action plan.' },
          {
            title: 'Handover',
            text: 'Retrieval of the code, access rights and environments. A staging environment is set up.',
          },
          { title: 'Stabilisation', text: 'Urgent fixes, security updates, first automated tests.' },
          {
            title: 'Steady state',
            text: 'Ongoing maintenance and planned enhancements, at the pace of your business.',
          },
        ],
      },
      showcase: {
        eyebrow: 'Reference',
        title: 'An application supported over the long term',
        kind: 'projects',
        items: [
          {
            project: 'ovhcloud',
            meta: '2023 – 2026 · React, Drupal 10/11, Playwright',
            text: 'Three years on the web platforms: enhancements, end-to-end tests set up and maintained, performance optimisation.',
          },
        ],
      },
      faq: [
        {
          question: 'Can an application built by someone else be taken over?',
          answer:
            'Yes, that is the principle of third-party application maintenance. The takeover audit shows both sides exactly what they are committing to.',
        },
        {
          question: 'Does everything need to be rewritten?',
          answer:
            'Rarely. The upgrade is done in steps, starting with whatever carries a risk: security, obsolete versions, parts without tests.',
        },
        {
          question: 'How is the work billed?',
          answer: '[YOUR PLAN: monthly retainer, block of hours, quote per enhancement]',
        },
        {
          question: 'And if you change supplier?',
          answer: 'The code, documentation and access rights remain yours. Nothing is locked in.',
        },
      ],
    },
    drupal: {
      number: '05',
      name: 'Drupal maintenance',
      navLabel: 'Drupal',
      navText: 'Up to date and secure, from Drupal 7 to Drupal 11.',
      card: {
        title: 'Drupal maintenance',
        text: 'Your Drupal site kept up to date, secure and ready for the next version, from Drupal 7 to Drupal 11.',
        points: ['Core and module updates', 'Version and content migrations', 'Acquia-certified developer'],
        link: 'Explore Drupal maintenance',
      },
      contactOption: 'Maintain or migrate a Drupal site',
      meta: {
        title: 'Drupal maintenance in Toulouse: updates, security, migration',
        description:
          'Maintenance of Drupal 7 to 11 sites by an Acquia-certified developer: security updates, version migration, custom modules, headless Drupal.',
      },
      eyebrow: 'Drupal maintenance',
      h1: 'A Drupal site that is up to date, secure and ready for the next version.',
      lead: 'Drupal has been part of Acolad Développement since it was founded: institutional sites, multilingual platforms, headless Drupal. Maintenance covers updates, security, migrations and enhancements to your site.',
      cta: 'Have your Drupal site audited',
      coverTitle: 'What the service covers',
      cover: [
        {
          title: 'Security updates',
          text: 'Monitoring of Drupal security advisories, patches for core and contributed modules.',
        },
        {
          title: 'Version migration',
          text: 'From Drupal 7, 8 or 9 to Drupal 10 and 11: content, custom modules and theme.',
        },
        {
          title: 'Custom modules',
          text: 'Specific features, roles and permissions, editorial workflows, connectors.',
        },
        { title: 'Theme and accessibility', text: 'Twig and SCSS integration to RGAA accessibility criteria.' },
        { title: 'Headless Drupal', text: 'JSON:API and React, Next.js or Angular applications fed by Drupal.' },
        { title: 'Search and performance', text: 'Apache Solr, caching strategy and Core Web Vitals monitoring.' },
      ],
      process: {
        title: 'Every update goes through staging before production.',
        steps: [
          {
            title: 'Site audit',
            text: 'Versions, modules, custom code, security. An assessment and priorities.',
          },
          { title: 'Catch-up', text: 'Applying overdue updates and fixing blocking issues.' },
          {
            title: 'Regular maintenance',
            text: 'Updates applied on staging, checked by regression tests, then deployed.',
          },
          { title: 'Enhancements', text: 'New features and preparation for the next major version.' },
        ],
      },
      showcase: {
        eyebrow: 'References',
        title: 'Drupal sites for demanding institutions',
        kind: 'projects',
        items: [
          {
            project: 'cnrs',
            text: 'Migration of the media catalogue, custom roles and permissions, RGAA-compliant theme.',
          },
          {
            project: 'issy',
            text: "Technical lead and development of the city's website, integration to RGAA criteria.",
          },
          {
            project: 'syndex',
            text: 'Six-language Drupal 8 website for a consultancy serving employee representatives.',
          },
        ],
      },
      faq: [
        {
          question: 'Your site is still on Drupal 7: what should you do?',
          answer:
            'Drupal 7 has no longer been maintained by the community since January 2025. The audit helps you choose between a migration to Drupal 11 and a rebuild, with a budget for each option.',
        },
        {
          question: 'Can a site built by another supplier be taken over?',
          answer:
            'Yes. Most of the sites under maintenance were created by an agency or an in-house team. The initial audit is there to get to know the site.',
        },
        {
          question: 'How often are updates applied?',
          answer: '[YOUR SCHEDULE: for example security patches first, other updates every month]',
        },
        {
          question: 'Is hosting the site also possible?',
          answer:
            'Yes, with the [hosting service](page:hosting). Maintenance also works with your current hosting provider.',
        },
      ],
    },
    hosting: {
      number: '06',
      name: 'Website hosting',
      navLabel: 'Hosting',
      navText: 'Run by the person who knows the code: no passing the buck.',
      card: {
        title: 'Hosting',
        text: 'Your sites and applications hosted and run by the person who knows them: no passing the buck when there is an incident.',
        points: ['Go-live and HTTPS certificates', 'Backups and restores', 'Monitoring and server updates'],
        link: 'Explore hosting',
      },
      contactOption: 'Host a site or an application',
      meta: {
        title: 'Managed hosting for websites and web applications',
        description:
          'Hosting and operation of Drupal sites and web applications: go-live, HTTPS, backups, monitoring, server updates.',
      },
      eyebrow: 'Website hosting',
      h1: 'Hosting run by the person who knows your site.',
      lead: 'Acolad Développement hosts and operates the sites and applications it builds or maintains. When there is an incident, there is no need to work out whether the problem lies in the code or the server: the contact is the same.',
      cta: 'Request a proposal',
      coverTitle: 'What the service covers',
      cover: [
        {
          title: 'Go-live',
          text: 'Automated deployment from your repository, with a staging environment and a production one.',
        },
        {
          title: 'HTTPS and domain name',
          text: 'Certificates renewed automatically, DNS configuration and redirects.',
        },
        {
          title: 'Backups',
          text: 'Files and databases backed up, restores tested.',
        },
        { title: 'Monitoring', text: 'Availability monitoring and alerts when there is an incident.' },
        {
          title: 'Server updates',
          text: 'PHP, Node.js and database versions, system security patches.',
        },
        {
          title: 'Performance',
          text: 'Caching, compression and Apache or Nginx configuration tuned to your application.',
        },
      ],
      process: {
        title: 'A prepared migration, a planned switchover.',
        steps: [
          {
            title: 'Review of the existing setup',
            text: 'Traffic, technologies, data volumes, constraints: what is needed to size the hosting.',
          },
          {
            title: 'Preparation',
            text: 'Environments, automated deployment, backups and monitoring in place before the switchover.',
          },
          {
            title: 'Switchover',
            text: 'Migration on an agreed date, at a low-traffic time, with a rollback option.',
          },
          { title: 'Operations', text: 'Monitoring, updates and interventions, with a regular report.' },
        ],
      },
      showcase: {
        eyebrow: 'Plans',
        title: 'Three levels, depending on what you host',
        kind: 'plans',
        items: [
          {
            title: 'Brochure or Drupal site',
            text: 'For an institutional or editorial site, with its backups and certificate.',
            price: '[PRICE]',
            unit: '€ excl. VAT / month',
            points: ['[RESOURCES INCLUDED]', '[BACKUPS]', '[RESPONSE TIME]'],
          },
          {
            title: 'Business application',
            text: 'For an application with a database, staging and automated deployment.',
            price: '[PRICE]',
            unit: '€ excl. VAT / month',
            points: ['[RESOURCES INCLUDED]', '[BACKUPS]', '[RESPONSE TIME]'],
            featured: true,
          },
          {
            title: 'Bespoke',
            text: 'For high traffic, several sites or specific constraints.',
            price: 'On quotation',
            points: ['Architecture sized after analysis', '[BACKUPS]', '[RESPONSE TIME]'],
          },
        ],
      },
      faq: [
        {
          question: 'Where is the data hosted?',
          answer: 'On servers located in France, with a French hosting provider. No data leaves the European Union.',
        },
        {
          question: 'Can a site that is already live be migrated?',
          answer: 'Yes. The site is installed and checked on the new hosting before the domain name is switched over.',
        },
        {
          question: 'What happens if there is an outage?',
          answer: 'An alert is raised automatically, so that action can be taken quickly.',
        },
        {
          question: 'Does hosting require a maintenance contract?',
          answer:
            'No, but the two go together: a hosted site without application updates ends up being a security problem. See [application maintenance](page:tma) and [Drupal maintenance](page:drupal).',
        },
      ],
    },
    audit: {
      number: '01',
      name: 'Audit and consulting',
      navLabel: 'Audit',
      navText: 'A reasoned assessment, before a rebuild or a takeover.',
      card: {
        title: 'Audit and consulting',
        text: 'A reasoned assessment of your site or application, before a rebuild or a takeover.',
        points: [
          'Code, security and performance',
          'RGAA accessibility and Opquast quality',
          'Prioritised report and action plan',
        ],
        link: 'Explore the audit',
      },
      contactOption: 'Have a site or an application audited',
      meta: {
        title: 'Website and application audit: code, security, performance',
        description:
          'Technical audit of websites and web applications by an Opquast-certified developer: code quality, security, performance, RGAA accessibility. Prioritised report.',
      },
      eyebrow: 'Audit and consulting',
      h1: 'An outside, reasoned view of your site or application.',
      lead: 'Before a rebuild, a maintenance takeover or a change of supplier, Acolad Développement examines what exists and delivers a clear report: what works, what carries a risk and where to start.',
      cta: 'Request an audit',
      coverTitle: 'What the audit can cover',
      cover: [
        {
          title: 'Code quality',
          text: 'Architecture, technical debt, obsolete dependencies, test coverage.',
        },
        {
          title: 'Security',
          text: 'Exposed versions, overdue updates, server configuration, access management.',
        },
        { title: 'Performance', text: 'Core Web Vitals, response times, caching strategy, page weight.' },
        {
          title: 'Accessibility',
          text: 'Checks against RGAA criteria (French accessibility standard) and prioritised fixes.',
        },
        {
          title: 'Web quality',
          text: 'Opquast good practices: content, forms, technical SEO. Audit carried out by an Opquast-certified developer.',
        },
        {
          title: 'Technical advice',
          text: 'Choice of architecture, CMS or framework, scoping of a rebuild or a migration.',
        },
      ],
      process: {
        title: 'Findings that are measured, ranked and costed.',
        steps: [
          { title: 'Scope', text: 'What needs to be examined and the decision the audit should inform.' },
          { title: 'Analysis', text: 'Code review, measurements and tests, with read-only access.' },
          {
            title: 'Report',
            text: 'Findings ranked by severity, recommendations with an estimate.',
          },
          { title: 'Debrief', text: 'Presentation of the results, answers to questions and possible next steps.' },
        ],
      },
      showcase: {
        eyebrow: 'Deliverables',
        title: 'What you receive',
        kind: 'cards',
        numbered: true,
        items: [
          {
            title: 'The audit report',
            text: 'Each finding is explained, illustrated and ranked by severity, in language a decision-maker can read.',
          },
          {
            title: 'The action plan',
            text: 'The fixes in the order to carry them out, with an effort estimate for each.',
          },
          {
            title: 'The debrief',
            text: 'A presentation by video call or on site, for decision-makers and technical teams alike.',
          },
        ],
      },
      faq: [
        { question: 'How long does an audit take?', answer: '[INDICATIVE DURATION, depending on the scope]' },
        {
          question: 'Is access to the code required?',
          answer: 'Yes, read-only, for a technical audit. A non-disclosure agreement can be signed beforehand.',
        },
        {
          question: 'Does the audit commit you to continuing with Acolad Développement?',
          answer: 'No. The report is written so that any supplier or your in-house team can act on it.',
        },
        { question: 'How much does an audit cost?', answer: '[YOUR RATE OR RANGE, depending on the scope]' },
      ],
    },
    ai: {
      number: '03',
      name: 'AI integration',
      navLabel: 'AI',
      navText: 'Language models, where they are genuinely useful.',
      card: {
        title: 'AI integration',
        text: 'Language models built into your applications, where they are genuinely useful.',
        points: ['Content generation and translation', 'Conversational assistants', 'Agentic workflows and MCP'],
        link: 'Explore AI integration',
      },
      contactOption: 'Integrate AI into an application',
      meta: {
        title: 'AI integration in web applications: LLMs, assistants, MCP',
        description:
          'Integration of language models into web applications and CMSs: content generation and translation, conversational assistants, agentic workflows, MCP.',
      },
      eyebrow: 'AI integration',
      h1: 'AI in your applications, where it is useful.',
      lead: 'Content generation and translation, conversational assistants, authoring support: Acolad Développement integrates language models into your web applications and business tools, with safeguards and controlled costs.',
      cta: 'Explore a use case',
      coverTitle: 'What the service covers',
      cover: [
        {
          title: 'Content generation and translation',
          text: 'Assisted writing, summaries and translations, directly in your CMS or back office.',
        },
        {
          title: 'Conversational assistants',
          text: 'An assistant that answers from your content and data, and cites its sources.',
        },
        {
          title: 'Authoring support',
          text: 'Suggestions, rewording and quality checks for editorial teams.',
        },
        {
          title: 'LLM and AI API integration',
          text: 'Model selection, API calls, error handling and cost tracking.',
        },
        {
          title: 'Agentic workflows and MCP',
          text: 'Connecting AI to your tools through the MCP protocol, to automate multi-step tasks.',
        },
        {
          title: 'Safeguards',
          text: 'Human validation, logging, personal data protection, evaluation of answers.',
        },
      ],
      process: {
        title: 'A prototype on your data before any commitment.',
        steps: [
          { title: 'Use case', text: 'Finding where AI brings a measurable gain, and setting the rest aside.' },
          {
            title: 'Prototype',
            text: 'A trial on your real data, to judge the quality and estimate the running cost.',
          },
          {
            title: 'Integration',
            text: 'Built into the application, with tests, cost tracking and a fallback when errors occur.',
          },
          { title: 'Follow-up', text: 'Regular evaluation of answers, adjustment of prompts and models.' },
        ],
      },
      showcase: {
        eyebrow: 'Example uses',
        title: 'Three places where AI fits in',
        kind: 'cards',
        numbered: false,
        items: [
          {
            title: 'In a CMS',
            text: 'In Drupal or Payload: summarise an article, translate a page, suggest keywords, without leaving the editing screen.',
          },
          {
            title: 'In a business application',
            text: 'Query data in natural language, pre-fill a form, sort incoming requests.',
          },
          {
            title: 'In development',
            text: 'Claude Code to analyse existing code, refactor and write tests: faster deliveries, always reviewed by a human.',
          },
        ],
      },
      faq: [
        {
          question: 'Is the data used to train the models?',
          answer:
            'That depends on the provider and the contract. The model and its hosting are chosen with this constraint in mind, and personal data is excluded or anonymised where necessary.',
        },
        {
          question: 'Which model is used?',
          answer:
            'The one that suits the use case, the budget and your confidentiality constraints. The code is written so that the model can be changed.',
        },
        {
          question: 'How much does AI cost to run?',
          answer:
            'The cost depends on the volume of requests and the model. It is estimated during the prototype, then tracked and capped in production.',
        },
        {
          question: 'Can AI be added to an existing application?',
          answer:
            'Yes, that is the most common case: a targeted feature, added to a [business application](page:apps) or a [Drupal site](page:drupal) already in production.',
        },
      ],
    },
  },
  work: {
    meta: {
      title: 'Work: business applications and Drupal sites',
      description:
        'Projects delivered by Acolad Développement since 2014: CNRS Images, OVHcloud, City of Issy-les-Moulineaux, Obépine network, Docteur Conso, Syndex.',
    },
    eyebrow: 'Work',
    h1: 'Platforms in production, for public and private organisations.',
    lead: 'Business applications, institutional Drupal sites, data platforms: a selection of projects delivered since 2014, directly or on behalf of partner agencies.',
    caseStudyLink: 'Read the case study',
    items: [
      {
        project: 'cnrs',
        meta: '2020 – 2021 · via OWS · Drupal',
        text: "Technical lead and development of CNRS's photo and video platform.",
        points: [
          'Migration of the existing media catalogue to the new platform',
          'Custom roles and permissions for the editorial teams',
          'Twig / SCSS theme built to RGAA criteria',
        ],
        tags: ['Drupal', 'PHP', 'MySQL', 'Twig', 'SCSS'],
      },
      {
        project: 'ovhcloud',
        meta: '2023 – 2026 · Business applications',
        text: "Business features on OVHcloud's web platforms, from requirements to production.",
        points: [
          'React and Next.js applications, embedded in Drupal 10 and 11 or deployed separately',
          'End-to-end and integration tests with Playwright',
          'Optimisation of performance and response times',
        ],
        tags: ['TypeScript', 'React', 'Next.js', 'Drupal 10 / 11', 'Playwright'],
        caseStudy: true,
      },
      {
        project: 'issy',
        meta: 'via OWS · Drupal',
        text: "Technical lead and development of the city's website. Front-end integration in Twig, SCSS and TypeScript to RGAA accessibility criteria.",
        tags: ['Drupal', 'Twig', 'SCSS', 'TypeScript', 'RGAA'],
      },
      {
        project: 'obepine',
        meta: '2020 – 2021 · Université Paris 1 Panthéon-Sorbonne · Business applications',
        text: 'Reporting platform for the national wastewater monitoring network.',
        points: [
          'Automated data processing and recurring reports',
          'Advanced permission management for partner laboratories',
        ],
        tags: ['Drupal', 'PHP', 'Twig', 'TypeScript'],
      },
      {
        project: 'hospital',
        meta: 'via OWS · Drupal',
        text: "Technical lead and development of the hospital's public website.",
        tags: ['Drupal'],
      },
      {
        project: 'docteurConso',
        meta: '2026 · Toulouse · Business applications',
        text: 'Rebuild of the sustainability indicators platform with Next.js and PostgreSQL.',
        tags: ['Next.js', 'React', 'PostgreSQL', 'shadcn', 'Tailwind CSS'],
      },
    ],
    othersTitle: 'Other projects',
    others: [
      {
        project: 'syndex',
        meta: 'via Fabernovel · Drupal 8',
        text: 'Six-language Drupal 8 website for a consultancy serving employee representatives.',
      },
      {
        project: 'meetToTravel',
        meta: 'Drupal',
        text: 'Social network for meeting other travellers and finding travel companions.',
      },
      {
        project: 'parisSaclay',
        meta: 'Drupal',
        text: 'Bilingual institutional website of the university: news, courses, research and campus life.',
      },
    ],
  },
  caseStudy: {
    meta: {
      title: 'OVHcloud: React applications on Drupal data',
      description:
        'OVHcloud case study (2023-2026): React and TypeScript applications with Zustand, fed by Drupal 10/11, live content editing, Playwright tests.',
    },
    back: 'All the work',
    eyebrow: 'Case study · Business applications',
    h1: 'OVHcloud: React applications on Drupal data, with live content editing.',
    facts: [
      { label: 'Client', lines: ['OVHcloud'] },
      { label: 'Period', lines: ['2023 – 2026'] },
      { label: 'Role', lines: ['TypeScript / React development'] },
    ],
    stackTitle: 'Tech stack',
    stack: ['TypeScript', 'React', 'Next.js', 'Zustand', 'Drupal 10 / 11', 'PHP', 'Twig', 'SCSS', 'Playwright'],
    achievementsTitle: 'Achievements',
    achievements: [
      'React and Next.js applications deployed outside Drupal',
      'React applications embedded in Drupal 10 and 11',
      'End-to-end and integration tests with Playwright',
      'Optimisation of performance and response times',
    ],
    intro:
      "From 2023 to 2026, Acolad Développement worked with OVHcloud's web teams to design and deliver business features, from requirements to production.",
    sections: [
      {
        title: 'The context',
        paragraphs: [
          "OVHcloud's web platforms run on Drupal 10 and 11. Some of the business features take the form of React applications: some are embedded in Drupal, others are deployed separately and fed by a variety of data sources.",
        ],
      },
      {
        title: 'A React application fed by Drupal',
        paragraphs: [
          'The application is written in TypeScript with React, and its state is managed with Zustand. Its data comes from Drupal, which remains the working tool of the editorial teams.',
          'It brings live content editing to that Drupal data: contributors edit the content right where it is displayed.',
        ],
      },
      {
        title: 'Quality and ways of working',
        paragraphs: [
          'End-to-end and integration tests were set up and maintained with Playwright, alongside continuous work on performance: Core Web Vitals and response times.',
          'Code quality relied on reviews, refactoring and sharing good practices with the developers. The work was done in Scrum and Kanban, with the product, UX and business teams.',
        ],
      },
    ],
    next: { label: 'Next project', project: 'issy', link: 'View the project' },
  },
  about: {
    meta: {
      title: 'About Acolad Développement, a company founded in 2014',
      description:
        'Acolad Développement, a web development company founded in 2014 in Haute-Garonne by Raphaël Apard, an Acquia- and Opquast-certified full-stack developer.',
    },
    eyebrow: 'The company',
    h1: 'A web development company, since 2014.',
    lead: 'Acolad Développement designs, maintains and hosts web applications and Drupal sites for businesses and institutions. The company is based in Haute-Garonne and works with clients all over France.',
    timeline: {
      eyebrow: 'Milestones',
      title: 'Twenty years of web development, more than ten of them self-employed.',
      items: [
        { year: '2006', text: 'First web development work in PHP, at Université Toulouse 1 Capitole.' },
        {
          year: '2011',
          text: 'Drupal development at an agency in Toulouse: Laboratoires Pierre Fabre, Aerospace Valley, labOrange.',
        },
        { year: '2014', text: 'Acolad Développement is founded.', highlight: true },
        {
          year: '2017',
          text: 'Start of five years training web developers at Simplon, alongside client projects.',
        },
        { year: '2023', text: "Three years with OVHcloud's web teams on React and Drupal applications." },
      ],
    },
    founder: {
      eyebrow: 'The founder',
      name: 'Raphaël Apard',
      text: 'A full-stack developer, Raphaël works across the whole life cycle of web applications: architecture, development, continuous integration, go-live and maintenance. He is the one who answers your messages, writes the code and follows your project over time.',
      portraitAlt: 'Portrait of Raphaël Apard',
    },
    commitments: {
      title: 'Four commitments',
      items: [
        { title: 'A single point of contact', text: 'No intermediary between you and the person who writes the code.' },
        {
          title: 'Code that stays yours',
          text: 'The repository, documentation and access rights belong to you. Nothing is locked in.',
        },
        {
          title: 'Quality you can verify',
          text: 'Automated tests, accessibility and Opquast good practices, measured rather than promised.',
        },
        {
          title: 'Clear estimates',
          text: 'Every enhancement is estimated before work starts, and the time spent is made visible.',
        },
      ],
    },
    technologies: {
      title: 'Technologies',
      groups: [
        {
          label: 'Front-end',
          items: ['TypeScript', 'React', 'Next.js', 'Angular', 'Zustand', 'Tailwind CSS', 'Sass/SCSS'],
        },
        {
          label: 'Back-end',
          items: ['Node.js', 'NestJS', 'Fastify', 'PHP', 'Symfony', 'Laravel', 'REST', 'GraphQL', 'OAuth/JWT'],
        },
        { label: 'CMS', items: ['Drupal', 'Drupal headless / JSON:API', 'Payload CMS', 'Strapi'] },
        { label: 'Data', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Apache Solr'] },
        {
          label: 'Quality and delivery',
          items: ['CI/CD', 'Docker', 'Playwright', 'Vitest', 'Jest', 'Cypress', 'BackstopJS', 'Apache', 'Nginx'],
        },
      ],
    },
  },
  contact: {
    meta: {
      title: 'Contact: talk about your web project',
      description:
        'Contact Acolad Développement in Toulouse about a business application, an AI integration, an audit, application maintenance, a Drupal site or hosting.',
    },
    eyebrow: 'Contact',
    h1: "Let's talk about your project.",
    lead: 'A development to launch, an application to take over, a Drupal site to maintain or host, an audit, an AI feature: a few lines are enough to get started.',
    details: {
      email: 'Email',
      phone: 'Phone',
      address: 'Locations',
      addressLines: ['Toulouse, Revel, and remotely anywhere in France'],
    },
    next: {
      title: 'To save time',
      steps: [
        'The context: who you are and what already exists.',
        'The goal: what the project should make possible.',
        'Known constraints: deadline, budget, required technologies.',
      ],
    },
    form: {
      name: 'Name',
      company: 'Company or organisation',
      email: 'Email',
      need: 'Your need',
      otherNeed: 'Other request',
      message: 'Your message',
      messageHint: 'Context, technologies in place, deadline: anything that helps give you a useful answer.',
      privacy: 'The information you enter is used only to answer your request. See the [legal notice](page:legal).',
      submit: 'Send the request',
      sent: 'Thank you, your message has been sent. You will get an answer at the address you gave.',
      failed: `Your message could not be sent. Try again in a moment, or write directly to [${email}](mailto:${email}).`,
    },
  },
  legal: {
    meta: {
      title: 'Legal notice',
      description: "Legal notice, personal data and cookies for Acolad Développement's website.",
    },
    h1: 'Legal notice',
    updated: 'Last updated: 17 November 2026',
    updatedAt: '2026-11-17',
    tocLabel: 'Contents',
    sections: [
      {
        id: 'publisher',
        title: 'Publisher',
        paragraphs: [
          '**Acolad Développement**, single-shareholder simplified joint-stock company (SASU) with a share capital of €1,000',
          'Registered office: 27 avenue de Sorèze, 31250 Revel, France',
          'Toulouse Trade and Companies Register (RCS) 807 777 917 · SIRET 807 777 917 00038',
          'EU VAT number: FR29807777917',
          `Phone: +33 6 13 78 91 34 · Email: [${email}](mailto:${email})`,
        ],
      },
      {
        id: 'publication-director',
        title: 'Publication director',
        paragraphs: ['Raphaël Apard, president of Acolad Développement.'],
      },
      {
        id: 'hosting',
        title: 'Hosting',
        paragraphs: [
          '**o2switch**, SAS with a share capital of €100,000, RCS Clermont-Ferrand 510 909 807',
          'Chemin des Pardiaux, 63000 Clermont-Ferrand, France',
          'Phone: +33 4 44 44 60 40 · [o2switch.fr](https://www.o2switch.fr)',
        ],
      },
      {
        id: 'intellectual-property',
        title: 'Intellectual property',
        paragraphs: [
          'The text, layout and photographs on this site belong to Acolad Développement unless stated otherwise. They may not be reproduced or reused without prior written permission.',
          'Client logos and screenshots remain the property of their respective owners. They are shown only to illustrate the work carried out.',
        ],
      },
      {
        id: 'personal-data',
        title: 'Personal data',
        paragraphs: [
          `This site has no user account. The contact form sends your message by email to Acolad Développement: it is not stored on the site. To limit abuse, a fingerprint of your IP address (not the address itself) is kept for one hour at most. The only other personal data processed is what you send by writing to [${email}](mailto:${email}), and the audience measurement data described below.`,
          'Data controller: Acolad Développement, represented by Raphaël Apard. Your emails are used only to answer your request and follow up the business relationship. They are kept for at most 3 years after the last exchange and are never passed on to third parties.',
          `Under the GDPR and the French Data Protection Act, you have the right to access, rectify, erase, restrict and port your data, and to object to its processing, as well as to set instructions for what happens to your data after your death. To exercise these rights, write to [${email}](mailto:${email}); you will get an answer within one month. You may also lodge a complaint with the [CNIL](https://www.cnil.fr/en/home), the French data protection authority.`,
        ],
      },
      {
        id: 'cookies',
        title: 'Cookies and audience measurement',
        paragraphs: [
          'Visits are measured with Matomo, installed on a server run by Acolad Développement (stats.acolad.net, hosted in France by o2switch). The statistics are used only to understand how the site is used: they are not shared with third parties or combined with other data, IP addresses are anonymised and data is kept for at most 25 months.',
          "Matomo sets two cookies: `_pk_id` (visitor ID, 13 months) and `_pk_ses` (session, 30 minutes). Configured this way, this audience measurement is exempt from consent under the CNIL's guidelines. You can still opt out below: a `mtm_consent_removed` cookie (13 months) then remembers your choice.",
          'The language switch sets a `lang` cookie (12 months) that remembers your choice. No advertising or social media cookies are used.',
        ],
      },
    ],
    optOut: {
      label: 'Measure my visits with Matomo',
      on: 'Your visits are measured anonymously.',
      off: 'Your visits are no longer measured in this browser.',
      unavailable:
        'Audience measurement is not running in this browser (JavaScript turned off or a content blocker): your visits are not measured.',
    },
  },
  notFound: {
    meta: { title: 'Page not found', description: 'This page does not exist, or no longer exists.' },
    eyebrow: 'Error 404',
    h1: 'This page does not exist, or no longer does.',
    text: 'The address may have changed with the new version of the site. The pages listed alongside are a good place to start.',
    cta: 'Back to home',
    navLabel: 'Main pages',
  },
};
