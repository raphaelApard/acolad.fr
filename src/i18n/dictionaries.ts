import type { Locale } from "./config";

type Item = { title: string; desc: string };

export type Dictionary = {
  meta: {
    title: string;
    description: string;
    ogLocale: string;
    ogAlt: string;
  };
  a11y: {
    skipToContent: string;
    mainNav: string;
    languageSwitch: string;
    menu: string;
    socialLinks: string;
  };
  nav: {
    services: string;
    work: string;
    clients: string;
    about: string;
    contact: string;
  };
  hero: {
    title: string;
    sub: string;
    role: string;
    based: string;
    remote: string;
  };
  cta: { contact: string; work: string };
  services: Item[];
  projects: (Item & { tag: string; img: string })[];
  clientsTitle: string;
  timeline: { years: string; role: string; org: string }[];
  stackLabel: string;
  contactTitle: string;
};

const fr: Dictionary = {
  meta: {
    title: "Raphaël Apard — Développeur Web & Solutions IA à Toulouse",
    description:
      "Développeur freelance à Toulouse / Revel : sites et applications web sur mesure (Next.js, React), agents IA, automatisation et intégration LLM / RAG. Missions sur site ou à distance.",
    ogLocale: "fr_FR",
    ogAlt: "Raphaël Apard — Développeur Web & Solutions IA",
  },
  a11y: {
    skipToContent: "Aller au contenu",
    mainNav: "Navigation principale",
    languageSwitch: "Langue",
    menu: "Menu",
    socialLinks: "Réseaux",
  },
  nav: {
    services: "Services",
    work: "Projets",
    clients: "Clients",
    about: "Parcours",
    contact: "Contact",
  },
  hero: {
    title:
      "Des sites qui convertissent, des applications sur mesure et des IA qui travaillent pour vous.",
    sub: "J’intègre l’IA là où elle fait gagner du temps : automatisation, agents, recherche documentaire.",
    role: "Développeur Web & Solutions IA",
    based: "Basé à Toulouse / Revel",
    remote: "Missions sur site ou à distance",
  },
  cta: { contact: "Contactez-moi", work: "Voir les projets" },
  services: [
    {
      title: "Sites & applications web",
      desc: "Vitrines, e-commerce, back-offices. Next.js, performance et SEO soignés.",
    },
    {
      title: "Agents IA & automatisation",
      desc: "Assistants métier, workflows automatisés, connexion à vos outils existants.",
    },
    {
      title: "Intégration LLM & RAG",
      desc: "Recherche dans vos documents, chatbots fiables sur vos données, API OpenAI / Anthropic.",
    },
    {
      title: "Audit & accompagnement",
      desc: "Cadrage, choix techniques, montée en compétence de vos équipes.",
    },
  ],
  projects: [
    {
      tag: "Agent IA",
      title: "Assistant support client",
      desc: "Agent connecté au CRM répondant aux demandes de niveau 1 pour une PME de services.",
      img: "capture projet 1",
    },
    {
      tag: "Web",
      title: "Plateforme de réservation",
      desc: "Site + back-office pour une startup, paiement en ligne et espace client.",
      img: "capture projet 2",
    },
    {
      tag: "RAG",
      title: "Recherche documentaire interne",
      desc: "Moteur de questions-réponses sur 10 000 documents pour une ESN.",
      img: "capture projet 3",
    },
  ],
  clientsTitle: "Ils m’ont fait confiance",
  timeline: [
    {
      years: "2014 — auj.",
      role: "Développeur freelance Web & IA",
      org: "Indépendant — Toulouse / Revel",
    },
    {
      years: "2016 — 2021",
      role: "Formateur en développement web",
      org: "Simplon",
    },
    { years: "2012 — 2014", role: "Expert Drupal", org: "Makina Corpus" },
    { years: "2011 — 2012", role: "Développeur Drupal", org: "X-Prime Groupe" },
  ],
  stackLabel: "Stack",
  contactTitle: "Un projet en tête ? Parlons-en !",
};

const en: Dictionary = {
  meta: {
    title: "Raphaël Apard — Web Developer & AI Solutions in Toulouse, France",
    description:
      "Freelance developer based in Toulouse, France: custom websites and web apps (Next.js, React), AI agents, automation and LLM / RAG integration. On-site or remote.",
    ogLocale: "en_US",
    ogAlt: "Raphaël Apard — Web Developer & AI Solutions",
  },
  a11y: {
    skipToContent: "Skip to content",
    mainNav: "Main navigation",
    languageSwitch: "Language",
    menu: "Menu",
    socialLinks: "Social links",
  },
  nav: {
    services: "Services",
    work: "Work",
    clients: "Clients",
    about: "Background",
    contact: "Contact",
  },
  hero: {
    title:
      "Websites that convert, applications built to measure and AI that works for you.",
    sub: "I bring AI where it saves real time: automation, agents, document search.",
    role: "Web Developer & AI Solutions",
    based: "Based in Toulouse / Revel",
    remote: "On-site or remote",
  },
  cta: { contact: "Get in touch", work: "See the work" },
  services: [
    {
      title: "Websites & web apps",
      desc: "Marketing sites, e-commerce, back-offices. Next.js, performance and SEO done right.",
    },
    {
      title: "AI agents & automation",
      desc: "Business assistants, automated workflows, connected to your existing tools.",
    },
    {
      title: "LLM & RAG integration",
      desc: "Search across your documents, reliable chatbots on your data, OpenAI / Anthropic APIs.",
    },
    {
      title: "Audit & advisory",
      desc: "Scoping, technical decisions, upskilling your team.",
    },
  ],
  projects: [
    {
      tag: "AI agent",
      title: "Customer support assistant",
      desc: "CRM-connected agent handling tier-1 requests for a services SME.",
      img: "project screenshot 1",
    },
    {
      tag: "Web",
      title: "Booking platform",
      desc: "Site + back-office for a startup, online payment and customer area.",
      img: "project screenshot 2",
    },
    {
      tag: "RAG",
      title: "Internal document search",
      desc: "Q&A engine across 10,000 documents for an IT services firm.",
      img: "project screenshot 3",
    },
  ],
  clientsTitle: "Trusted by",
  timeline: [
    {
      years: "2014 — now",
      role: "Freelance Web & AI developer",
      org: "Independent — Toulouse / Revel",
    },
    {
      years: "2016 — 2021",
      role: "Web development trainer",
      org: "Simplon",
    },
    { years: "2012 — 2014", role: "Drupal expert", org: "Makina Corpus" },
    { years: "2011 — 2012", role: "Drupal developer", org: "X-Prime Groupe" },
  ],
  stackLabel: "Stack",
  contactTitle: "Got a project? Let’s talk",
};

const dictionaries: Record<Locale, Dictionary> = { fr, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
