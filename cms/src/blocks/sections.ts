import type { Block, Field } from 'payload'

import { chips, label, lines, navLabel, pick, text } from '../fields/helpers'

// One block per home page section. Each kind is used at most once (its anchor is fixed in the
// site's component); numbered sections ("01", "02"…) are numbered in their order on the page.

const title = text('title', 'Title', 'Titre', { required: true })

export const DomainsBlock: Block = {
  slug: 'domains',
  interfaceName: 'DomainsBlock',
  labels: { singular: label('Expertise', 'Domaines d’intervention'), plural: label('Expertise', 'Domaines d’intervention') },
  fields: [navLabel, title, lines('items', 'Items', 'Éléments', { minRows: 1 })],
}

export const AiBlock: Block = {
  slug: 'ai',
  interfaceName: 'AiBlock',
  labels: { singular: label('AI band', 'Bande IA'), plural: label('AI bands', 'Bandes IA') },
  fields: [navLabel, title, lines('paragraphs', 'Paragraphs', 'Paragraphes', { minRows: 1 }), chips('tags', 'Tags', 'Étiquettes')],
}

export const ClientsBlock: Block = {
  slug: 'clients',
  interfaceName: 'ClientsBlock',
  labels: { singular: label('Client logos', 'Logos clients'), plural: label('Client logos', 'Logos clients') },
  fields: [
    title,
    {
      ...pick('companies', 'companies', 'Logos', 'Logos'),
      filterOptions: { logo: { exists: true } },
    },
  ],
}

export const SkillsBlock: Block = {
  slug: 'skills',
  interfaceName: 'SkillsBlock',
  labels: { singular: label('Skills', 'Compétences'), plural: label('Skills', 'Compétences') },
  fields: [
    navLabel,
    title,
    {
      type: 'row',
      fields: [
        text('expandLabel', '“Show all” button', 'Bouton « Afficher tout »', { required: true }),
        text('collapseLabel', '“Collapse” button', 'Bouton « Réduire »', { required: true }),
      ],
    },
    {
      name: 'groups',
      type: 'array',
      localized: true,
      minRows: 1,
      label: label('Groups', 'Groupes'),
      labels: { singular: label('Group', 'Groupe'), plural: label('Groups', 'Groupes') },
      admin: { initCollapsed: true, components: { RowLabel: '/fields/RowLabel#TitleRowLabel' } },
      fields: [
        { name: 'title', type: 'text', required: true, label: label('Title', 'Titre') },
        chips('items', 'Skills', 'Compétences', { localized: false }),
      ],
    },
  ],
}

export const MissionsBlock: Block = {
  slug: 'missions',
  interfaceName: 'MissionsBlock',
  labels: { singular: label('Missions', 'Missions'), plural: label('Missions', 'Missions') },
  fields: [
    navLabel,
    title,
    {
      type: 'row',
      fields: [
        text('company', 'Company', 'Société', { required: true }),
        text('since', 'Since', 'Depuis', { required: true, admin: { description: label('e.g. “freelance since Oct. 2014”.', 'ex. « freelance depuis oct. 2014 ».') } }),
      ],
    },
    {
      type: 'row',
      fields: [
        text('achievementsLabel', '“Achievements” heading', 'Intitulé « Réalisations »', { required: true }),
        text('stackLabel', '“Tech stack” heading', 'Intitulé « Stack technique »', { required: true }),
      ],
    },
    pick('missions', 'missions', 'Missions', 'Missions'),
    {
      name: 'otherProjects',
      type: 'group',
      label: label('Other projects', 'Autres projets'),
      fields: [title, pick('projects', 'projects', 'Projects', 'Projets')],
    },
  ],
}

export const ExperienceBlock: Block = {
  slug: 'experience',
  interfaceName: 'ExperienceBlock',
  labels: { singular: label('Other experience', 'Autres expériences'), plural: label('Other experience', 'Autres expériences') },
  fields: [navLabel, title, pick('experiences', 'experiences', 'Experience', 'Expériences')],
}

const listGroup = (name: string, en: string, fr: string, itemFields: Field[]): Field => ({
  name,
  type: 'group',
  label: label(en, fr),
  fields: [
    title,
    {
      name: 'items',
      type: 'array',
      localized: true,
      label: label('Items', 'Éléments'),
      admin: { components: { RowLabel: '/fields/RowLabel#NameRowLabel' } },
      fields: itemFields,
    },
  ],
})

export const CredentialsBlock: Block = {
  slug: 'credentials',
  interfaceName: 'CredentialsBlock',
  labels: {
    singular: label('Certifications, education, languages', 'Certifications, formation, langues'),
    plural: label('Certifications, education, languages', 'Certifications, formation, langues'),
  },
  fields: [
    navLabel,
    title,
    text('verifyLabel', '“Verify” link', 'Lien « vérifier »', { required: true }),
    listGroup('certifications', 'Certifications', 'Certifications', [
      { name: 'name', type: 'text', required: true, label: label('Name', 'Nom') },
      {
        type: 'row',
        fields: [
          { name: 'year', type: 'text', required: true, label: label('Year', 'Année') },
          { name: 'verifyUrl', type: 'text', label: label('Verification URL', 'URL de vérification') },
        ],
      },
    ]),
    listGroup('education', 'Education', 'Formation', [
      { name: 'name', type: 'text', required: true, label: label('Diploma', 'Diplôme') },
      {
        type: 'row',
        fields: [
          { name: 'school', type: 'text', required: true, label: label('School', 'École') },
          { name: 'period', type: 'text', required: true, label: label('Period', 'Période') },
        ],
      },
    ]),
    listGroup('languages', 'Languages', 'Langues', [
      {
        type: 'row',
        fields: [
          { name: 'name', type: 'text', required: true, label: label('Language', 'Langue') },
          { name: 'level', type: 'text', required: true, label: label('Level', 'Niveau') },
        ],
      },
    ]),
  ],
}

export const sectionBlocks: Block[] = [
  DomainsBlock,
  AiBlock,
  ClientsBlock,
  SkillsBlock,
  MissionsBlock,
  ExperienceBlock,
  CredentialsBlock,
]
