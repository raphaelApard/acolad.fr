import type { Block, Field } from 'payload'

import { label, text, textarea } from '../fields/helpers'

/** Button whose link is either an in-page anchor (#contact) or a path. */
const cta = (name: string, en: string, fr: string): Field => ({
  name,
  type: 'group',
  label: label(en, fr),
  fields: [
    text('label', 'Text', 'Texte', { required: true }),
    {
      name: 'href',
      type: 'text',
      required: true,
      label: label('Link', 'Lien'),
      admin: {
        description: label(
          'An in-page anchor such as #contact, or a path such as /services/.',
          'Une ancre dans la page comme #contact, ou un chemin comme /services/.',
        ),
      },
    },
  ],
})

export const Hero: Block = {
  slug: 'hero',
  labels: { singular: label('Hero', 'Bandeau d’accueil'), plural: label('Heroes', 'Bandeaux d’accueil') },
  fields: [
    text('title', 'Title (h1)', 'Titre (h1)', { required: true }),
    textarea('subtitle', 'Introduction', 'Introduction', { required: true }),
    cta('primaryCta', 'Main button', 'Bouton principal'),
    cta('secondaryCta', 'Secondary button', 'Bouton secondaire'),
    {
      name: 'aside',
      type: 'array',
      label: label('Side lines', 'Lignes latérales'),
      fields: [text('text', 'Line', 'Ligne', { required: true })],
    },
  ],
}
