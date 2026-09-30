import type { CheckboxField, Field, NumberField, TextareaField, TextField } from 'payload'

type Overrides<T> = Partial<Omit<T, 'type' | 'name'>>

/** Admin labels come in both languages the admin panel supports. */
export const label = (en: string, fr: string) => ({ en, fr })

/** Localized single-line text (one value per site language). */
export const text = (
  name: string,
  en: string,
  fr: string,
  overrides: Overrides<TextField> = {},
): TextField =>
  ({ name, type: 'text', localized: true, label: label(en, fr), ...overrides }) as TextField

/** Localized multi-line text. */
export const textarea = (
  name: string,
  en: string,
  fr: string,
  overrides: Overrides<TextareaField> = {},
): TextareaField => ({ name, type: 'textarea', localized: true, label: label(en, fr), ...overrides })

/** Localized list of short strings (chips), edited as tags. */
export const chips = (name: string, en: string, fr: string): Field => ({
  name,
  type: 'text',
  hasMany: true,
  localized: true,
  label: label(en, fr),
})

/** Position among the other documents; lists are sorted by it. */
export const orderField: NumberField = {
  name: 'order',
  type: 'number',
  required: true,
  defaultValue: 0,
  label: label('Order', 'Ordre'),
  admin: {
    position: 'sidebar',
    description: label('Lowest first.', 'Le plus petit en premier.'),
  },
}

export const showOnHomeField: CheckboxField = {
  name: 'showOnHome',
  type: 'checkbox',
  defaultValue: true,
  label: label('Show on the home page', 'Afficher sur la page d’accueil'),
  admin: { position: 'sidebar' },
}

/** Title + description of a page, used for <title>, meta description and social cards. */
export const seoField: Field = {
  name: 'seo',
  type: 'group',
  label: label('SEO', 'SEO'),
  fields: [
    text('title', 'Title', 'Titre', { required: true }),
    textarea('description', 'Meta description', 'Meta description', { required: true }),
  ],
}
