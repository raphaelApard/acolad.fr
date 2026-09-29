Français · [English](content-editing.md)

# Éditer le contenu

Tous les textes et images du site s'éditent dans l'interface d'admin de Payload (`/admin` sur le CMS).
Le site public ne change qu'une fois reconstruit et renvoyé (voir [Déploiement](deployment.fr.md)).

## Langues

Chaque texte existe en français (langue par défaut, URL sans préfixe) et en anglais (`/en/…`). Le
sélecteur de langue en haut de l'admin change la langue que tu édites. Un champ laissé vide en anglais
reprend le texte français : une traduction manquante affiche du français plutôt qu'un blanc.

L'interface d'admin elle-même peut être en français ou en anglais (menu du compte). Cela n'a aucun effet
sur le site.

## Site

| Écran | Ce qu'il pilote |
|---|---|
| **Réglages du site** | nom, nom de l'entreprise, intitulé, titulaire du copyright ; l'adresse e-mail de contact (utilisée par tous les liens `mailto:`, les données structurées et le repli du formulaire) ; localisation, disponibilité, langues ; adresse postale pour les moteurs de recherche ; liens de profils (LinkedIn, GitHub, Malt) ; mots-clés d'expertise ; chemin et description de l'image de partage |
| **Textes de l'interface** | noms du menu, libellés d'accessibilité, textes de boutons (« Contactez-moi », « Voir tous les projets »…), filtre des projets, visionneuse d'image et page 404 |

L'image de partage est un fichier servi par le site lui-même, pas un upload : place-la dans
`apps/web/public/assets/` (1200×630) et saisis son chemin, par ex. `/assets/og-fr.png`.

## Pages

Une entrée par page, sous **Pages** : Accueil, Services, Projets, Clients, Parcours, Contact.
Chacune comporte :

- **SEO** — le `<title>` et la meta description. Ils alimentent aussi les cartes de partage et les
  données structurées. Garde le titre sous 60 caractères environ.
- **En-tête de page** — le h1 et le paragraphe d'introduction (l'accueil a un bandeau à la place).
- **Appel à l'action final** — le titre du bloc de contact en bas de page, et si son bouton mène à la
  page contact ou à un lien `mailto:`.
- Des textes propres à la page : les étapes de la méthode (services), les principes de travail
  (parcours), la formulation du nombre de clients (`{count}` est remplacé par le nombre de clients), les
  textes du formulaire de contact.

## Collections de contenu

Sous **Contenu**. Chaque entrée a un **Ordre** (le plus petit en premier) qui fixe sa position sur le site.

| Collection | Remarques |
|---|---|
| **Services** | l'*ancre* est l'identifiant du bloc sur la page services : ne pas la modifier. La description courte s'affiche sur l'accueil, la longue sur la page services. |
| **Projets** | la *catégorie du filtre* (Web / IA) pilote les boutons de filtre et est indépendante de l'*étiquette* affichée. Client, résultat, stack et année sont facultatifs. Décocher « Afficher sur la page d'accueil » masque un projet de l'accueil uniquement. |
| **Clients** | le nom n'est pas traduit. Si un logo paraît trop grand, règle sa *taille du logo* sur Moyenne ou Petite (les logos carrés ou compacts en ont besoin). |
| **Expériences** | les *années* s'affichent telles que saisies (ex. `2014 — auj.`) ; l'ordre n'est pas automatique. |
| **Groupes de compétences** | les compétences sont des tags, non traduits. L'accueil affiche tous les groupes en une seule liste ; la page parcours les garde groupés. |

## Images

Envoie les images dans la bibliothèque **Médias** ou directement depuis un projet ou un client. Donne à
chaque image un **texte alternatif** dans les deux langues (laisse-le vide seulement pour les images
décoratives : les logos clients sont déjà nommés par le nom du client).

- Captures de projets : au moins 1920 px de large. Le build crée des versions WebP à plusieurs largeurs,
  plus un PNG ou JPEG pour les très vieux navigateurs, et la visionneuse utilise la plus grande.
- Logos clients : WebP ou PNG à fond transparent, idéalement au double de la taille d'affichage.
- Remplacer une image ne pose jamais de problème de cache : les noms de fichiers générés contiennent un hash.

## Messages de contact

Les messages envoyés via le formulaire apparaissent sous **Boîte de réception → Messages** (lecture
seule) et sont aussi envoyés par e-mail à l'adresse des Réglages du site (ou `CONTACT_TO`). Supprime un
message une fois traité.

## Ce qui demande du code, pas l'admin

Ajouter une page, une section ou un nouveau type de contenu : la table des routes
(`apps/web/src/lib/routes.ts`), une vue dans `apps/web/src/views/` et, pour de nouveaux champs, les
définitions de collections dans `apps/cms/src/` plus une migration (voir [Déploiement](deployment.fr.md)).

## Typographie

La ponctuation française utilise une espace fine insécable (U+202F) avant `?`, `!`, `:` et `;`, pour que
le signe ne passe jamais seul à la ligne. Copie un texte existant quand tu en as besoin, ou colle le
caractère.
