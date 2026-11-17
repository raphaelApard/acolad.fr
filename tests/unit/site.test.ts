import { describe, expect, it } from 'vitest';
import { alternates, getSite, href, langs, pageIds, routeParam, serviceIds } from '../../src/site';
import { serviceGraph } from '../../src/site/jsonld';
import { linkedPages, rich } from '../../src/site/rich';

const fr = getSite('fr');
const en = getSite('en');

// Replace every leaf value by its type so only the structure is compared.
function shape(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(shape);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, shape(v)]));
  }
  return typeof value;
}

function strings(value: unknown): string[] {
  if (typeof value === 'string') return [value];
  if (value && typeof value === 'object') return Object.values(value).flatMap(strings);
  return [];
}

describe('site content (src/site)', () => {
  it('shares the same structure in every locale', () => {
    expect(shape(en)).toEqual(shape(fr));
  });

  it('declares its own locale', () => {
    expect(fr.lang).toBe('fr');
    expect(en.lang).toBe('en');
  });

  it('mutes words the home h1 actually starts with', () => {
    for (const site of [fr, en]) {
      expect(site.home.h1.startsWith(site.home.h1Muted)).toBe(true);
    }
  });

  it('numbers the services in their order', () => {
    for (const site of [fr, en]) {
      expect(serviceIds.map((id) => site.services[id].number)).toEqual(['01', '02', '03', '04', '05', '06']);
    }
  });

  it.each([
    ['fr', fr],
    ['en', en],
  ])('only links to pages that exist (%s)', (_, site) => {
    for (const text of strings(site)) {
      for (const page of linkedPages(text)) expect(pageIds, text).toContain(page);
    }
  });

  it('keeps the same links and placeholders in every locale', () => {
    const marks = (site: unknown) =>
      strings(site).map((text) => [linkedPages(text), (text.match(/\[[^\]\p{Ll}]*\](?!\()/gu) ?? []).length]);
    // All-caps placeholders are counted, not compared: they are translated.
    expect(marks(en)).toEqual(marks(fr));
  });

  // The company is one person: the copy speaks neither of a team nor in the first person plural.
  it('never says "we" for the company', () => {
    for (const text of strings(fr)) expect(text).not.toMatch(/\b(nous|notre|nos)\b/i);
    for (const text of strings(en)) expect(text).not.toMatch(/\b(we|our|us)\b/i);
  });
});

describe('routes', () => {
  it('serves French at the root and English under /en/', () => {
    expect(href('home', 'fr')).toBe('/');
    expect(href('home', 'en')).toBe('/en/');
    expect(routeParam('home', 'fr')).toBeUndefined();
    expect(href('tma', 'fr')).toBe('/tma/');
    expect(href('tma', 'en')).toBe('/en/application-maintenance/');
  });

  it('keeps the addresses of the former legal pages and case study', () => {
    expect(alternates('legal')).toEqual({ fr: '/mentions-legales/', en: '/en/legal-notice/' });
    expect(alternates('caseStudy')).toEqual({ fr: '/missions/ovhcloud/', en: '/en/missions/ovhcloud/' });
  });

  it('gives every page its own address', () => {
    const all = langs.flatMap((lang) => pageIds.map((id) => href(id, lang)));
    expect(new Set(all).size).toBe(all.length);
  });
});

describe('rich text', () => {
  it('links pages in the locale of the text', () => {
    expect(rich('Voir la [TMA](page:tma).', 'fr')).toBe('Voir la <a href="/tma/">TMA</a>.');
    expect(rich('See [maintenance](page:tma).', 'en')).toBe('See <a href="/en/application-maintenance/">maintenance</a>.');
  });

  it('renders external links, strong and code spans', () => {
    expect(rich('**A** `b` [c](https://example.org) [d](mailto:a@b.fr)', 'fr')).toBe(
      '<strong>A</strong> <code>b</code> <a href="https://example.org">c</a> <a href="mailto:a@b.fr">d</a>',
    );
  });

  it('escapes markup and leaves placeholders alone', () => {
    expect(rich('<b>x</b> & [PRIX]', 'fr')).toBe('&lt;b&gt;x&lt;/b&gt; &amp; [PRIX]');
  });

  it('refuses a link to an unknown page', () => {
    expect(() => rich('[x](page:nowhere)', 'fr')).toThrow(/nowhere/);
  });
});

describe('structured data', () => {
  it('leaves placeholder answers and link syntax out of the FAQ', () => {
    for (const id of serviceIds) {
      const [, faq] = (serviceGraph(fr, id, new URL('https://www.acolad.fr')) as { '@graph': { mainEntity?: unknown[] }[] })['@graph'];
      const text = JSON.stringify(faq);
      expect(text).not.toMatch(/\]\(page:/);
      expect(text).not.toMatch(/\[[^\]\p{Ll}"]*\]/u);
      expect(faq!.mainEntity!.length).toBeGreaterThan(0);
    }
  });
});
