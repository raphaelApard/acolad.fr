import type { GlobalConfig } from 'payload'

import { publicRead } from '../access/public'
import { label, text, textarea } from '../fields/helpers'

const url = (name: string, en: string, fr: string) => ({
  name,
  type: 'text' as const,
  label: label(en, fr),
  admin: { description: label('Leave empty to hide the link.', 'Laisser vide pour masquer le lien.') },
})

export const Site: GlobalConfig = {
  slug: 'site',
  label: label('Site settings', 'Réglages du site'),
  access: { read: publicRead },
  admin: { group: label('Settings', 'Réglages') },
  versions: { max: 50 },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'seo',
          label: label('SEO', 'SEO'),
          fields: [
            text('title', 'Home page title', 'Titre de la page d’accueil', { required: true }),
            textarea('description', 'Meta description', 'Meta description', { required: true }),
          ],
        },
        {
          name: 'links',
          label: label('Contact and profiles', 'Contact et profils'),
          fields: [
            { name: 'email', type: 'email', required: true, label: label('E-mail', 'E-mail') },
            url('linkedin', 'LinkedIn profile', 'Profil LinkedIn'),
            url('malt', 'Malt profile', 'Profil Malt'),
            url('github', 'GitHub profile', 'Profil GitHub'),
          ],
        },
        {
          name: 'contact',
          label: label('Footer', 'Pied de page'),
          fields: [
            text('navLabel', 'Menu label', 'Libellé du menu', {
              admin: { description: label('Leave empty to keep the contact out of the menu.', 'Laisser vide pour ne pas afficher le contact dans le menu.') },
            }),
            text('title', 'Title', 'Titre', { required: true }),
            text('footer', 'Bottom line', 'Ligne du bas', { required: true }),
            text('backToTop', '“Back to top” link', 'Lien « Haut de page »', { required: true }),
          ],
        },
        {
          name: 'ui',
          label: label('Interface', 'Interface'),
          description: label(
            'Button labels and texts read by screen readers.',
            'Libellés des boutons et textes lus par les lecteurs d’écran.',
          ),
          fields: [
            text('skipLink', 'Skip link', 'Lien d’évitement', { required: true }),
            text('languageSwitch', 'Language switch', 'Sélecteur de langue', { required: true }),
            text('openMenu', 'Open menu', 'Ouvrir le menu', { required: true }),
            text('closeMenu', 'Close menu', 'Fermer le menu', { required: true }),
            text('mainNav', 'Main navigation', 'Navigation principale', { required: true }),
            text('profiles', 'Online profiles', 'Profils en ligne', { required: true }),
            text('tools', 'Tools', 'Outils', { required: true }),
            text('verifyAriaPrefix', 'Verify a certification (followed by its name)', 'Vérifier une certification (suivi de son nom)', { required: true }),
            text('enlargeImage', 'Enlarge image (followed by its description)', 'Agrandir l’image (suivi de sa description)', { required: true }),
            text('closeImage', 'Close image', 'Fermer l’image', { required: true }),
            text('copyEmail', 'Copy e-mail', 'Copier l’e-mail', { required: true }),
            text('emailCopied', 'E-mail copied', 'E-mail copié', { required: true }),
          ],
        },
      ],
    },
  ],
}
