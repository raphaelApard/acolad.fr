import { describe, expect, it } from 'vitest';
import { toContent, type CmsDocuments } from '../../src/content/cms';
import type { AcoladV2Company as Company, AcoladV2Media as Media } from '../../src/content/payload-types';

const media = (id: number, filename: string, alt = ''): Media =>
  ({ id, filename, alt, url: `/api/media/file/${filename}` }) as Media;

const ovh = { id: 1, name: 'OVHcloud', logo: media(1, 'logo-ovh.webp'), logoHeight: 44 } as Company;
const simplon = { id: 2, name: 'Simplon', logo: null } as Company;

function documents(sections: unknown[]): CmsDocuments {
  return {
    site: {
      seo: { title: 'Title', description: 'Description' },
      links: { email: 'a@b.fr', linkedin: '', malt: null, github: 'https://github.com/x' },
      contact: { navLabel: 'Contact', title: 'A project?', footer: 'Footer', backToTop: 'Top' },
      ui: { home: 'Home', breadcrumb: 'Breadcrumb', caseStudyLink: 'Case study' },
      updatedAt: '2026-01-01T00:00:00.000Z',
    },
    home: {
      hero: {
        name: 'Jane Doe',
        title: 'Developer',
        leadStrong: 'Strong.',
        lead: 'Lead',
        info: null,
        cta: 'Talk',
        portrait: media(2, 'portrait.webp', 'Portrait'),
      },
      sections,
      updatedAt: '2026-02-01T00:00:00.000Z',
    },
    legal: {
      linkLabel: 'Legal',
      title: 'Legal',
      description: 'Legal',
      updated: 'Today',
      sections: [{ anchor: 'publisher', title: 'Publisher', paragraphs: [{ html: '<strong>Acme</strong>' }] }],
      optOut: { label: 'l', on: 'on', off: 'off', unavailable: 'u' },
      updatedAt: '2025-12-01T00:00:00.000Z',
    },
    notFound: { code: '404', title: 'Lost', text: 'Text', cta: 'Home', image: media(3, '404.webp', 'Sign') },
  } as unknown as CmsDocuments;
}

const domains = { blockType: 'domains', navLabel: 'Expertise', title: 'Domains', items: [{ text: 'One' }] };
const clients = { blockType: 'clients', title: 'Clients', companies: [ovh, simplon, 99] };
const missions = {
  blockType: 'missions',
  navLabel: 'Missions',
  title: 'Missions',
  company: 'Acme',
  since: 'since 2014',
  achievementsLabel: 'Achievements',
  stackLabel: 'Stack',
  missions: [
    {
      id: 1,
      company: ovh,
      displayName: null,
      period: '2023',
      place: '',
      role: 'Dev',
      hook: 'Hook',
      achievements: [],
      stack: ['React'],
      image: null,
      updatedAt: '2026-03-01T00:00:00.000Z',
    },
  ],
  otherProjects: { title: 'Other', projects: [{ id: 1, company: simplon, displayName: 'Simplon school', text: 'T' }] },
};
const experience = { blockType: 'experience', navLabel: null, title: 'Experience', experiences: [] };

describe('toContent', () => {
  it('numbers the numbered sections in page order', () => {
    const content = toContent('en', documents([missions, clients, domains]), (m) => `/media/${m.filename}`);
    expect(content.sections.map((s) => [s.type, 'number' in s ? s.number : null])).toEqual([
      ['missions', '01'],
      ['clients', null],
      ['domains', '02'],
    ]);
  });

  it('builds the menu from the sections that have a label, then the footer', () => {
    const content = toContent('en', documents([domains, experience, missions]), (m) => `/media/${m.filename}`);
    expect(content.nav).toEqual([
      { id: 'domaines', label: 'Expertise' },
      { id: 'missions', label: 'Missions' },
      { id: 'contact', label: 'Contact' },
    ]);
  });

  it('drops empty optional fields and resolves company names and logos', () => {
    const content = toContent('fr', documents([missions]), (m) => `/media/${m.filename}`);
    const section = content.sections[0];
    if (section?.type !== 'missions') throw new Error('expected missions');
    expect(section.items[0]).toEqual({
      period: '2023',
      client: 'OVHcloud',
      logo: '/media/logo-ovh.webp',
      role: 'Dev',
      hook: 'Hook',
      stack: ['React'],
    });
    expect(section.otherProjects.items[0]?.client).toBe('Simplon school');
    expect(content.links).toEqual({ email: 'a@b.fr', linkedin: null, malt: null, github: 'https://github.com/x' });
    expect(content.legal.path).toBe('/mentions-legales/');
  });

  it('keeps only companies with a logo in the client band, skipping unpopulated ones', () => {
    const content = toContent('en', documents([clients]), (m) => `/media/${m.filename}`);
    expect(content.sections[0]).toEqual({
      type: 'clients',
      title: 'Clients',
      logos: [{ name: 'OVHcloud', src: '/media/logo-ovh.webp', height: 44 }],
    });
  });

  it('links a client logo to the company website when it has one', () => {
    const withSite = { ...clients, companies: [{ ...ovh, website: 'https://www.ovhcloud.com' }] };
    const content = toContent('en', documents([withSite]), (m) => `/media/${m.filename}`);
    const section = content.sections[0];
    if (section?.type !== 'clients') throw new Error('expected clients');
    expect(section.logos[0]?.url).toBe('https://www.ovhcloud.com');
  });

  it('maps the hero facts, dropping empty fields and half-filled links', () => {
    const docs = documents([]);
    docs.home.hero.facts = {
      title: 'At a glance',
      items: [
        { label: 'Stack', strong: '', text: null, tags: ['React'], linkLabel: 'See', linkHref: '' },
        { label: 'Latest', strong: 'OVHcloud', text: 'Features', tags: [], linkLabel: 'See', linkHref: '#missions' },
      ],
    };
    expect(toContent('en', docs, () => '').hero.facts).toEqual({
      title: 'At a glance',
      items: [
        { label: 'Stack', tags: ['React'] },
        { label: 'Latest', strong: 'OVHcloud', text: 'Features', link: { label: 'See', href: '#missions' } },
      ],
    });
  });

  it('leaves the hero facts out when the card has no title or no row', () => {
    const docs = documents([]);
    docs.home.hero.facts = { title: 'At a glance', items: [] };
    expect(toContent('en', docs, () => '').hero.facts).toBeUndefined();
  });

  it('reports every image it uses', () => {
    const used: string[] = [];
    toContent('en', documents([clients, missions]), (m) => {
      used.push(m.filename!);
      return `/media/${m.filename}`;
    });
    expect(new Set(used)).toEqual(new Set(['logo-ovh.webp', '404.webp']));
  });

  it('gives a case study its path in each locale and splits its paragraphs', () => {
    const study = {
      slug: 'ovhcloud',
      title: 'OVHcloud',
      description: 'Meta',
      intro: 'Intro',
      sections: [{ heading: 'Context', body: 'One.\n\n  Two.\n' }],
    };
    const withStudy = { ...missions, missions: [{ ...missions.missions[0], caseStudy: study }] };
    for (const [lang, path] of [
      ['fr', '/missions/ovhcloud/'],
      ['en', '/en/missions/ovhcloud/'],
    ] as const) {
      const section = toContent(lang, documents([withStudy]), (m) => `/media/${m.filename}`).sections[0];
      if (section?.type !== 'missions') throw new Error('expected missions');
      expect(section.items[0]?.caseStudy).toEqual({
        slug: 'ovhcloud',
        path,
        title: 'OVHcloud',
        description: 'Meta',
        intro: 'Intro',
        sections: [{ heading: 'Context', paragraphs: ['One.', 'Two.'] }],
        updatedAt: '2026-03-01T00:00:00.000Z',
      });
    }
  });

  it('rejects an incomplete case study, and two case studies at the same address', () => {
    const study = { slug: 'ovhcloud', title: 'T', description: '', intro: 'I', sections: [{ heading: 'H', body: 'B' }] };
    const mission = { ...missions.missions[0], caseStudy: study };
    expect(() =>
      toContent('en', documents([{ ...missions, missions: [mission] }]), () => ''),
    ).toThrow(/description of the "ovhcloud" case study \(en\) is empty/);
    const complete = { ...mission, caseStudy: { ...study, description: 'D' } };
    expect(() =>
      toContent('en', documents([{ ...missions, missions: [complete, { ...complete, id: 2 }] }]), () => ''),
    ).toThrow(/two missions have the "ovhcloud"/);
  });

  it('dates the home page from the latest document it shows, the legal notice from its own', () => {
    expect(toContent('fr', documents([domains]), () => '').meta.updatedAt).toBe('2026-02-01T00:00:00.000Z');
    const content = toContent('fr', documents([missions]), (m) => `/media/${m.filename}`);
    expect(content.meta.updatedAt).toBe('2026-03-01T00:00:00.000Z');
    expect(content.legal.updatedAt).toBe('2025-12-01T00:00:00.000Z');
  });

  it('rejects a kind of section used twice', () => {
    expect(() => toContent('en', documents([domains, domains]), () => '')).toThrow(/used twice/);
  });
});
