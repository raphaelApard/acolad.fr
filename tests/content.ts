// The test data (fixtures/), which `pnpm content:fixture` copies before the e2e build.
import frJson from '../fixtures/fr.json' with { type: 'json' };
import enJson from '../fixtures/en.json' with { type: 'json' };
import { findSection, type Content, type Section, type SectionType } from '../src/content/types';

export const fr = frJson as unknown as Content;
export const en = enJson as unknown as Content;

/** A section the fixtures are known to contain. */
export function section<T extends SectionType>(content: Content, type: T): Extract<Section, { type: T }> {
  const found = findSection(content, type);
  if (!found) throw new Error(`fixtures/${content.meta.lang}.json has no "${type}" section`);
  return found;
}
