// Writes the content the site is built from: src/content/data/<lang>.json and the images
// they use in src/assets/media/ (both git-ignored).
//
//   node scripts/content.ts pull              from the Acolad backoffice at $PAYLOAD_URL (or $CMS_URL),
//                                             tenant $PAYLOAD_TENANT (default `acolad`)
//   node scripts/content.ts pull --fixtures   same, but into fixtures/ (refreshes the test data)
//   node scripts/content.ts fixture           copies fixtures/ (test data, no CMS needed)
//
// Needs Node 22.18+ (runs TypeScript directly).

import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { toContent, type CmsDocuments } from '../src/content/cms.ts';
import type { Lang } from '../src/content/types.ts';
import type { AcoladV2Media as Media } from '../src/content/payload-types.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const langs: Lang[] = ['fr', 'en'];
const fixtures = path.join(root, 'fixtures');
const site = { data: path.join(root, 'src/content/data'), media: path.join(root, 'src/assets/media') };

async function reset(dir: string) {
  await rm(dir, { recursive: true, force: true });
  await mkdir(dir, { recursive: true });
}

async function copyFixtures() {
  await reset(site.data);
  await reset(site.media);
  for (const lang of langs) await cp(path.join(fixtures, `${lang}.json`), path.join(site.data, `${lang}.json`));
  await cp(path.join(fixtures, 'media'), site.media, { recursive: true });
  console.log('Content copied from fixtures/');
}

async function pull(target: { data: string; media: string }) {
  const base = (process.env.PAYLOAD_URL || process.env.CMS_URL || 'http://localhost:3000').replace(/\/$/, '');
  const tenant = process.env.PAYLOAD_TENANT || 'acolad';

  async function get<T>(url: string): Promise<T> {
    const res = await fetch(`${base}${url}`);
    if (!res.ok) throw new Error(`GET ${base}${url}: HTTP ${res.status}`);
    return (await res.json()) as T;
  }

  // Images used by the content, by file name (shared by both locales).
  const media = new Map<string, string>();
  const mediaPath = (doc: Media) => {
    if (!doc.filename || !doc.url) throw new Error(`CMS: image ${doc.id} has no file`);
    media.set(doc.filename, doc.url);
    return `/media/${doc.filename}`;
  };

  const contents = await Promise.all(
    langs.map(async (lang) => {
      // The backoffice hosts several sites: this one's former globals are one document per tenant
      // in the `acolad-v2-*` collections. depth 3: home → mission → company → logo.
      const global = async <T>(slug: string) => {
        const where = `where[tenant.slug][equals]=${encodeURIComponent(tenant)}`;
        const { docs } = await get<{ docs: T[] }>(`/api/acolad-v2-${slug}?${where}&limit=1&locale=${lang}&depth=3`);
        if (!docs[0]) throw new Error(`CMS: tenant "${tenant}" has no acolad-v2-${slug} document`);
        return docs[0];
      };
      const docs: CmsDocuments = {
        site: await global('site'),
        home: await global('home'),
        legal: await global('legal'),
        notFound: await global('not-found'),
      };
      return [lang, toContent(lang, docs, mediaPath)] as const;
    }),
  );

  // Download everything before touching the target, so a failure leaves the previous content.
  const files = await Promise.all(
    [...media].map(async ([name, url]) => {
      // The backoffice answers with URLs on its public address: fetch the file where the content came from.
      const { pathname, search } = new URL(url, base);
      const res = await fetch(`${base}${pathname}${search}`);
      if (!res.ok) throw new Error(`GET ${url}: HTTP ${res.status}`);
      return [name, Buffer.from(await res.arrayBuffer())] as const;
    }),
  );

  await reset(target.data);
  await reset(target.media);
  for (const [lang, content] of contents) {
    await writeFile(path.join(target.data, `${lang}.json`), `${JSON.stringify(content, null, 2)}\n`);
  }
  for (const [name, data] of files) await writeFile(path.join(target.media, name), data);
  console.log(`Content pulled from ${base}: ${langs.join(', ')}, ${files.length} images`);
}

const [command, flag] = process.argv.slice(2);
if (command === 'fixture') {
  await copyFixtures();
} else if (command === 'pull') {
  if (flag === '--fixtures') {
    // fixtures/ holds <lang>.json at its root; reset() would wipe it, so write beside then move.
    const tmp = path.join(root, 'fixtures.tmp');
    await pull({ data: tmp, media: path.join(tmp, 'media') });
    await rm(fixtures, { recursive: true, force: true });
    await cp(tmp, fixtures, { recursive: true });
    await rm(tmp, { recursive: true, force: true });
  } else {
    await pull(site);
  }
} else {
  console.error('Usage: node scripts/content.ts pull [--fixtures] | fixture');
  process.exit(1);
}
