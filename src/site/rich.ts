import { href, pageIds, type Lang, type PageId } from './routes';

// The small inline syntax of "rich" content strings (see types.ts), turned into HTML:
//   [label](page:tma)  [label](https://…)  [label](mailto:…)  **strong**  `code`
// Everything else is escaped, so content can never inject markup.

const escapeHtml = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const LINK = /\[([^\]]+)\]\(((?:page:|https:\/\/|mailto:)[^)\s]+)\)/g;

/** The pages a rich string links to, for the content tests. */
export function linkedPages(text: string): string[] {
  return [...text.matchAll(LINK)].map(([, , target]) => target!).flatMap((t) => (t.startsWith('page:') ? [t.slice(5)] : []));
}

function resolve(target: string, lang: Lang): string {
  if (!target.startsWith('page:')) return target;
  const id = target.slice(5);
  if (!(pageIds as string[]).includes(id)) throw new Error(`Unknown page "${id}" in a content link`);
  return href(id as PageId, lang);
}

export function rich(text: string, lang: Lang): string {
  return escapeHtml(text)
    .replace(LINK, (_, label: string, target: string) => `<a href="${resolve(target, lang)}">${label}</a>`)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');
}
