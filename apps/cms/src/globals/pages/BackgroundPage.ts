import { closingCtaField, label, pageHeadField, text, textarea } from '../../fields/helpers'
import { pageGlobal } from './pageGlobal'

export const BackgroundPage = pageGlobal('background-page', 'Background page', 'Page parcours', [
  pageHeadField,
  text('experienceTitle', 'Experience heading', 'Titre de l’expérience', { required: true }),
  text('stackTitle', 'Stack heading', 'Titre de la stack', { required: true }),
  text('principlesTitle', 'Working principles heading', 'Titre des principes de travail', {
    required: true,
  }),
  {
    name: 'principles',
    type: 'array',
    label: label('Working principles', 'Principes de travail'),
    fields: [
      text('title', 'Title', 'Titre', { required: true }),
      textarea('description', 'Description', 'Description', { required: true }),
    ],
  },
  closingCtaField,
])
