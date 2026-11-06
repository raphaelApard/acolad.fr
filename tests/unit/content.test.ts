import { existsSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { en, fr } from '../content';
import { sectionAnchors, type Content } from '../../src/content/types';

// Replace every leaf value by its type so only the structure is compared.
function shape(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(shape);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, shape(v)]));
  }
  return value === null ? 'null' : typeof value;
}

function imageSources(content: Content): string[] {
  return [
    content.hero.portrait.src,
    content.notFound.image.src,
    ...content.sections.flatMap((s) => {
      switch (s.type) {
        case 'clients':
          return s.logos.map((l) => l.src);
        case 'missions':
          return [
            ...s.items.flatMap((m) => [m.logo, m.image?.src]),
            ...s.otherProjects.items.map((o) => o.image?.src),
          ].filter((src): src is string => Boolean(src));
        case 'experience':
          return s.items.flatMap((e) => (e.logo ? [e.logo] : []));
        default:
          return [];
      }
    }),
  ];
}

describe('test content (fixtures/)', () => {
  it('shares the same structure in every locale', () => {
    expect(shape(en)).toEqual(shape(fr));
  });

  it('keeps the same sections and anchors in every locale', () => {
    expect(en.sections.map((s) => s.type)).toEqual(fr.sections.map((s) => s.type));
    expect(en.nav.map((n) => n.id)).toEqual(fr.nav.map((n) => n.id));
  });

  it('only links the menu to sections on the page, or to the footer', () => {
    const anchors = [...fr.sections.map((s) => sectionAnchors[s.type]), 'contact'];
    for (const item of fr.nav) expect(anchors).toContain(item.id);
  });

  it('declares its own locale', () => {
    expect(fr.meta.lang).toBe('fr');
    expect(en.meta.lang).toBe('en');
  });

  it.each([
    ['fr', fr],
    ['en', en],
  ])('only references images that exist (%s)', (_, content) => {
    for (const src of imageSources(content)) {
      expect(existsSync(`fixtures${src}`), src).toBe(true);
    }
  });
});
