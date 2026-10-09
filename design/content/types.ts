// Shape of content/<lang>.json. Optional fields must render nothing when absent
// (see mockups/MissionStates.dc.html).

export type Lang = 'fr' | 'en';

export interface Image {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface Mission {
  period: string;
  client: string;
  place?: string;
  role: string;
  hook: string;
  achievements?: string[];
  stack?: string[];
  image?: Image;
}

export interface OtherProject {
  client: string;
  text: string;
  image?: Image;
}

export interface Experience {
  period: string;
  company: string;
  place?: string;
  role: string;
  text: string;
  achievements?: string[];
  projects?: { name: string; text: string }[];
}

export interface Content {
  meta: { lang: Lang; title: string; description: string };
  links: { email: string; linkedin: string | null; malt: string | null; github: string | null };
  nav: { id: string; label: string }[];
  hero: {
    name: string;
    title: string;
    leadStrong: string;
    lead: string;
    info: string[];
    cta: string;
    portrait: Image;
  };
  domains: { number: string; title: string; items: string[] };
  ai: { number: string; title: string; paragraphs: string[]; tags: string[] };
  clients: { title: string; logos: { name: string; src: string; height: number }[] };
  skills: {
    number: string;
    title: string;
    expandLabel: string;
    collapseLabel: string;
    groups: { title: string; items: string[] }[];
  };
  missions: {
    number: string;
    title: string;
    company: string;
    since: string;
    achievementsLabel: string;
    stackLabel: string;
    items: Mission[];
  };
  otherProjects: { title: string; items: OtherProject[] };
  experience: { title: string; items: Experience[] };
  credentials: {
    number: string;
    title: string;
    verifyLabel: string;
    certifications: { title: string; items: { name: string; year: string; verifyUrl: string | null }[] };
    education: { title: string; items: { name: string; school: string; period: string }[] };
    languages: { title: string; items: { name: string; level: string }[] };
  };
  contact: { title: string; footer: string; backToTop: string };
  ui: { skipLink: string; languageSwitch: string; openMenu: string; profiles: string };
}
