import type { SiteContent } from './types';

const email = 'raphael.apard@acolad.fr';

export const fr: SiteContent = {
  lang: 'fr',
  languageName: 'Français',
  siteName: 'Acolad Développement',
  ui: {
    skipLink: 'Aller au contenu',
    mainNav: 'Navigation principale',
    languageSwitch: 'Langue du site',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    homeLink: 'Acolad Développement, accueil',
    technologies: 'Technologies',
    faqTitle: 'Questions fréquentes',
    processEyebrow: 'Déroulé',
    servicePrefix: 'Service',
  },
  nav: { services: 'Services', work: 'Réalisations', about: 'À propos', contact: 'Contact' },
  projects: {
    ovhcloud: { name: 'Mission OVHcloud', alt: "Capture d'écran du site OVHcloud" },
    docteurConso: { name: 'Docteur Conso', alt: "Capture d'écran de la nouvelle plateforme Docteur Conso" },
    cnrs: { name: 'CNRS Images', alt: "Capture d'écran de la plateforme CNRS Images" },
    obepine: { name: 'Réseau Obépine', alt: "Capture d'écran de la plateforme du réseau Obépine" },
    issy: { name: "Ville d'Issy-les-Moulineaux", alt: "Capture d'écran du site de la ville d'Issy-les-Moulineaux" },
    syndex: { name: 'Syndex', alt: "Capture d'écran du site Syndex" },
    hospital: { name: 'Hôpital Américain de Paris', alt: "Capture d'écran du site de l'Hôpital Américain de Paris" },
    meetToTravel: { name: 'Meet to Travel', alt: "Capture d'écran du réseau social Meet to Travel" },
    parisSaclay: { name: 'Université Paris-Saclay', alt: "Capture d'écran du site de l'Université Paris-Saclay" },
  },
  cta: {
    title: 'Un projet à lancer, une application à reprendre, un site à héberger ?',
    text: 'Décrivez votre besoin en quelques lignes. Vous recevez une première réponse avec les questions utiles pour cadrer la suite.',
    button: 'Parler de votre projet',
  },
  footer: {
    tagline:
      "Société de développement web. Applications métier, intégration d'IA, audit, TMA, maintenance Drupal et hébergement depuis 2014.",
    servicesTitle: 'Services',
    companyTitle: 'Société',
    contactTitle: 'Contact',
    location: 'Toulouse et Revel (Haute-Garonne)',
    copyright: 'Acolad Développement SASU',
    note: 'Site statique, sans cookie publicitaire',
  },
  home: {
    meta: {
      title: 'Société de développement web à Toulouse',
      description:
        "Acolad Développement, société de développement web à Toulouse depuis 2014 : applications métier, intégration d'IA, audit, TMA, maintenance Drupal, hébergement.",
    },
    eyebrow: 'Société de développement web · Toulouse · depuis 2014',
    h1: 'Vos applications web, développées, maintenues et hébergées.',
    h1Muted: 'Vos applications web,',
    lead: "Acolad Développement conçoit des applications métier, reprend la maintenance de l'existant, fait vivre vos sites Drupal et les héberge. Un seul interlocuteur, du cadrage à l'exploitation.",
    primaryCta: 'Parler de votre projet',
    secondaryCta: 'Voir les réalisations',
    clientsLabel: 'Ils ont fait confiance à Acolad',
    clientsPrevious: 'Logos précédents',
    clientsNext: 'Logos suivants',
    clients: [
      { id: 'ovhcloud', name: 'OVHcloud' },
      { id: 'cnrs', name: 'CNRS Images' },
      { id: 'hospital', name: 'Hôpital Américain de Paris' },
      { id: 'pantheonSorbonne', name: 'Université Paris 1 Panthéon-Sorbonne' },
      { id: 'eyFabernovel', name: 'EY Fabernovel' },
      { id: 'parisSaclay', name: 'Université Paris-Saclay' },
      { id: 'syndex', name: 'Syndex' },
      { id: 'muzeo', name: 'Muzéo' },
      { id: 'docteurConso', name: 'Docteur Conso' },
      { id: 'axess', name: 'Axess Open Web Services' },
      { id: 'issy', name: "Ville d'Issy-les-Moulineaux" },
      { id: 'humansConnexion', name: "Human's Connexion" },
      { id: 'makinaCorpus', name: 'Makina Corpus' },
    ],
    services: {
      eyebrow: 'Services',
      title: "Tout le cycle de vie d'une application web, au même endroit.",
      text: 'Chaque service peut être pris seul. Ensemble, ils évitent les passages de relais entre le prestataire qui développe, celui qui maintient et celui qui héberge.',
    },
    method: {
      eyebrow: 'Méthode',
      title: "Du besoin à l'exploitation, sans changer d'interlocuteur.",
      steps: [
        {
          title: 'Cadrage',
          text: "Comprendre le besoin, les utilisateurs et l'existant. Un périmètre et un chiffrage clairs avant de commencer.",
        },
        {
          title: 'Développement',
          text: 'Des livraisons courtes et régulières, testées, visibles sur un environnement de recette.',
        },
        {
          title: 'Mise en production',
          text: "Déploiement automatisé, contrôles de performance, de sécurité et d'accessibilité.",
        },
        { title: 'Suivi', text: 'Maintenance, évolutions et hébergement : la même personne après la mise en ligne.' },
      ],
    },
    work: {
      eyebrow: 'Réalisations',
      title: 'Des plateformes en production, pour des acteurs publics et privés.',
      link: 'Toutes les réalisations',
      items: [
        {
          project: 'cnrs',
          meta: '2020 – 2021 · Drupal, PHP, RGAA',
          text: 'Pilotage technique et développement de la plateforme photo et vidéo du CNRS.',
        },
        {
          project: 'issy',
          meta: 'Drupal, TypeScript, RGAA',
          text: "Pilotage technique et développement du site de la ville, selon les critères d'accessibilité RGAA.",
        },
        {
          project: 'hospital',
          meta: 'Drupal',
          text: "Pilotage technique et développement du site public de l'hôpital.",
        },
      ],
    },
    company: {
      eyebrow: 'La société',
      title: 'Une société de développement web, depuis 2014.',
      text: 'Acolad Développement a été créée en 2014 par Raphaël Apard, développeur web depuis vingt ans. Vous échangez directement avec la personne qui conçoit, développe et maintient votre projet.',
      link: 'En savoir plus sur la société',
      facts: [
        { label: 'Depuis', lines: ['2014'] },
        { label: 'Expérience', lines: ["20 ans de développement d'applications web"] },
        { label: 'Certifications', lines: ['Acquia Certified Developer, Opquast'] },
        { label: 'Implantation', lines: ['Toulouse, et à distance partout en France'] },
      ],
    },
  },
  services: {
    apps: {
      number: '02',
      name: 'Applications métier',
      navLabel: 'Applications métier',
      navText: 'Extranets, plateformes de données, back-offices, portails.',
      card: {
        title: 'Applications métier',
        text: 'Des outils web construits autour de vos processus : extranets, plateformes de données, back-offices, portails.',
        points: [
          'Cadrage, architecture et choix techniques',
          'TypeScript, React, Next.js, Node.js, PHP',
          'Tests automatisés et intégration continue',
        ],
        link: 'Découvrir le développement sur mesure',
      },
      contactOption: 'Développer une application métier',
      meta: {
        title: "Développement d'applications métier sur mesure à Toulouse",
        description:
          "Conception et développement d'applications web métier sur mesure : extranets, back-offices, plateformes de données. TypeScript, React, Next.js, Node.js, PHP.",
      },
      eyebrow: 'Développement sur mesure',
      h1: 'Des applications métier pensées pour ceux qui les utilisent.',
      lead: "Quand un tableur ou un logiciel standard ne suffit plus, Acolad Développement conçoit l'outil web adapté à votre activité : il reprend vos règles de gestion, se connecte à votre système d'information et évolue avec vous.",
      cta: 'Décrire votre projet',
      coverTitle: 'Ce que couvre la prestation',
      cover: [
        {
          title: 'Cadrage et spécifications',
          text: 'Ateliers avec les utilisateurs, parcours, règles de gestion et périmètre priorisé.',
        },
        { title: 'Architecture', text: "Des choix techniques argumentés, pensés pour la durée de vie de l'application." },
        {
          title: 'Développement front et back',
          text: 'Interfaces React et Next.js, APIs REST ou GraphQL, bases PostgreSQL ou MySQL.',
        },
        {
          title: 'Intégrations et IA',
          text: "Authentification OAuth, APIs tierces, CMS, flux de données, fonctions d'IA (génération, traduction, assistants).",
        },
        {
          title: 'Qualité et livraison',
          text: "Tests unitaires, d'intégration et end-to-end avec Playwright, revue de code, CI/CD.",
        },
        {
          title: 'Accessibilité et performance',
          text: 'Interfaces développées selon les critères RGAA et suivies sur les Core Web Vitals.',
        },
      ],
      process: {
        title: 'Un projet découpé en lots que vous pouvez voir et tester.',
        steps: [
          {
            title: 'Atelier de cadrage',
            text: 'Besoin, utilisateurs, contraintes. À la sortie : un périmètre, des priorités et un chiffrage.',
          },
          {
            title: 'Maquettes et prototype',
            text: "Les écrans clés validés avec les utilisateurs avant d'écrire le code qui restera.",
          },
          {
            title: 'Développement itératif',
            text: 'Une livraison régulière sur un environnement de recette, testée automatiquement.',
          },
          {
            title: 'Mise en production et suivi',
            text: 'Déploiement, documentation, puis maintenance et hébergement si vous le souhaitez.',
          },
        ],
      },
      showcase: {
        eyebrow: 'Références',
        title: 'Des applications métier en production',
        kind: 'projects',
        items: [
          {
            project: 'docteurConso',
            meta: '2026 · Next.js, React, PostgreSQL',
            text: "Refonte de la plateforme d'indicateurs de durabilité en Next.js et PostgreSQL.",
          },
          {
            project: 'obepine',
            meta: '2020 – 2021 · Drupal, PHP, TypeScript',
            text: 'Plateforme de rapports du réseau national de surveillance des eaux usées : traitements de données automatisés, droits avancés pour les laboratoires partenaires.',
          },
        ],
      },
      faq: [
        {
          question: 'À qui appartient le code ?',
          answer: 'À vous. Le code source est livré dans votre dépôt, avec sa documentation et ses tests.',
        },
        {
          question: 'Pouvez-vous reprendre une application existante ?',
          answer:
            "Oui, c'est l'objet de la [tierce maintenance applicative](page:tma) : audit de reprise, puis correctifs et évolutions.",
        },
        {
          question: "Où l'application est-elle hébergée ?",
          answer:
            "Chez vous, chez votre hébergeur, ou dans le cadre de l'[offre d'hébergement](page:hosting) d'Acolad Développement.",
        },
      ],
    },
    tma: {
      number: '04',
      name: 'Tierce maintenance applicative',
      navLabel: 'TMA',
      navText: "Reprise et maintenance d'applications existantes.",
      card: {
        title: 'Tierce maintenance applicative',
        text: "Reprise et maintenance d'applications existantes, y compris celles développées par un autre prestataire.",
        points: [
          'Audit de reprise et documentation',
          'Correctifs et évolutions fonctionnelles',
          'Mises à jour de sécurité et montées de version',
        ],
        link: 'Découvrir la TMA',
      },
      contactOption: "Reprendre la maintenance d'une application (TMA)",
      meta: {
        title: 'TMA : tierce maintenance applicative web à Toulouse',
        description:
          "Reprise et maintenance d'applications web : audit de reprise, correctifs, évolutions, mises à jour de sécurité. PHP, Node.js, React, Next.js, Angular.",
      },
      eyebrow: 'Tierce maintenance applicative',
      h1: 'Votre application reprise, maintenue et remise sur de bons rails.',
      lead: "Votre prestataire a arrêté, votre développeur est parti ou l'équipe interne n'a plus le temps ? Acolad Développement reprend la maintenance de votre application web : corriger, sécuriser, faire évoluer, sans tout réécrire.",
      cta: 'Demander un audit de reprise',
      coverTitle: 'Ce que couvre la prestation',
      cover: [
        {
          title: 'Audit de reprise',
          text: "État du code, des dépendances, de la sécurité et de l'hébergement. Un rapport et un plan d'action priorisé.",
        },
        {
          title: 'Maintenance corrective',
          text: 'Diagnostic et correction des anomalies, avec un test automatisé qui empêche leur retour.',
        },
        { title: 'Maintenance évolutive', text: "Nouvelles fonctionnalités et adaptations, chiffrées avant d'être lancées." },
        {
          title: 'Maintenance préventive',
          text: 'Mises à jour de sécurité, montées de version des frameworks et des dépendances.',
        },
        {
          title: 'Refactoring et tests',
          text: "Remise à niveau progressive du code, tests ajoutés d'abord sur les parties critiques.",
        },
        {
          title: 'Suivi transparent',
          text: 'Des tickets suivis, un point régulier et un compte rendu de ce qui a été fait.',
        },
      ],
      process: {
        title: 'Une reprise en quatre temps, sans interruption de service.',
        steps: [
          { title: 'Audit', text: "Lecture du code et de l'infrastructure, identification des risques, plan d'action." },
          {
            title: 'Transfert',
            text: "Récupération du code, des accès et des environnements. Mise en place d'une recette.",
          },
          { title: 'Stabilisation', text: 'Correctifs urgents, mises à jour de sécurité, premiers tests automatisés.' },
          {
            title: 'Rythme de croisière',
            text: 'Maintenance continue et évolutions planifiées, au rythme de votre activité.',
          },
        ],
      },
      showcase: {
        eyebrow: 'Référence',
        title: 'Une application suivie dans la durée',
        kind: 'projects',
        items: [
          {
            project: 'ovhcloud',
            meta: '2023 – 2026 · React, Drupal 10/11, Playwright',
            text: 'Trois ans sur les plateformes web : évolutions, tests end-to-end mis en place et maintenus, optimisation des performances.',
          },
        ],
      },
      faq: [
        {
          question: 'Reprenez-vous une application développée par un autre ?',
          answer:
            "Oui, c'est le principe de la TMA. L'audit de reprise sert à savoir précisément dans quoi on s'engage, des deux côtés.",
        },
        {
          question: 'Faut-il tout réécrire ?',
          answer:
            'Rarement. La remise à niveau se fait par étapes, en commençant par ce qui présente un risque : sécurité, versions obsolètes, parties sans tests.',
        },
        {
          question: 'Comment les interventions sont-elles facturées ?',
          answer: "[VOTRE FORMULE : forfait mensuel, carnet d'heures, devis par évolution]",
        },
        {
          question: 'Et en cas de changement de prestataire ?',
          answer: "Le code, la documentation et les accès restent les vôtres. Rien n'est verrouillé.",
        },
      ],
    },
    drupal: {
      number: '05',
      name: 'Maintenance Drupal',
      navLabel: 'Drupal',
      navText: 'À jour et sécurisé, de Drupal 7 à Drupal 11.',
      card: {
        title: 'Maintenance Drupal',
        text: 'Votre site Drupal tenu à jour, sécurisé et prêt pour la version suivante, de Drupal 7 à Drupal 11.',
        points: [
          'Mises à jour du cœur et des modules',
          'Migrations de version et de contenus',
          'Développeur certifié Acquia',
        ],
        link: 'Découvrir la maintenance Drupal',
      },
      contactOption: 'Maintenir ou migrer un site Drupal',
      meta: {
        title: 'Maintenance Drupal à Toulouse : mises à jour et migration',
        description:
          'Maintenance de sites Drupal 7 à 11 par un développeur certifié Acquia : mises à jour de sécurité, migration de version, modules sur mesure, Drupal headless.',
      },
      eyebrow: 'Maintenance Drupal',
      h1: 'Un site Drupal à jour, sécurisé et prêt pour la version suivante.',
      lead: 'Drupal accompagne Acolad Développement depuis sa création : sites institutionnels, plateformes multilingues, Drupal headless. La maintenance couvre les mises à jour, la sécurité, les migrations et les évolutions de votre site.',
      cta: 'Faire auditer votre site Drupal',
      coverTitle: 'Ce que couvre la prestation',
      cover: [
        {
          title: 'Mises à jour de sécurité',
          text: 'Suivi des annonces de sécurité Drupal, correctifs du cœur et des modules contribués.',
        },
        {
          title: 'Migration de version',
          text: 'De Drupal 7, 8 ou 9 vers Drupal 10 et 11 : contenus, modules spécifiques et thème.',
        },
        {
          title: 'Modules sur mesure',
          text: 'Fonctionnalités spécifiques, rôles et droits, workflows éditoriaux, connecteurs.',
        },
        { title: 'Thème et accessibilité', text: "Intégration Twig et SCSS selon les critères d'accessibilité RGAA." },
        { title: 'Drupal headless', text: 'JSON:API et applications React, Next.js ou Angular alimentées par Drupal.' },
        { title: 'Recherche et performance', text: 'Apache Solr, stratégie de cache et suivi des Core Web Vitals.' },
      ],
      process: {
        title: 'Chaque mise à jour passe par la recette avant la production.',
        steps: [
          {
            title: 'Audit du site',
            text: 'Versions, modules, code spécifique, sécurité. Un état des lieux et des priorités.',
          },
          { title: 'Mise à niveau', text: 'Rattrapage des mises à jour en retard et correction des points bloquants.' },
          {
            title: 'Maintenance régulière',
            text: 'Mises à jour appliquées en recette, contrôlées par des tests de non-régression, puis déployées.',
          },
          { title: 'Évolutions', text: 'Nouvelles fonctionnalités et préparation de la prochaine version majeure.' },
        ],
      },
      showcase: {
        eyebrow: 'Références',
        title: 'Des sites Drupal pour des institutions exigeantes',
        kind: 'projects',
        items: [
          {
            project: 'cnrs',
            text: 'Migration du catalogue de médias, rôles et droits sur mesure, thème conforme RGAA.',
          },
          {
            project: 'issy',
            text: 'Pilotage technique et développement du site de la ville, intégration selon les critères RGAA.',
          },
          {
            project: 'syndex',
            text: "Site Drupal 8 en six langues d'un cabinet au service des représentants des salariés.",
          },
        ],
      },
      faq: [
        {
          question: 'Votre site est encore en Drupal 7 : que faire ?',
          answer:
            "Drupal 7 n'est plus maintenu par la communauté depuis janvier 2025. L'audit permet de choisir entre une migration vers Drupal 11 et une refonte, avec un budget pour chaque option.",
        },
        {
          question: 'Un site développé par un autre prestataire peut-il être repris ?',
          answer:
            "Oui. La plupart des sites maintenus ont été créés par une agence ou une équipe interne. L'audit initial sert à en prendre connaissance.",
        },
        {
          question: 'À quel rythme les mises à jour sont-elles appliquées ?',
          answer: '[VOTRE RYTHME : par exemple correctifs de sécurité en priorité, autres mises à jour chaque mois]',
        },
        {
          question: 'Hébergez-vous aussi le site ?',
          answer:
            "C'est possible avec l'[offre d'hébergement](page:hosting). La maintenance fonctionne aussi chez votre hébergeur actuel.",
        },
      ],
    },
    hosting: {
      number: '06',
      name: 'Hébergement de sites web',
      navLabel: 'Hébergement',
      navText: 'Exploité par celui qui connaît le code, sans renvoi de balle.',
      card: {
        title: 'Hébergement',
        text: "Vos sites et applications hébergés et exploités par celui qui les connaît : pas de renvoi de balle en cas d'incident.",
        points: [
          'Mise en production et certificats HTTPS',
          'Sauvegardes et restauration',
          'Supervision et mises à jour serveur',
        ],
        link: "Découvrir l'hébergement",
      },
      contactOption: 'Héberger un site ou une application',
      meta: {
        title: "Hébergement et exploitation de sites et d'applications web",
        description:
          "Hébergement et exploitation de sites Drupal et d'applications web : mise en production, HTTPS, sauvegardes, supervision, mises à jour serveur.",
      },
      eyebrow: 'Hébergement de sites web',
      h1: 'Un hébergement exploité par celui qui connaît votre site.',
      lead: "Acolad Développement héberge et exploite les sites et applications qu'elle développe ou maintient. En cas d'incident, il n'y a pas à chercher si le problème vient du code ou du serveur : c'est le même interlocuteur.",
      cta: 'Demander une proposition',
      coverTitle: 'Ce que couvre la prestation',
      cover: [
        {
          title: 'Mise en production',
          text: 'Déploiement automatisé depuis votre dépôt, avec un environnement de recette et un de production.',
        },
        {
          title: 'HTTPS et nom de domaine',
          text: 'Certificats renouvelés automatiquement, configuration DNS et redirections.',
        },
        {
          title: 'Sauvegardes',
          text: 'Fichiers et bases de données sauvegardés, restauration testée.',
        },
        { title: 'Supervision', text: "Surveillance de la disponibilité et alertes en cas d'incident." },
        {
          title: 'Mises à jour serveur',
          text: 'Versions de PHP, de Node.js et de la base de données, correctifs de sécurité système.',
        },
        {
          title: 'Performance',
          text: 'Cache, compression et configuration Apache ou Nginx adaptées à votre application.',
        },
      ],
      process: {
        title: 'Une migration préparée, une bascule planifiée.',
        steps: [
          {
            title: "Analyse de l'existant",
            text: "Trafic, technologies, volumétrie, contraintes : de quoi dimensionner l'hébergement.",
          },
          {
            title: 'Préparation',
            text: 'Environnements, déploiement automatisé, sauvegardes et supervision en place avant la bascule.',
          },
          {
            title: 'Bascule',
            text: 'Migration à une date convenue, à un moment de faible trafic, avec retour arrière possible.',
          },
          { title: 'Exploitation', text: 'Surveillance, mises à jour et interventions, avec un compte rendu régulier.' },
        ],
      },
      showcase: {
        eyebrow: 'Formules',
        title: 'Trois niveaux, selon ce que vous hébergez',
        kind: 'plans',
        items: [
          {
            title: 'Site vitrine ou Drupal',
            text: 'Pour un site institutionnel ou éditorial, avec ses sauvegardes et son certificat.',
            price: '[PRIX]',
            unit: '€ HT / mois',
            points: ['[RESSOURCES INCLUSES]', '[SAUVEGARDES]', "[DÉLAI D'INTERVENTION]"],
          },
          {
            title: 'Application métier',
            text: 'Pour une application avec base de données, recette et déploiement automatisé.',
            price: '[PRIX]',
            unit: '€ HT / mois',
            points: ['[RESSOURCES INCLUSES]', '[SAUVEGARDES]', "[DÉLAI D'INTERVENTION]"],
            featured: true,
          },
          {
            title: 'Sur mesure',
            text: 'Pour un trafic élevé, plusieurs sites ou des contraintes particulières de sécurité.',
            price: 'Sur devis',
            points: ['Architecture dimensionnée après analyse', '[SAUVEGARDES]', "[DÉLAI D'INTERVENTION]"],
          },
        ],
      },
      faq: [
        {
          question: 'Où sont hébergées les données ?',
          answer: "Sur des serveurs situés en France, chez un hébergeur français. Aucune donnée ne quitte l'Union européenne.",
        },
        {
          question: 'Peut-on migrer un site déjà en ligne ?',
          answer: 'Oui. Le site est installé et vérifié sur le nouvel hébergement avant la bascule du nom de domaine.',
        },
        {
          question: 'Que se passe-t-il en cas de panne ?',
          answer: 'Une alerte est remontée automatiquement, pour une intervention rapide.',
        },
        {
          question: "L'hébergement impose-t-il la maintenance ?",
          answer:
            'Non, mais les deux se complètent : un site hébergé sans mises à jour applicatives finit par poser un problème de sécurité. Voir la [TMA](page:tma) et la [maintenance Drupal](page:drupal).',
        },
      ],
    },
    audit: {
      number: '01',
      name: 'Audit et conseil',
      navLabel: 'Audit',
      navText: 'Un état des lieux argumenté, avant une refonte ou une reprise.',
      card: {
        title: 'Audit et conseil',
        text: 'Un état des lieux argumenté de votre site ou de votre application, avant une refonte ou une reprise.',
        points: [
          'Code, sécurité et performance',
          'Accessibilité RGAA et qualité Opquast',
          "Rapport priorisé et plan d'action",
        ],
        link: "Découvrir l'audit",
      },
      contactOption: 'Faire auditer un site ou une application',
      meta: {
        title: "Audit de site web et d'application : code, sécurité, RGAA",
        description:
          "Audit technique de sites et d'applications web par un certifié Opquast : code, sécurité, performance, accessibilité RGAA. Rapport priorisé et plan d'action.",
      },
      eyebrow: 'Audit et conseil',
      h1: 'Un regard extérieur et argumenté sur votre site ou votre application.',
      lead: "Avant une refonte, une reprise de maintenance ou un changement de prestataire, Acolad Développement examine l'existant et remet un rapport clair : ce qui fonctionne, ce qui présente un risque et par quoi commencer.",
      cta: 'Demander un audit',
      coverTitle: "Ce que l'audit peut couvrir",
      cover: [
        {
          title: 'Qualité du code',
          text: 'Architecture, dette technique, dépendances obsolètes, couverture de tests.',
        },
        {
          title: 'Sécurité',
          text: 'Versions exposées, mises à jour en retard, configuration du serveur, gestion des accès.',
        },
        { title: 'Performance', text: 'Core Web Vitals, temps de réponse, stratégie de cache, poids des pages.' },
        { title: 'Accessibilité', text: 'Contrôle selon les critères RGAA et priorisation des corrections.' },
        {
          title: 'Qualité web',
          text: 'Bonnes pratiques Opquast : contenus, formulaires, référencement technique. Audit mené par un certifié Opquast.',
        },
        {
          title: 'Conseil technique',
          text: "Choix d'architecture, de CMS ou de framework, cadrage d'une refonte ou d'une migration.",
        },
      ],
      process: {
        title: 'Des constats mesurés, classés et chiffrés.',
        steps: [
          { title: 'Périmètre', text: "Ce qu'il faut examiner et la décision que l'audit doit éclairer." },
          { title: 'Analyse', text: 'Lecture du code, mesures et tests, avec des accès en lecture seule.' },
          {
            title: 'Rapport',
            text: "Constats classés par gravité, recommandations accompagnées d'une estimation.",
          },
          { title: 'Restitution', text: 'Présentation des résultats, réponses aux questions et suites possibles.' },
        ],
      },
      showcase: {
        eyebrow: 'Livrables',
        title: 'Ce que vous recevez',
        kind: 'cards',
        numbered: true,
        items: [
          {
            title: "Le rapport d'audit",
            text: 'Chaque constat est expliqué, illustré et classé par gravité, dans un langage lisible par un décideur.',
          },
          {
            title: "Le plan d'action",
            text: "Les corrections dans l'ordre où les mener, avec une estimation de l'effort pour chacune.",
          },
          {
            title: 'La restitution',
            text: 'Une présentation en visioconférence ou sur place, pour les décideurs comme pour les équipes techniques.',
          },
        ],
      },
      faq: [
        { question: 'Combien de temps dure un audit ?', answer: '[DURÉE INDICATIVE, selon le périmètre]' },
        {
          question: 'Faut-il donner accès au code ?',
          answer:
            'Oui, en lecture seule, pour un audit technique. Un accord de confidentialité peut être signé au préalable.',
        },
        {
          question: "L'audit engage-t-il à poursuivre avec Acolad Développement ?",
          answer:
            "Non. Le rapport est rédigé pour être exploitable par n'importe quel prestataire ou par votre équipe interne.",
        },
        { question: 'Combien coûte un audit ?', answer: '[VOTRE TARIF OU FOURCHETTE, selon le périmètre]' },
      ],
    },
    ai: {
      number: '03',
      name: "Intégration d'IA",
      navLabel: 'IA',
      navText: 'Des modèles de langage, là où ils rendent vraiment service.',
      card: {
        title: "Intégration d'IA",
        text: 'Des modèles de langage intégrés à vos applications, là où ils rendent vraiment service.',
        points: ['Génération et traduction de contenu', 'Assistants conversationnels', 'Workflows agentiques et MCP'],
        link: "Découvrir l'intégration d'IA",
      },
      contactOption: "Intégrer de l'IA dans une application",
      meta: {
        title: "Intégration d'IA aux applications web : LLM, assistants, MCP",
        description:
          "Modèles de langage intégrés aux applications web et aux CMS : génération et traduction de contenu, assistants conversationnels, workflows agentiques, MCP.",
      },
      eyebrow: "Intégration d'IA",
      h1: "De l'IA dans vos applications, là où elle rend service.",
      lead: 'Génération et traduction de contenu, assistants conversationnels, aide à la contribution : Acolad Développement intègre des modèles de langage dans vos applications web et vos outils métier, avec des garde-fous et un coût maîtrisé.',
      cta: "Étudier un cas d'usage",
      coverTitle: 'Ce que couvre la prestation',
      cover: [
        {
          title: 'Génération et traduction de contenu',
          text: 'Rédaction assistée, résumés et traductions, directement dans votre CMS ou votre back-office.',
        },
        {
          title: 'Assistants conversationnels',
          text: 'Un assistant qui répond à partir de vos contenus et de vos données, et qui cite ses sources.',
        },
        {
          title: 'Aide à la contribution',
          text: 'Suggestions, reformulation et contrôles de qualité pour les équipes éditoriales.',
        },
        {
          title: "Intégration de LLM et d'APIs d'IA",
          text: 'Choix du modèle, appels aux APIs, gestion des erreurs et suivi des coûts.',
        },
        {
          title: 'Workflows agentiques et MCP',
          text: "Connexion de l'IA à vos outils par le protocole MCP, pour automatiser des tâches en plusieurs étapes.",
        },
        {
          title: 'Garde-fous',
          text: 'Validation humaine, journalisation, protection des données personnelles, évaluation des réponses.',
        },
      ],
      process: {
        title: 'Un prototype sur vos données avant tout engagement.',
        steps: [
          { title: "Cas d'usage", text: "Repérer où l'IA apporte un gain mesurable, et écarter le reste." },
          {
            title: 'Prototype',
            text: "Un essai sur vos vraies données, pour juger la qualité et estimer le coût à l'usage.",
          },
          {
            title: 'Intégration',
            text: "Mise en place dans l'application, avec tests, suivi des coûts et solution de repli en cas d'erreur.",
          },
          { title: 'Suivi', text: 'Évaluation régulière des réponses, ajustement des consignes et des modèles.' },
        ],
      },
      showcase: {
        eyebrow: "Exemples d'usage",
        title: "Trois endroits où l'IA trouve sa place",
        kind: 'cards',
        numbered: false,
        items: [
          {
            title: 'Dans un CMS',
            text: "Sous Drupal ou Payload : résumer un article, traduire une page, proposer des mots-clés, sans quitter l'écran de contribution.",
          },
          {
            title: 'Dans une application métier',
            text: 'Interroger des données en langage naturel, préremplir un formulaire, classer des demandes entrantes.',
          },
          {
            title: 'Dans le développement',
            text: 'Claude Code pour analyser un code existant, refactoriser et écrire des tests : des livraisons plus rapides, toujours relues par un humain.',
          },
        ],
      },
      faq: [
        {
          question: 'Les données servent-elles à entraîner les modèles ?',
          answer:
            "Cela dépend du fournisseur et du contrat. Le modèle et son hébergement sont choisis avec cette contrainte, et les données personnelles sont écartées ou anonymisées quand c'est nécessaire.",
        },
        {
          question: 'Quel modèle est utilisé ?',
          answer:
            "Celui qui convient au cas d'usage, au budget et à vos contraintes de confidentialité. Le code est écrit pour pouvoir en changer.",
        },
        {
          question: "Combien coûte l'IA à l'usage ?",
          answer:
            'Le coût dépend du volume de requêtes et du modèle. Il est estimé pendant le prototype, puis suivi et plafonné en production.',
        },
        {
          question: "Peut-on ajouter de l'IA à une application existante ?",
          answer:
            "Oui, c'est le cas le plus courant : une fonction ciblée, ajoutée à une [application métier](page:apps) ou à un [site Drupal](page:drupal) déjà en production.",
        },
      ],
    },
  },
  work: {
    meta: {
      title: 'Réalisations : applications métier et sites Drupal',
      description:
        "Projets menés par Acolad Développement depuis 2014 : CNRS Images, OVHcloud, Ville d'Issy-les-Moulineaux, réseau Obépine, Docteur Conso, Syndex.",
    },
    eyebrow: 'Réalisations',
    h1: 'Des plateformes en production, pour des acteurs publics et privés.',
    lead: "Applications métier, sites Drupal institutionnels, plateformes de données : une sélection de projets menés depuis 2014, en direct ou pour le compte d'agences partenaires.",
    caseStudyLink: "Lire l'étude de cas",
    items: [
      {
        project: 'cnrs',
        meta: '2020 – 2021 · via OWS · Drupal',
        text: 'Pilotage technique et développement de la plateforme photo et vidéo du CNRS.',
        points: [
          'Migration du catalogue de médias existant vers la nouvelle plateforme',
          'Rôles et droits sur mesure pour les équipes éditoriales',
          'Thème Twig / SCSS développé selon les critères RGAA',
        ],
        tags: ['Drupal', 'PHP', 'MySQL', 'Twig', 'SCSS'],
      },
      {
        project: 'ovhcloud',
        meta: '2023 – 2026 · Applications métier',
        text: "Fonctionnalités métier sur les plateformes web d'OVHcloud, du besoin à la mise en production.",
        points: [
          'Applications React et Next.js, intégrées à Drupal 10 et 11 ou déployées à part',
          "Tests end-to-end et d'intégration avec Playwright",
          'Optimisation des performances et des temps de réponse',
        ],
        tags: ['TypeScript', 'React', 'Next.js', 'Drupal 10 / 11', 'Playwright'],
        caseStudy: true,
      },
      {
        project: 'issy',
        meta: 'via OWS · Drupal',
        text: "Pilotage technique et développement du site de la ville. Intégration Twig, SCSS et TypeScript selon les critères d'accessibilité RGAA.",
        tags: ['Drupal', 'Twig', 'SCSS', 'TypeScript', 'RGAA'],
      },
      {
        project: 'obepine',
        meta: '2020 – 2021 · Université Paris 1 Panthéon-Sorbonne · Applications métier',
        text: 'Plateforme de rapports du réseau national de surveillance des eaux usées.',
        points: [
          'Automatisation des traitements de données et des rapports récurrents',
          'Gestion avancée des droits pour les laboratoires partenaires',
        ],
        tags: ['Drupal', 'PHP', 'Twig', 'TypeScript'],
      },
      {
        project: 'hospital',
        meta: 'via OWS · Drupal',
        text: "Pilotage technique et développement du site public de l'hôpital.",
        tags: ['Drupal'],
      },
      {
        project: 'docteurConso',
        meta: '2026 · Toulouse · Applications métier',
        text: "Refonte de la plateforme d'indicateurs de durabilité en Next.js et PostgreSQL.",
        tags: ['Next.js', 'React', 'PostgreSQL', 'shadcn', 'Tailwind CSS'],
      },
    ],
    othersTitle: 'Autres projets',
    others: [
      {
        project: 'syndex',
        meta: 'via Fabernovel · Drupal 8',
        text: "Site Drupal 8 en six langues d'un cabinet au service des représentants des salariés.",
      },
      {
        project: 'meetToTravel',
        meta: 'Drupal',
        text: "Réseau social pour rencontrer d'autres voyageurs et trouver des compagnons de voyage.",
      },
      {
        project: 'parisSaclay',
        meta: 'Drupal',
        text: "Site institutionnel bilingue de l'université : actualités, formation, recherche et vie de campus.",
      },
    ],
  },
  caseStudy: {
    meta: {
      title: 'OVHcloud : applications React sur des données Drupal',
      description:
        "Étude de cas OVHcloud (2023-2026) : applications React et TypeScript avec Zustand, alimentées par Drupal 10/11, édition de contenu en direct, tests Playwright.",
    },
    back: 'Toutes les réalisations',
    eyebrow: 'Étude de cas · Applications métier',
    h1: 'OVHcloud : des applications React sur des données Drupal, avec édition de contenu en direct.',
    facts: [
      { label: 'Client', lines: ['OVHcloud'] },
      { label: 'Période', lines: ['2023 – 2026'] },
      { label: 'Intervention', lines: ['Développement TypeScript / React'] },
    ],
    stackTitle: 'Stack technique',
    stack: ['TypeScript', 'React', 'Next.js', 'Zustand', 'Drupal 10 / 11', 'PHP', 'Twig', 'SCSS', 'Playwright'],
    achievementsTitle: 'Réalisations',
    achievements: [
      'Applications React et Next.js déployées hors de Drupal',
      'Applications React intégrées dans Drupal 10 et 11',
      "Tests end-to-end et d'intégration avec Playwright",
      'Optimisation des performances et des temps de réponse',
    ],
    intro:
      "De 2023 à 2026, Acolad Développement a travaillé avec les équipes web d'OVHcloud pour concevoir et livrer des fonctionnalités métier, du besoin à la mise en production.",
    sections: [
      {
        title: 'Le contexte',
        paragraphs: [
          "Les plateformes web d'OVHcloud reposent sur Drupal 10 et 11. Une partie des fonctionnalités métier y prend la forme d'applications React : certaines sont intégrées dans Drupal, d'autres sont déployées à part et alimentées par des sources de données variées.",
        ],
      },
      {
        title: 'Une application React alimentée par Drupal',
        paragraphs: [
          "L'application est écrite en TypeScript avec React, et son état est géré avec Zustand. Ses données viennent de Drupal, qui reste l'outil de travail des équipes éditoriales.",
          "Elle intègre l'édition de contenu en direct sur ces données Drupal : les contributeurs modifient le contenu là où il s'affiche.",
        ],
      },
      {
        title: 'Qualité et méthode de travail',
        paragraphs: [
          "Les tests end-to-end et d'intégration ont été mis en place et maintenus avec Playwright, avec un travail continu sur les performances : Core Web Vitals et temps de réponse.",
          'La qualité du code passe par les revues, le refactoring et le partage de bonnes pratiques avec les développeurs. Le travail se faisait en Scrum et en Kanban, avec les équipes produit, UX et métier.',
        ],
      },
    ],
    next: { label: 'Projet suivant', project: 'issy', link: 'Voir le projet' },
  },
  about: {
    meta: {
      title: "À propos d'Acolad Développement, société créée en 2014",
      description:
        'Acolad Développement, société de développement web créée en 2014 en Haute-Garonne par Raphaël Apard, développeur fullstack certifié Acquia et Opquast.',
    },
    eyebrow: 'La société',
    h1: 'Une société de développement web, depuis 2014.',
    lead: 'Acolad Développement conçoit, maintient et héberge des applications web et des sites Drupal pour des entreprises et des institutions. La société est basée en Haute-Garonne et travaille avec des clients partout en France.',
    timeline: {
      eyebrow: 'Repères',
      title: 'Vingt ans de web, dont plus de dix à son compte.',
      items: [
        { year: '2006', text: "Premiers développements web en PHP, à l'Université Toulouse 1 Capitole." },
        {
          year: '2011',
          text: 'Développement Drupal en agence à Toulouse : Laboratoires Pierre Fabre, Aerospace Valley, labOrange.',
        },
        { year: '2014', text: "Création d'Acolad Développement.", highlight: true },
        {
          year: '2017',
          text: 'Début de cinq années de formation de développeurs web chez Simplon, en parallèle des projets clients.',
        },
        { year: '2023', text: "Trois ans avec les équipes web d'OVHcloud sur des applications React et Drupal." },
      ],
    },
    founder: {
      eyebrow: 'Le fondateur',
      name: 'Raphaël Apard',
      text: "Développeur fullstack, Raphaël intervient sur tout le cycle de vie des applications web : architecture, développement, intégration continue, mise en production et maintenance. C'est lui qui répond à vos messages, écrit le code et suit votre projet dans la durée.",
      portraitAlt: 'Portrait de Raphaël Apard',
    },
    commitments: {
      title: 'Quatre engagements',
      items: [
        { title: 'Un interlocuteur unique', text: "Pas d'intermédiaire entre vous et la personne qui développe." },
        {
          title: 'Un code qui reste le vôtre',
          text: "Dépôt, documentation et accès vous appartiennent. Rien n'est verrouillé.",
        },
        {
          title: 'Une qualité vérifiable',
          text: 'Tests automatisés, accessibilité et bonnes pratiques Opquast, mesurés et non promis.',
        },
        {
          title: 'Des chiffrages clairs',
          text: "Chaque évolution est estimée avant d'être lancée, et le temps passé est rendu visible.",
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
        { label: 'Données', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Apache Solr'] },
        {
          label: 'Qualité et livraison',
          items: ['CI/CD', 'Docker', 'Playwright', 'Vitest', 'Jest', 'Cypress', 'BackstopJS', 'Apache', 'Nginx'],
        },
      ],
    },
  },
  contact: {
    meta: {
      title: 'Contact : parler de votre projet web',
      description:
        "Contacter Acolad Développement à Toulouse pour une application métier, une intégration d'IA, un audit, une TMA, un site Drupal ou un hébergement.",
    },
    eyebrow: 'Contact',
    h1: 'Parlons de votre projet.',
    lead: "Un développement à lancer, une application à reprendre, un site Drupal à maintenir ou à héberger, un audit, une fonction d'IA : quelques lignes suffisent pour commencer.",
    details: {
      email: 'E-mail',
      phone: 'Téléphone',
      address: 'Implantation',
      addressLines: ['Toulouse, Revel, et à distance partout en France'],
    },
    next: {
      title: 'Et ensuite ?',
      steps: [
        'Une première réponse sous [VOTRE DÉLAI DE RÉPONSE].',
        "Un échange pour comprendre le besoin et l'existant.",
        'Une proposition écrite : périmètre, calendrier et budget.',
      ],
    },
    form: {
      name: 'Nom',
      company: 'Société ou organisme',
      email: 'E-mail',
      need: 'Votre besoin',
      otherNeed: 'Autre demande',
      message: 'Votre message',
      messageHint: 'Contexte, technologies en place, échéance : tout ce qui aide à vous répondre utilement.',
      privacy:
        'Les informations saisies servent uniquement à répondre à votre demande. Voir les [mentions légales](page:legal).',
      submit: 'Envoyer la demande',
      subject: 'Demande depuis acolad.fr',
    },
  },
  legal: {
    meta: {
      title: 'Mentions légales',
      description: "Mentions légales, données personnelles et cookies du site d'Acolad Développement.",
    },
    h1: 'Mentions légales',
    updated: 'Dernière mise à jour : 17 novembre 2026',
    updatedAt: '2026-11-17',
    tocLabel: 'Sommaire',
    sections: [
      {
        id: 'editeur',
        title: 'Éditeur du site',
        paragraphs: [
          '**Acolad Développement**, société par actions simplifiée unipersonnelle (SASU) au capital de 1 000 €',
          'Siège social : 27 avenue de Sorèze, 31250 Revel, France',
          'RCS Toulouse 807 777 917 · SIRET 807 777 917 00038',
          'TVA intracommunautaire : FR29807777917',
          `Téléphone : +33 6 13 78 91 34 · E-mail : [${email}](mailto:${email})`,
        ],
      },
      {
        id: 'publication',
        title: 'Directeur de la publication',
        paragraphs: ["Raphaël Apard, président d'Acolad Développement."],
      },
      {
        id: 'hebergement',
        title: 'Hébergement',
        paragraphs: [
          '**o2switch**, SAS au capital de 100 000 €, RCS Clermont-Ferrand 510 909 807',
          'Chemin des Pardiaux, 63000 Clermont-Ferrand, France',
          'Téléphone : 04 44 44 60 40 · [o2switch.fr](https://www.o2switch.fr)',
        ],
      },
      {
        id: 'propriete-intellectuelle',
        title: 'Propriété intellectuelle',
        paragraphs: [
          'Les textes, la mise en page et les photographies de ce site appartiennent à Acolad Développement, sauf mention contraire. Toute reproduction ou réutilisation sans autorisation écrite préalable est interdite.',
          "Les logos et captures d'écran des clients restent la propriété de leurs titulaires respectifs. Ils sont reproduits uniquement pour illustrer les projets réalisés.",
        ],
      },
      {
        id: 'donnees-personnelles',
        title: 'Données personnelles',
        paragraphs: [
          `Ce site n'a pas d'espace client. Le formulaire de contact prépare un e-mail dans votre propre messagerie : rien de ce que vous y saisissez n'est enregistré sur le site. Les seules données personnelles traitées sont celles que vous transmettez en écrivant à [${email}](mailto:${email}), et les données de mesure d'audience décrites plus bas.`,
          'Responsable du traitement : Acolad Développement, représentée par Raphaël Apard. Vos e-mails servent uniquement à répondre à votre demande et à suivre la relation commerciale. Ils sont conservés au plus 3 ans après le dernier échange et ne sont jamais transmis à des tiers.',
          `Conformément au RGPD et à la loi Informatique et Libertés, vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation, de portabilité et d'opposition sur vos données, ainsi que du droit de définir des directives sur leur sort après votre décès. Pour exercer ces droits, écrivez à [${email}](mailto:${email}) ; une réponse vous est apportée dans un délai d'un mois. Vous pouvez aussi adresser une réclamation à la [CNIL](https://www.cnil.fr/fr/plaintes).`,
        ],
      },
      {
        id: 'cookies',
        title: "Cookies et mesure d'audience",
        paragraphs: [
          "La fréquentation du site est mesurée avec Matomo, installé sur un serveur d'Acolad Développement (stats.acolad.net, hébergé en France par o2switch). Les statistiques servent uniquement à comprendre l'usage du site : elles ne sont ni transmises à des tiers ni croisées avec d'autres données, les adresses IP sont anonymisées et les données sont conservées 25 mois au plus.",
          "Matomo dépose deux cookies : `_pk_id` (identifiant de visiteur, 13 mois) et `_pk_ses` (session, 30 minutes). Ainsi configurée, cette mesure d'audience est exemptée de consentement selon les recommandations de la CNIL. Vous pouvez néanmoins la refuser ci-dessous : un cookie `mtm_consent_removed` (13 mois) mémorise alors votre refus.",
          "Le sélecteur de langue dépose un cookie `lang` (12 mois) qui mémorise votre choix. Aucun cookie publicitaire ni de réseau social n'est utilisé.",
        ],
      },
    ],
    optOut: {
      label: 'Mesurer mes visites avec Matomo',
      on: 'Vos visites sont mesurées de façon anonyme.',
      off: 'Vos visites ne sont plus mesurées sur ce navigateur.',
      unavailable:
        "La mesure d'audience ne fonctionne pas dans ce navigateur (JavaScript désactivé ou bloqueur de contenu) : vos visites ne sont pas mesurées.",
    },
  },
  notFound: {
    meta: { title: 'Page introuvable', description: "Cette page n'existe pas ou plus." },
    eyebrow: 'Erreur 404',
    h1: "Cette page n'existe pas, ou plus.",
    text: "L'adresse a peut-être changé avec la nouvelle version du site. Les pages ci-contre sont un bon point de départ.",
    cta: "Retour à l'accueil",
    navLabel: 'Pages principales',
  },
};
