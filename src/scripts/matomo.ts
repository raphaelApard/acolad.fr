// Matomo tracker (stats.acolad.net, site 8). A processed script, so Vite minifies it; it only
// runs in production builds and loads matomo.js after the page load event.

// Personal data that must never reach the stats through a query string.
const EXCLUDED_QUERY_PARAMS = [
  'account', 'accountnum', 'address', 'address1', 'address2', 'address3', 'addressline1', 'addressline2',
  'adres', 'adresse', 'adresse1', 'adresse2', 'adresse3', 'adresse_email', 'adresseemail', 'adressepostale',
  'age', 'alter', 'auth', 'authpw', 'bic', 'billingaddress', 'billingaddress1', 'billingaddress2',
  'calle', 'cardnumber', 'carte', 'cartebancaire', 'carteidentite', 'cb', 'cc', 'ccc',
  'cccsc', 'cccvc', 'cccvv', 'ccexpiry', 'ccexpmonth', 'ccexpyear', 'ccname', 'ccnumber',
  'cctype', 'cell', 'cellphone', 'city', 'civilite', 'civilité', 'cle', 'clientid',
  'clientsecret', 'clé', 'codepostal', 'company', 'consumerkey', 'consumersecret', 'contrasenya', 'contraseña',
  'courriel', 'cp', 'creditcard', 'creditcardnumber', 'cvc', 'cvv', 'datedenaissance', 'dateexpiration',
  'datenaissance', 'dateofbirth', 'debitcard', 'departement', 'dirección', 'dob', 'domain', 'département',
  'ebost', 'email', 'emailaddress', 'emailadresse', 'entreprise', 'epos', 'epost', 'eposta',
  'exp', 'expiration', 'familyname', 'firma', 'firstname', 'formlogin', 'fullname', 'gender',
  'genre', 'geschlecht', 'gst', 'gstnumber', 'handynummer', 'hasło', 'heslo', 'iban',
  'ibanaccountnum', 'ibanaccountnumber', 'id', 'identifiant', 'identifier', 'identitenationale', 'indirizzo', 'kartakredytowa',
  'kennwort', 'keyconsumerkey', 'keyconsumersecret', 'konto', 'kontonr', 'kontonummer', 'kredietkaart', 'kreditkarte',
  'kreditkort', 'lastname', 'login', 'mail', 'mdp', 'mobiili', 'mobile', 'mobilne',
  'mot_de_passe', 'motdepasse', 'nachname', 'name', 'nationalite', 'nickname', 'nom', 'nomcomplet',
  'nomdefamille', 'nomfamille', 'nss', 'numero_fiscal', 'numerocarte', 'numerocarteidentite', 'numerocompte', 'numerodecarte',
  'numerofiscal', 'numeroidentite', 'numeromobile', 'numeropasseport', 'numerosecuritesociale', 'numerotelephone', 'numerotva', 'numfiscal',
  'numsecu', 'numtva', 'osoite', 'parole', 'pass', 'passeport', 'passord', 'password',
  'passwort', 'pasword', 'paswort', 'paword', 'pays', 'phone', 'pin', 'plz',
  'portable', 'postalcode', 'postcode', 'postleitzahl', 'prenom', 'privatekey', 'prénom', 'publickey',
  'pw', 'pwd', 'pword', 'pwrd', 'questionsecrete', 'region', 'reponsesecrete', 'rib',
  'rue', 'secret', 'secretclé', 'secretq', 'secretquestion', 'securitesociale', 'sexe', 'shippingaddress',
  'shippingaddress1', 'shippingaddress2', 'signature', 'siren', 'siret', 'socialsec', 'socialsecuritynumber', 'societe',
  'socsec', 'sokak', 'ssn', 'steuernummer', 'strasse', 'street', 'surname', 'swift',
  'tax', 'taxnumber', 'tel', 'telefon', 'telefonnr', 'telefonnummer', 'telefono', 'telephone',
  'titre', 'token', 'token_auth', 'tokenauth', 'tva', 'téléphone', 'ulica', 'user',
  'username', 'utilisateur', 'vat', 'vatnumber', 'via', 'ville', 'voie', 'vorname',
  'wachtwoord', 'wagwoord', 'webhooksecret', 'website', 'zip', 'zipcode',
];

type MatomoCommand = unknown[];
const w = window as unknown as { _paq?: MatomoCommand[] };

if (import.meta.env.PROD) {
  const paq = (w._paq = w._paq || []);
  // Tracker methods like "setCustomDimension" must be called before "trackPageView".
  paq.push(['setExcludedQueryParams', EXCLUDED_QUERY_PARAMS]);
  paq.push(['trackPageView']);
  paq.push(['enableLinkTracking']);

  const url = 'https://stats.acolad.net/';
  paq.push(['setTrackerUrl', `${url}matomo.php`]);
  paq.push(['setSiteId', '8']);
  // Fetch the tracker once the page has loaded so it never competes with fonts and images.
  // js/ serves the same file as matomo.js, with a 10-day Expires header that matomo.js lacks.
  window.addEventListener('load', () => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `${url}js/`;
    document.head.append(script);
  });
}
