// Shape of the content the site is built from: src/content/data/<lang>.json, written by
// `pnpm content:pull` (from the CMS) or `pnpm content:fixture` (from fixtures/).
// Optional fields must render nothing when absent (see design/mockups/MissionStates.dc.html).

export type Lang = 'fr' | 'en';

export interface Image {
  /** Path under src/assets, e.g. `/media/404-fr.webp`; sizes come from the file itself. */
  src: string;
  alt: string;
}

/** A mission's page of its own (see src/components/CaseStudyPage.astro). */
export interface CaseStudy {
  /** Same in every locale. */
  slug: string;
  /** Page URL, e.g. `/missions/ovhcloud/` or `/en/missions/ovhcloud/`. */
  path: string;
  title: string;
  description: string;
  intro: string;
  sections: { heading: string; paragraphs: string[] }[];
  /** Last change of the mission (ISO date), for the sitemap. */
  updatedAt: string;
}

export interface Mission {
  period: string;
  client: string;
  /** Company logo, path under src/assets. */
  logo?: string;
  place?: string;
  role: string;
  hook: string;
  achievements?: string[];
  stack?: string[];
  image?: Image;
  caseStudy?: CaseStudy;
}

export interface OtherProject {
  client: string;
  /** Agency the project was done through, e.g. `via OWS`. */
  place?: string;
  text: string;
  image?: Image;
}

export interface Experience {
  period: string;
  company: string;
  /** Company logo, path under src/assets. */
  logo?: string;
  place?: string;
  role: string;
  text: string;
  achievements?: string[];
  projects?: { name: string; text: string }[];
}

export interface LegalSection {
  /** Anchor of the section heading. */
  id: string;
  title: string;
  /** Trusted HTML from the CMS: links, <strong> and <code> only. */
  paragraphs: string[];
}

export interface ClientLogo {
  name: string;
  src: string;
  /** Rendered height in px on desktop, tuned per logo to balance visual weight. */
  height: number;
}

// Home page sections, in page order. Each type appears at most once: its anchor is fixed in
// its component (see `sectionAnchors`). `number` ("01", "02"…) follows the page order.

export interface DomainsSection {
  type: 'domains';
  number: string;
  title: string;
  items: string[];
}

export interface AiSection {
  type: 'ai';
  number: string;
  title: string;
  paragraphs: string[];
  tags: string[];
}

export interface ClientsSection {
  type: 'clients';
  title: string;
  logos: ClientLogo[];
}

export interface SkillsSection {
  type: 'skills';
  number: string;
  title: string;
  expandLabel: string;
  collapseLabel: string;
  groups: { title: string; items: string[] }[];
}

export interface MissionsSection {
  type: 'missions';
  number: string;
  title: string;
  company: string;
  since: string;
  achievementsLabel: string;
  stackLabel: string;
  items: Mission[];
  otherProjects: { title: string; items: OtherProject[] };
}

export interface ExperienceSection {
  type: 'experience';
  title: string;
  items: Experience[];
}

export interface CredentialsSection {
  type: 'credentials';
  number: string;
  title: string;
  verifyLabel: string;
  certifications: { title: string; items: { name: string; year: string; verifyUrl: string | null }[] };
  education: { title: string; items: { name: string; school: string; period: string }[] };
  languages: { title: string; items: { name: string; level: string }[] };
}

export type Section =
  | DomainsSection
  | AiSection
  | ClientsSection
  | SkillsSection
  | MissionsSection
  | ExperienceSection
  | CredentialsSection;

export type SectionType = Section['type'];

/** Anchor (`id`) of each section, fixed in its component and identical in every locale. */
export const sectionAnchors = {
  domains: 'domaines',
  ai: 'ia',
  clients: null,
  skills: 'competences',
  missions: 'missions',
  experience: 'parcours',
  credentials: 'certifications',
} as const satisfies Record<SectionType, string | null>;

/** Anchor of the footer, the last menu entry. */
export const contactAnchor = 'contact';

export interface Content {
  meta: {
    lang: Lang;
    languageName: string;
    title: string;
    description: string;
    /** Latest change of the documents the home page shows (ISO date), for the sitemap. */
    updatedAt: string;
  };
  links: { email: string; linkedin: string | null; malt: string | null; github: string | null };
  nav: { id: string; label: string }[];
  hero: {
    name: string;
    title: string;
    leadStrong: string;
    lead: string;
    info: string[];
    cta: string;
  };
  sections: Section[];
  contact: { title: string; footer: string; backToTop: string };
  legal: {
    /** Page URL, also used as the footer link target. */
    path: string;
    linkLabel: string;
    title: string;
    description: string;
    updated: string;
    /** Last change of the legal notice document (ISO date), for the sitemap. */
    updatedAt: string;
    sections: LegalSection[];
    /** Matomo opt-out checkbox, shown at the end of the cookies section. */
    optOut: {
      label: string;
      on: string;
      off: string;
      /** Shown until the tracker loads, and for good when it is blocked or JS is off. */
      unavailable: string;
    };
  };
  notFound: {
    /** Error page path, served by Apache's ErrorDocument (see public/.htaccess). */
    path: string;
    code: string;
    title: string;
    text: string;
    cta: string;
    /** The road sign carries the error text, so each locale has its own picture. */
    image: Image;
  };
  ui: {
    skipLink: string;
    languageSwitch: string;
    openMenu: string;
    closeMenu: string;
    mainNav: string;
    profiles: string;
    tools: string;
    /** Followed by the certification name, for the "verify" link's accessible name. */
    verifyAriaPrefix: string;
    /** Followed by the image description, for the screenshot buttons' accessible name. */
    enlargeImage: string;
    closeImage: string;
    copyEmail: string;
    /** Shown on the copy button, and announced, once the address is on the clipboard. */
    emailCopied: string;
    /** First breadcrumb entry of the inner pages. */
    home: string;
    /** Accessible name of the breadcrumb navigation. */
    breadcrumb: string;
    /** Link from a mission to its case study, followed by the client name for screen readers. */
    caseStudyLink: string;
  };
}

/** The section of a given type, if the page has one. */
export function findSection<T extends SectionType>(content: Content, type: T): Extract<Section, { type: T }> | undefined {
  return content.sections.find((s): s is Extract<Section, { type: T }> => s.type === type);
}
