import type { GlobalConfig } from 'payload'

import { publicRead } from '../access/public'
import { sectionBlocks } from '../blocks/sections'
import { chips, image, label, text, textarea } from '../fields/helpers'

export const Home: GlobalConfig = {
  slug: 'home',
  label: label('Home page', 'Page d’accueil'),
  access: { read: publicRead },
  admin: { group: label('Pages', 'Pages') },
  versions: { max: 50 },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'hero',
          label: label('Hero', 'En-tête'),
          fields: [
            { name: 'name', type: 'text', required: true, label: label('Name', 'Nom') },
            text('title', 'Job title', 'Titre', { required: true }),
            text('leadStrong', 'Lead, bold start', 'Accroche, début en gras', { required: true }),
            textarea('lead', 'Lead', 'Accroche', { required: true }),
            chips('info', 'Facts', 'Infos'),
            text('cta', 'Button', 'Bouton', { required: true, admin: { description: label('Links to the contact section.', 'Mène à la section contact.') } }),
            image('portrait', 'Portrait', 'Portrait', { required: true }),
          ],
        },
        {
          label: label('Sections', 'Sections'),
          description: label(
            'The sections of the page, in order. Each kind can be used once.',
            'Les sections de la page, dans l’ordre. Chaque type ne peut être utilisé qu’une fois.',
          ),
          fields: [
            {
              name: 'sections',
              type: 'blocks',
              label: label('Sections', 'Sections'),
              blocks: sectionBlocks,
              validate: (value: unknown) => {
                const kinds = ((value as { blockType: string }[] | null) ?? []).map((b) => b.blockType)
                const twice = kinds.find((kind, i) => kinds.indexOf(kind) !== i)
                return twice
                  ? `“${twice}”: each kind of section can only be used once (its anchor must be unique).`
                  : true
              },
            },
          ],
        },
      ],
    },
  ],
}
