import type { ArrayField, Field, RelationshipField, TextareaField, TextField, UploadField } from 'payload'

type Overrides<T> = Partial<Omit<T, 'type' | 'name'>>

/** Admin labels come in both languages the admin panel supports. */
export const label = (en: string, fr: string) => ({ en, fr })

/** Localized single-line text (one value per site language). */
export const text = (name: string, en: string, fr: string, overrides: Overrides<TextField> = {}): TextField =>
  ({ name, type: 'text', localized: true, label: label(en, fr), ...overrides }) as TextField

/** Localized multi-line text. */
export const textarea = (
  name: string,
  en: string,
  fr: string,
  overrides: Overrides<TextareaField> = {},
): TextareaField => ({ name, type: 'textarea', localized: true, label: label(en, fr), ...overrides })

/** List of short strings (chips), edited as tags. Localized unless told otherwise. */
export const chips = (name: string, en: string, fr: string, { localized = true } = {}): Field => ({
  name,
  type: 'text',
  hasMany: true,
  localized,
  label: label(en, fr),
})

/** Localized list of paragraphs or sentences, one row each. */
export const lines = (name: string, en: string, fr: string, overrides: Overrides<ArrayField> = {}): ArrayField =>
  ({
    name,
    type: 'array',
    localized: true,
    label: label(en, fr),
    labels: { singular: label('Line', 'Ligne'), plural: label('Lines', 'Lignes') },
    fields: [{ name: 'text', type: 'textarea', required: true, label: label('Text', 'Texte') }],
    ...overrides,
  }) as ArrayField

export const image = (name: string, en: string, fr: string, overrides: Overrides<UploadField> = {}): UploadField =>
  ({ name, type: 'upload', relationTo: 'media', label: label(en, fr), ...overrides }) as UploadField

/** Ordered pick of documents from a collection: the site shows them in this order. */
export const pick = (
  name: string,
  relationTo: RelationshipField['relationTo'],
  en: string,
  fr: string,
): RelationshipField =>
  ({
    name,
    type: 'relationship',
    relationTo,
    hasMany: true,
    label: label(en, fr),
    admin: {
      description: label('Shown in this order; drag to reorder.', 'Affichés dans cet ordre ; glisser pour réordonner.'),
    },
  }) as RelationshipField

/** Menu entry of a section: left empty, the section is not in the menu. */
export const navLabel: TextField = text('navLabel', 'Menu label', 'Libellé du menu', {
  admin: {
    description: label(
      'Leave empty to keep this section out of the menu.',
      'Laisser vide pour ne pas afficher cette section dans le menu.',
    ),
  },
})

/** Heading and the name shown for a company, when it differs from the company record. */
export const displayName: TextField = text('displayName', 'Displayed name', 'Nom affiché', {
  admin: {
    description: label(
      'Optional: replaces the company name for this entry.',
      'Facultatif : remplace le nom de l’entreprise pour cette entrée.',
    ),
  },
})

export const place: TextField = text('place', 'Place', 'Lieu', {
  admin: { description: label('A city, or the agency, e.g. “via OWS”.', 'Une ville, ou l’agence, ex. « via OWS ».') },
})

export const period: TextField = text('period', 'Period', 'Période', {
  required: true,
  admin: { description: label('e.g. “2020 – 2021”.', 'ex. « 2020 – 2021 ».') },
})

/**
 * Hidden title for admin lists, rebuilt on save from the company name (or the displayed name),
 * prefixed by the period when the entry has one.
 */
export const listTitle: TextField = {
  name: 'title',
  type: 'text',
  localized: true,
  admin: { hidden: true },
  hooks: {
    beforeChange: [
      async ({ data, req }) => {
        let name = data?.displayName
        if (!name && data?.company) {
          const id = typeof data.company === 'object' ? data.company.id : data.company
          const company = await req.payload.findByID({ collection: 'companies', id, depth: 0, locale: req.locale ?? undefined, req })
          name = company?.name
        }
        return [data?.period, name].filter(Boolean).join(' · ')
      },
    ],
  },
}
