// Turns the CMS documents of one locale into the content the site is built from.
// Pure function: `scripts/content.ts` fetches the documents and downloads the images.

// Types of the site's collections in the Acolad backoffice (copied by `pnpm sync:cms-types`).
import type {
  AcoladV2AiBlock as AiBlock,
  AcoladV2ClientsBlock as ClientsBlock,
  AcoladV2Company as Company,
  AcoladV2CredentialsBlock as CredentialsBlock,
  AcoladV2DomainsBlock as DomainsBlock,
  AcoladV2Experience as CmsExperience,
  AcoladV2ExperienceBlock as ExperienceBlock,
  AcoladV2Home as Home,
  AcoladV2Legal as Legal,
  AcoladV2Media as Media,
  AcoladV2Mission as CmsMission,
  AcoladV2MissionsBlock as MissionsBlock,
  AcoladV2NotFound as NotFound,
  AcoladV2Project as Project,
  AcoladV2Site as Site,
  AcoladV2SkillsBlock as SkillsBlock,
} from './payload-types';
import {
  contactAnchor,
  sectionAnchors,
  type Content,
  type Experience,
  type Image,
  type Lang,
  type Mission,
  type OtherProject,
  type Section,
} from './types.ts';

export interface CmsDocuments {
  site: Site;
  home: Home;
  legal: Legal;
  notFound: NotFound;
}

/** Path of an image under src/assets, e.g. `/media/portrait.webp`; registers it for download. */
export type MediaPath = (media: Media) => string;

// Routes are files in src/pages, so their paths live in the code, not in the CMS.
const languageNames: Record<Lang, string> = { fr: 'Français', en: 'English' };
const legalPaths: Record<Lang, string> = { fr: '/mentions-legales/', en: '/en/legal-notice/' };
const notFoundPaths: Record<Lang, string> = { fr: '/404.html', en: '/en/404/' };

type Relation<T> = number | T | null | undefined;

/** A relationship the API should have populated (depth too low or document deleted otherwise). */
function populated<T>(value: Relation<T>, what: string): T {
  if (value && typeof value === 'object') return value;
  throw new Error(`CMS: ${what} is not populated (missing document, or request depth too low)`);
}

/** Populated documents of a hasMany relationship, skipping deleted ones. */
function documents<T>(values: Relation<T>[] | null | undefined): T[] {
  return (values ?? []).filter((v): v is T => Boolean(v) && typeof v === 'object');
}

/** Drops empty optional values so the content matches "absent means not rendered". */
function nonEmpty<T>(value: T[] | null | undefined): T[] | undefined {
  return value && value.length > 0 ? value : undefined;
}

function optional(value: string | null | undefined): string | undefined {
  return value ? value : undefined;
}

export function toContent(lang: Lang, docs: CmsDocuments, mediaPath: MediaPath): Content {
  const { site, home, legal, notFound } = docs;

  const image = (value: Relation<Media>, what: string): Image => {
    const media = populated(value, what);
    return { src: mediaPath(media), alt: media.alt ?? '' };
  };
  const optionalImage = (value: Relation<Media>, what: string): Image | undefined =>
    value ? image(value, what) : undefined;
  const logo = (company: Company): string | undefined =>
    company.logo ? mediaPath(populated(company.logo, `logo of ${company.name}`)) : undefined;

  let counter = 0;
  const number = () => String(++counter).padStart(2, '0');

  const mission = (m: CmsMission): Mission => {
    const company = populated(m.company, `client of mission ${m.id}`);
    return {
      period: m.period,
      client: m.displayName || company.name,
      logo: logo(company),
      place: optional(m.place),
      role: m.role,
      hook: m.hook,
      achievements: nonEmpty(m.achievements?.map((a) => a.text)),
      stack: nonEmpty(m.stack),
      image: optionalImage(m.image, `screenshot of mission ${m.id}`),
    };
  };

  const project = (p: Project): OtherProject => {
    const company = populated(p.company, `client of project ${p.id}`);
    return {
      client: p.displayName || company.name,
      place: optional(p.place),
      text: p.text,
      image: optionalImage(p.image, `screenshot of project ${p.id}`),
    };
  };

  const experience = (e: CmsExperience): Experience => {
    const company = populated(e.company, `company of experience ${e.id}`);
    return {
      period: e.period,
      company: e.displayName || company.name,
      logo: logo(company),
      place: optional(e.place),
      role: e.role,
      text: e.text,
      achievements: nonEmpty(e.achievements?.map((a) => a.text)),
      projects: nonEmpty(e.projects?.map(({ name, text }) => ({ name, text }))),
    };
  };

  type Block = NonNullable<Home['sections']>[number];

  const section = (block: Block): Section => {
    switch (block.blockType) {
      case 'domains': {
        const b: DomainsBlock = block;
        return { type: 'domains', number: number(), title: b.title, items: (b.items ?? []).map((i) => i.text) };
      }
      case 'ai': {
        const b: AiBlock = block;
        return {
          type: 'ai',
          number: number(),
          title: b.title,
          paragraphs: (b.paragraphs ?? []).map((p) => p.text),
          tags: b.tags ?? [],
        };
      }
      case 'clients': {
        const b: ClientsBlock = block;
        return {
          type: 'clients',
          title: b.title,
          logos: documents(b.companies)
            .filter((c) => c.logo)
            .map((c) => ({ name: c.name, src: logo(c)!, height: c.logoHeight ?? 48 })),
        };
      }
      case 'skills': {
        const b: SkillsBlock = block;
        return {
          type: 'skills',
          number: number(),
          title: b.title,
          expandLabel: b.expandLabel,
          collapseLabel: b.collapseLabel,
          groups: (b.groups ?? []).map((g) => ({ title: g.title, items: g.items ?? [] })),
        };
      }
      case 'missions': {
        const b: MissionsBlock = block;
        return {
          type: 'missions',
          number: number(),
          title: b.title,
          company: b.company,
          since: b.since,
          achievementsLabel: b.achievementsLabel,
          stackLabel: b.stackLabel,
          items: documents(b.missions).map(mission),
          otherProjects: { title: b.otherProjects.title, items: documents(b.otherProjects.projects).map(project) },
        };
      }
      case 'experience': {
        const b: ExperienceBlock = block;
        return { type: 'experience', title: b.title, items: documents(b.experiences).map(experience) };
      }
      case 'credentials': {
        const b: CredentialsBlock = block;
        return {
          type: 'credentials',
          number: number(),
          title: b.title,
          verifyLabel: b.verifyLabel,
          certifications: {
            title: b.certifications.title,
            items: (b.certifications.items ?? []).map(({ name, year, verifyUrl }) => ({
              name,
              year,
              verifyUrl: verifyUrl || null,
            })),
          },
          education: {
            title: b.education.title,
            items: (b.education.items ?? []).map(({ name, school, period }) => ({ name, school, period })),
          },
          languages: {
            title: b.languages.title,
            items: (b.languages.items ?? []).map(({ name, level }) => ({ name, level })),
          },
        };
      }
    }
  };

  const blocks = home.sections ?? [];
  const sections = blocks.map(section);
  if (sections.some((s, i) => sections.findIndex((o) => o.type === s.type) !== i)) {
    throw new Error('CMS: a kind of section is used twice on the home page');
  }

  const nav: Content['nav'] = blocks.flatMap((block) => {
    const id = sectionAnchors[block.blockType];
    const label = 'navLabel' in block ? block.navLabel : null;
    return id && label ? [{ id, label }] : [];
  });
  if (site.contact.navLabel) nav.push({ id: contactAnchor, label: site.contact.navLabel });

  const { ui } = site;

  return {
    meta: { lang, languageName: languageNames[lang], title: site.seo.title, description: site.seo.description },
    links: {
      email: site.links.email,
      linkedin: site.links.linkedin || null,
      malt: site.links.malt || null,
      github: site.links.github || null,
    },
    nav,
    hero: {
      name: home.hero.name,
      title: home.hero.title,
      leadStrong: home.hero.leadStrong,
      lead: home.hero.lead,
      info: home.hero.info ?? [],
      cta: home.hero.cta,
      portrait: image(home.hero.portrait, 'hero portrait'),
    },
    sections,
    contact: { title: site.contact.title, footer: site.contact.footer, backToTop: site.contact.backToTop },
    ui: {
      skipLink: ui.skipLink,
      languageSwitch: ui.languageSwitch,
      openMenu: ui.openMenu,
      closeMenu: ui.closeMenu,
      mainNav: ui.mainNav,
      profiles: ui.profiles,
      tools: ui.tools,
      verifyAriaPrefix: ui.verifyAriaPrefix,
      enlargeImage: ui.enlargeImage,
      closeImage: ui.closeImage,
      copyEmail: ui.copyEmail,
      emailCopied: ui.emailCopied,
    },
    legal: {
      path: legalPaths[lang],
      linkLabel: legal.linkLabel,
      title: legal.title,
      description: legal.description,
      updated: legal.updated,
      sections: (legal.sections ?? []).map((s) => ({
        id: s.anchor,
        title: s.title,
        paragraphs: (s.paragraphs ?? []).map((p) => p.html),
      })),
      optOut: {
        label: legal.optOut.label,
        on: legal.optOut.on,
        off: legal.optOut.off,
        unavailable: legal.optOut.unavailable,
      },
    },
    notFound: {
      path: notFoundPaths[lang],
      code: notFound.code,
      title: notFound.title,
      text: notFound.text,
      cta: notFound.cta,
      image: image(notFound.image, '404 illustration'),
    },
  };
}
