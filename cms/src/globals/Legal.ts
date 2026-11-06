import type { GlobalConfig } from 'payload'

import { publicRead } from '../access/public'
import { label, text, textarea } from '../fields/helpers'

export const Legal: GlobalConfig = {
  slug: 'legal',
  label: label('Legal notice', 'Mentions légales'),
  access: { read: publicRead },
  admin: { group: label('Pages', 'Pages') },
  versions: { max: 50 },
  fields: [
    text('linkLabel', 'Footer link', 'Lien du pied de page', { required: true }),
    text('title', 'Title', 'Titre', { required: true }),
    textarea('description', 'Meta description', 'Meta description', { required: true }),
    text('updated', 'Last update line', 'Ligne « Dernière mise à jour »', { required: true }),
    {
      name: 'sections',
      type: 'array',
      localized: true,
      label: label('Sections', 'Sections'),
      admin: { components: { RowLabel: '/fields/RowLabel#TitleRowLabel' } },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'title', type: 'text', required: true, label: label('Heading', 'Titre') },
            {
              name: 'anchor',
              type: 'text',
              required: true,
              label: label('Anchor', 'Ancre'),
              admin: { description: label('Lowercase, dashes, e.g. “personal-data”.', 'Minuscules et tirets, ex. « donnees-personnelles ».') },
              validate: (value: unknown) =>
                typeof value === 'string' && /^[a-z0-9]+(-[a-z0-9]+)*$/.test(value) ? true : 'Lowercase letters, digits and dashes only.',
            },
          ],
        },
        {
          name: 'paragraphs',
          type: 'array',
          label: label('Paragraphs', 'Paragraphes'),
          minRows: 1,
          fields: [
            {
              name: 'html',
              type: 'textarea',
              required: true,
              label: label('Paragraph', 'Paragraphe'),
              admin: {
                description: label(
                  'HTML allowed: <a href="…">, <strong>, <code>.',
                  'HTML autorisé : <a href="…">, <strong>, <code>.',
                ),
              },
            },
          ],
        },
      ],
    },
    {
      name: 'optOut',
      type: 'group',
      label: label('Matomo opt-out (end of the cookies section)', 'Refus Matomo (fin de la section cookies)'),
      fields: [
        text('label', 'Checkbox', 'Case à cocher', { required: true }),
        text('on', 'When measured', 'Si mesuré', { required: true }),
        text('off', 'When refused', 'Si refusé', { required: true }),
        textarea('unavailable', 'When the tracker is blocked', 'Si le traceur est bloqué', { required: true }),
      ],
    },
  ],
}
