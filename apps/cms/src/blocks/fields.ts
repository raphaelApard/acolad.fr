import type { Field } from 'payload'

import { label, text } from '../fields/helpers'

const isSummary = (_data: unknown, siblingData: { variant?: string }) => siblingData?.variant === 'summary'

/** Shows a field only when the block is displayed as a home-page style summary. */
export const whenSummary = (field: Field): Field =>
  ({ ...field, admin: { ...('admin' in field ? field.admin : {}), condition: isSummary } }) as Field

/** Link to another page of the site, with the text of the link. */
const seeAll: Field = {
  name: 'seeAll',
  type: 'group',
  label: label('“See all” link', 'Lien « Voir tout »'),
  fields: [
    text('label', 'Text', 'Texte', { required: true }),
    {
      name: 'page',
      type: 'relationship',
      relationTo: 'pages',
      required: true,
      label: label('Page', 'Page'),
    },
  ],
}

/** Fields of a section that introduces itself with a numbered heading and links to a full page. */
export const sectionFields = (): Field[] => [
    {
      name: 'anchor',
      type: 'text',
      required: true,
      label: label('Section id', 'Identifiant de la section'),
      admin: {
        description: label(
          'Target of in-page links, e.g. the mobile menu of the home page. Lowercase letters only.',
          'Cible des liens dans la page, par ex. le menu mobile de l’accueil. Lettres minuscules uniquement.',
        ),
      },
    } as Field,
    {
      name: 'number',
      type: 'text',
      label: label('Section number', 'Numéro de section'),
      admin: {
        description: label('Shown before the heading, e.g. “01”.', 'Affiché avant le titre, ex. « 01 ».'),
      },
    } as Field,
    text('label', 'Heading', 'Titre', { required: true }),
    seeAll,
  ]

/** The same fields, shown only when the block uses its `summary` layout. */
export const summaryFields = (): Field[] => sectionFields().map(whenSummary)

/** Layout choice of a block that can be shown in several ways. */
export const variantField = (options: { value: string; en: string; fr: string }[], defaultValue: string): Field => ({
  name: 'variant',
  type: 'select',
  required: true,
  defaultValue,
  label: label('Layout', 'Présentation'),
  options: options.map(({ value, en, fr }) => ({ value, label: label(en, fr) })),
})
