// Company facts shared by every locale (contact details, structured data). Keep in step with
// the legal notice (`legal` in src/site/fr.ts and en.ts) and the company register.
export const business = {
  name: 'Acolad Développement',
  legalName: 'ACOLAD DEVELOPPEMENT',
  foundingDate: '2014-11-14',
  vatID: 'FR29807777917',
  email: 'raphael.apard@acolad.fr',
  telephone: '+33613789134',
  /** The same number as people read it. */
  telephoneDisplay: '+33 6 13 78 91 34',
  address: {
    streetAddress: '27 avenue de Sorèze',
    postalCode: '31250',
    addressLocality: 'Revel',
    addressCountry: 'FR',
  },
  /** Where Raphaël lives (the company is registered there too). */
  home: { addressLocality: 'Revel', postalCode: '31250', addressCountry: 'FR' },
  /** Where he works and takes missions, as shown on the site. */
  workLocality: 'Toulouse',
};
