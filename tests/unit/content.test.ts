import { existsSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import fr from '../../src/content/fr.json';
import en from '../../src/content/en.json';

// Replace every leaf value by its type so only the structure is compared.
function shape(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(shape);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, shape(v)]));
  }
  return value === null ? 'null' : typeof value;
}

function imageSources(content: typeof fr): string[] {
  return [
    content.hero.portrait.src,
    ...content.clients.logos.map((l) => l.src),
    ...content.missions.items.flatMap((m) => (m.image ? [m.image.src] : [])),
    ...content.otherProjects.items.flatMap((o) => (o.image ? [o.image.src] : [])),
  ];
}

describe('content files', () => {
  it('share the same structure in every locale', () => {
    expect(shape(en)).toEqual(shape(fr));
  });

  it('keep the same anchors in every locale', () => {
    expect(en.nav.map((n) => n.id)).toEqual(fr.nav.map((n) => n.id));
  });

  it('declare their own locale', () => {
    expect(fr.meta.lang).toBe('fr');
    expect(en.meta.lang).toBe('en');
  });

  it.each([
    ['fr', fr],
    ['en', en],
  ])('only reference images that exist (%s)', (_, content) => {
    for (const src of imageSources(content)) {
      expect(existsSync(`src/assets${src}`), src).toBe(true);
    }
  });
});
