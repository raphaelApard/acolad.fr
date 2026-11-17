import type { Lang, PageId, ServiceId } from './routes';

// Copy of the site, one object per locale (fr.ts, en.ts) with the same structure.
//
// "Rich" strings may hold links written `[label](page:<PageId>)`, `[label](https://…)` or
// `[label](mailto:…)`, and `**strong**` / `` `code` `` spans; see rich.ts. Text in [SQUARE
// BRACKETS CAPITALS] is a placeholder still to be filled in before going live.

export type ProjectId = 'ovhcloud' | 'docteurConso' | 'cnrs' | 'obepine' | 'issy' | 'syndex' | 'hospital' | 'meetToTravel' | 'parisSaclay';

export type ClientId =
  | 'ovhcloud'
  | 'cnrs'
  | 'hospital'
  | 'pantheonSorbonne'
  | 'eyFabernovel'
  | 'parisSaclay'
  | 'syndex'
  | 'muzeo'
  | 'docteurConso'
  | 'axess'
  | 'issy'
  | 'humansConnexion'
  | 'makinaCorpus';

/** A client of the logo band: its logo (see images.ts) and its name, read out as the logo's text. */
export interface Client {
  id: ClientId;
  name: string;
}

export interface Meta {
  /** <title>, without the site name. */
  title: string;
  description: string;
}

export interface TitledText {
  title: string;
  text: string;
}

export interface Fact {
  label: string;
  /** One line per entry. */
  lines: string[];
}

/** A project shown as a card: screenshot, optional meta line, name, text. */
export interface ProjectCard {
  project: ProjectId;
  meta?: string;
  text: string;
}

export interface Plan {
  title: string;
  text: string;
  /** Price, or a placeholder; `unit` follows it in small type. */
  price: string;
  unit?: string;
  points: string[];
  featured?: boolean;
}

export type Showcase = { eyebrow: string; title: string } & (
  | { kind: 'projects'; items: ProjectCard[] }
  | { kind: 'cards'; numbered: boolean; items: TitledText[] }
  | { kind: 'plans'; items: Plan[] }
);

export interface Service {
  /** "01" to "06", the order of the services everywhere. */
  number: string;
  /** Full name: footer, 404 page. */
  name: string;
  /** Short name in the header menu. */
  navLabel: string;
  /** One line under the service's title in the header's services panel. */
  navText: string;
  /** Card in the services grid of the home page. */
  card: { title: string; text: string; points: string[]; link: string };
  /** Option of the "your need" select on the contact page. */
  contactOption: string;
  meta: Meta;
  eyebrow: string;
  h1: string;
  lead: string;
  cta: string;
  coverTitle: string;
  cover: TitledText[];
  process: { title: string; steps: TitledText[] };
  showcase: Showcase;
  /** Answers are rich strings. */
  faq: { question: string; answer: string }[];
}

export interface WorkItem {
  project: ProjectId;
  meta: string;
  /** Defaults to the project name. */
  title?: string;
  text: string;
  points?: string[];
  tags: string[];
  /** Links to the case study. */
  caseStudy?: boolean;
}

export interface SiteContent {
  lang: Lang;
  languageName: string;
  siteName: string;
  ui: {
    skipLink: string;
    mainNav: string;
    languageSwitch: string;
    openMenu: string;
    closeMenu: string;
    homeLink: string;
    technologies: string;
    faqTitle: string;
    processEyebrow: string;
    servicePrefix: string;
  };
  /** Menu labels of the pages that are not services. */
  /** `services` labels the button that opens the list of services. */
  nav: Record<'services' | 'work' | 'about' | 'contact', string>;
  projects: Record<ProjectId, { name: string; alt: string }>;
  cta: { title: string; text: string; button: string };
  footer: {
    tagline: string;
    servicesTitle: string;
    companyTitle: string;
    contactTitle: string;
    location: string;
    /** Copyright holder; the footer prefixes "© <founding year>–<build year>". */
    copyright: string;
    note: string;
  };
  home: {
    meta: Meta;
    eyebrow: string;
    h1: string;
    /** Opening words of `h1`, shown in a muted tone. `h1` must start with them. */
    h1Muted: string;
    lead: string;
    primaryCta: string;
    secondaryCta: string;
    clientsLabel: string;
    /** Accessible names of the arrows that page through the client logos. */
    clientsPrevious: string;
    clientsNext: string;
    clients: Client[];
    services: { eyebrow: string; title: string; text: string };
    method: { eyebrow: string; title: string; steps: TitledText[] };
    work: { eyebrow: string; title: string; link: string; items: ProjectCard[] };
    company: { eyebrow: string; title: string; text: string; link: string; facts: Fact[] };
  };
  services: Record<ServiceId, Service>;
  work: {
    meta: Meta;
    eyebrow: string;
    h1: string;
    lead: string;
    caseStudyLink: string;
    items: WorkItem[];
    othersTitle: string;
    others: ProjectCard[];
  };
  caseStudy: {
    meta: Meta;
    back: string;
    eyebrow: string;
    h1: string;
    facts: Fact[];
    stackTitle: string;
    stack: string[];
    achievementsTitle: string;
    achievements: string[];
    intro: string;
    sections: { title: string; paragraphs: string[] }[];
    next: { label: string; project: ProjectId; link: string };
  };
  about: {
    meta: Meta;
    eyebrow: string;
    h1: string;
    lead: string;
    timeline: { eyebrow: string; title: string; items: { year: string; text: string; highlight?: boolean }[] };
    /** `portraitAlt` describes the founder's photo. */
    founder: { eyebrow: string; name: string; text: string; portraitAlt: string };
    commitments: { title: string; items: TitledText[] };
    technologies: { title: string; groups: { label: string; items: string[] }[] };
  };
  contact: {
    meta: Meta;
    eyebrow: string;
    h1: string;
    lead: string;
    details: { email: string; phone: string; address: string; addressLines: string[] };
    next: { title: string; steps: string[] };
    form: {
      name: string;
      company: string;
      email: string;
      need: string;
      otherNeed: string;
      message: string;
      messageHint: string;
      /** Rich string. */
      privacy: string;
      submit: string;
      /** Explains that sending opens the visitor's mail application. */
      mailNote: string;
      /** Subject prefix of the prepared e-mail. */
      subject: string;
    };
  };
  legal: {
    meta: Meta;
    h1: string;
    updated: string;
    /** ISO date, for the sitemap. */
    updatedAt: string;
    tocLabel: string;
    /** Paragraphs are rich strings. The Matomo opt-out follows the last section. */
    sections: { id: string; title: string; paragraphs: string[] }[];
    optOut: { label: string; on: string; off: string; unavailable: string };
  };
  notFound: {
    meta: Meta;
    eyebrow: string;
    h1: string;
    text: string;
    cta: string;
    navLabel: string;
  };
}

export type { Lang, PageId, ServiceId };
