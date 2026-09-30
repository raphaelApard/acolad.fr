import type { GlobalConfig } from 'payload'

import { publicRead } from '../access/public'
import { chips, label, text } from '../fields/helpers'

export const Site: GlobalConfig = {
  slug: 'site',
  label: label('Site settings', 'Réglages du site'),
  access: { read: publicRead },
  admin: { group: label('Site', 'Site') },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: label('Identity', 'Identité'),
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              label: label('Name', 'Nom'),
            },
            {
              name: 'businessName',
              type: 'text',
              required: true,
              label: label('Business name', 'Nom de l’entreprise'),
            },
            text('jobTitle', 'Job title', 'Intitulé', { required: true }),
            {
              name: 'copyrightHolder',
              type: 'text',
              required: true,
              label: label('Copyright holder', 'Titulaire du copyright'),
              admin: {
                description: label(
                  'Shown after “© <year>” in the footer; the year is added at build time.',
                  'Affiché après « © <année> » en pied de page ; l’année est ajoutée à la génération du site.',
                ),
              },
            },
          ],
        },
        {
          label: label('Contact', 'Contact'),
          fields: [
            {
              name: 'email',
              type: 'email',
              required: true,
              label: label('Email address', 'Adresse e-mail'),
              admin: {
                description: label(
                  'Used by the mailto: links, the structured data and the contact form fallback.',
                  'Utilisée par les liens mailto:, les données structurées et le repli du formulaire.',
                ),
              },
            },
            text('location', 'Location', 'Localisation', { required: true }),
            text('availability', 'Availability', 'Disponibilité'),
            text('languages', 'Languages spoken', 'Langues parlées'),
            {
              name: 'address',
              type: 'group',
              label: label('Postal address (structured data)', 'Adresse postale (données structurées)'),
              fields: [
                { name: 'locality', type: 'text', required: true, label: label('City', 'Ville') },
                { name: 'region', type: 'text', label: label('Region', 'Région') },
                { name: 'country', type: 'text', required: true, label: label('Country code', 'Code pays') },
              ],
            },
            {
              name: 'socials',
              type: 'array',
              label: label('Profiles', 'Profils'),
              fields: [
                text('label', 'Label', 'Libellé', { localized: false, required: true }),
                { name: 'url', type: 'text', required: true, label: label('URL', 'URL') },
              ],
            },
          ],
        },
        {
          label: label('Search engines', 'Référencement'),
          fields: [
            {
              name: 'knowsAbout',
              type: 'text',
              hasMany: true,
              label: label('Expertise keywords', 'Mots-clés d’expertise'),
              admin: {
                description: label(
                  'Structured data (schema.org knowsAbout).',
                  'Données structurées (schema.org knowsAbout).',
                ),
              },
            },
            text('ogImagePath', 'Social card image path', 'Chemin de l’image de partage', {
              required: true,
              admin: {
                description: label(
                  'File served by the site, e.g. /assets/og-fr.png (1200×630).',
                  'Fichier servi par le site, ex. /assets/og-fr.png (1200×630).',
                ),
              },
            }),
            text('ogImageAlt', 'Social card image description', 'Description de l’image de partage'),
          ],
        },
      ],
    },
  ],
}
