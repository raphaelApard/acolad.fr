import type { Lang } from './routes';

// Release and end-of-life dates of the Drupal major versions, drawn as a timeline on the Drupal
// maintenance page (VersionTimeline.astro). Source: the Drupal core release schedule.
// The status of each version is worked out on the day the site is built, so a new build is enough
// to keep it right; only a new or moved date needs an edit here.

/** How precise a date is: a day, the week that starts on it, or the first days of its month. */
export type Precision = 'day' | 'week' | 'earlyMonth';

export interface DateRef {
  /** yyyy-mm-dd */
  date: string;
  precision: Precision;
}

export interface MajorVersion {
  name: string;
  released: DateRef;
  /** End of security support; none while drupal.org has not announced it. */
  end?: DateRef;
}

export type VersionStatus = 'ended' | 'endingSoon' | 'supported' | 'current' | 'upcoming';

const day = (date: string): DateRef => ({ date, precision: 'day' });

const versions: MajorVersion[] = [
  { name: 'Drupal 7', released: day('2011-01-05'), end: day('2025-01-05') },
  { name: 'Drupal 8', released: day('2015-11-19'), end: day('2021-11-17') },
  { name: 'Drupal 9', released: day('2020-06-03'), end: day('2023-11-01') },
  { name: 'Drupal 10', released: day('2022-12-15'), end: day('2026-12-09') },
  { name: 'Drupal 11', released: day('2024-08-02'), end: { date: '2028-12-01', precision: 'earlyMonth' } },
  { name: 'Drupal 12', released: { date: '2026-12-07', precision: 'week' } },
];

export const drupalTimeline = {
  /** Day the dates were last checked against the Drupal core release schedule. */
  checked: '2026-11-18',
  /** First and last year of the axis; older releases start at its left edge. */
  firstYear: 2021,
  lastYear: 2030,
  versions,
};

/** A version whose support ends within this many days is flagged as ending soon. */
const soonDays = 183;

const time = (ref: DateRef | string) => Date.parse(`${typeof ref === 'string' ? ref : ref.date}T00:00:00Z`);

export function versionStatus(version: MajorVersion, today: Date): VersionStatus {
  const now = today.getTime();
  if (time(version.released) > now) return 'upcoming';
  if (!version.end) return 'current';
  const end = time(version.end);
  if (end <= now) return 'ended';
  return end - now < soonDays * 86_400_000 ? 'endingSoon' : 'supported';
}

/** Where a date falls on the axis, from 0 (1 January of the first year) to 1 (end of the last year). */
export function axisPosition(date: DateRef | string | Date): number {
  const start = Date.UTC(drupalTimeline.firstYear, 0, 1);
  const end = Date.UTC(drupalTimeline.lastYear + 1, 0, 1);
  const t = date instanceof Date ? date.getTime() : time(date);
  return Math.min(1, Math.max(0, (t - start) / (end - start)));
}

const locales: Record<Lang, string> = { fr: 'fr-FR', en: 'en-GB' };

/**
 * A date in words: "5 janvier 2025" / "5 January 2025", or "décembre 2028" / "December 2028" for
 * the first days of a month. `patterns` wraps it for its precision ("le {date}", "early {date}"…).
 */
export function formatDate(ref: DateRef | string, lang: Lang, patterns: Record<Precision, string>): string {
  const { date, precision } = typeof ref === 'string' ? day(ref) : ref;
  const d = new Date(time(date));
  const monthYear = new Intl.DateTimeFormat(locales[lang], { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(d);
  const dayOfMonth = d.getUTCDate();
  // French writes the first day of a month as an ordinal: "1er novembre".
  const ordinal = lang === 'fr' && dayOfMonth === 1 ? '1er' : String(dayOfMonth);
  return patterns[precision].replace('{date}', precision === 'earlyMonth' ? monthYear : `${ordinal} ${monthYear}`);
}

/** The day the page was built, short and on French time: "18 nov. 2026" / "18 Nov 2026". */
export function shortDate(date: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(locales[lang], { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Europe/Paris' }).format(date);
}

/** A status line with its date; French contracts "à le" into "au" ("jusqu'au 9 décembre"). */
export function statusLine(template: string, date: string, lang: Lang): string {
  const line = template.replace('{date}', date);
  return lang === 'fr' ? line.replace(/(^|[\s'’])à le /g, '$1au ') : line;
}
