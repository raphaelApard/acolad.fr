/**
 * One document of seed content.
 * `shared` holds the fields common to both languages (order, urls, ids…), `fr` and `en` the localized ones.
 * The seed writes `{ ...shared, ...fr }` in French, then `{ ...shared, ...en }` in English.
 */
export type SeedDoc = {
  shared: Record<string, unknown>
  fr: Record<string, unknown>
  en: Record<string, unknown>
}
