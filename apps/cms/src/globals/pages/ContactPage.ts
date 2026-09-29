import { label, pageHeadField, text, textarea } from '../../fields/helpers'
import { pageGlobal } from './pageGlobal'

const req = { required: true } as const

export const ContactPage = pageGlobal('contact-page', 'Contact page', 'Page contact', [
  pageHeadField,
  text('formTitle', 'Form section heading', 'Titre de la section formulaire', req),
  {
    name: 'form',
    type: 'group',
    label: label('Contact form', 'Formulaire de contact'),
    fields: [
      text('emailLabel', 'Email field label', 'Libellé du champ e-mail', req),
      text('messageLabel', 'Message field label', 'Libellé du champ message', req),
      text('messagePlaceholder', 'Message placeholder', 'Texte indicatif du message', req),
      text('submitLabel', 'Submit button', 'Bouton d’envoi', req),
      text('privacyNote', 'Privacy note', 'Note de confidentialité', req),
      text('subjectPrefix', 'Email subject prefix', 'Préfixe de l’objet du mail', {
        required: true,
        admin: {
          description: label(
            'Start of the subject when the visitor’s mail client is used as a fallback.',
            'Début de l’objet quand le client mail du visiteur sert de repli.',
          ),
        },
      }),
      text('sentTitle', 'Confirmation title', 'Titre de la confirmation', req),
      text('sentText', 'Confirmation text', 'Texte de la confirmation', req),
      text('errorText', 'Error text', 'Texte d’erreur', req),
    ],
  },
  text('reachTitle', 'Contact section heading', 'Titre de la section contact', req),
  {
    name: 'reach',
    type: 'group',
    label: label('Contact details', 'Coordonnées'),
    fields: [
      text('emailLabel', 'Email label', 'Libellé de l’e-mail', req),
      text('profilesLabel', 'Profiles label', 'Libellé des profils', req),
      text('locationLabel', 'Location label', 'Libellé de la localisation', req),
      text('languagesLabel', 'Languages label', 'Libellé des langues', req),
      textarea('brief', 'Brief hint', 'Conseil pour le brief', req),
    ],
  },
])
