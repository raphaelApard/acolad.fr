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
| **Textes de l'interface** | libellés d'accessibilité, textes de boutons partagés (« Contactez-moi »), filtre des projets, visionneuse d'image et page 404 |

L'image de partage est un fichier servi par le site lui-même, pas un upload : place-la dans
`apps/web/public/assets/` (1200×630) et saisis son chemin, par ex. `/assets/og-fr.png`.

## Pages

Chaque page du site est un document de **Site → Pages** : Accueil, Services, Projets, Clients, Parcours et
Contact en sont six. Une page a :

- **Nom** — le libellé du menu et du fil d'Ariane, et le nom de la page dans l'admin.
- **Fragment d'URL** (par langue) — la dernière partie de l'URL : `work` donne `/en/work/`, `projets` donne
  `/projets/`. Minuscules, chiffres et tirets ; unique par langue ; `en`, `assets`, `_astro`, `api`,
  `admin` et `404` sont réservés. **Modifier le fragment d'une page existante casse les liens et résultats
  de recherche qui pointent vers son ancienne URL.** La page d'accueil n'a pas de fragment.
- **SEO** — le `<title>` et la meta description, aussi utilisés pour les cartes de partage et les données
  structurées. Garde le titre sous 60 caractères environ.
- **Sections** — le contenu de la page, de haut en bas (voir ci-dessous). Les mêmes sections apparaissent
  dans les deux langues ; seuls leurs textes changent.
- Dans la colonne latérale : **Page d'accueil** (servie sur `/` et `/en/` ; une seule page, qui ne peut pas
  être supprimée), **Afficher dans le menu**, **Ordre** (le plus petit en premier), **Ancre sur l'accueil**
  (voir plus bas) et le **type de données structurées** (Page de contact pour la page contact, Page web
  sinon).

### Sections

Ajoute, réordonne ou supprime des sections avec les boutons du champ **Sections**. Types disponibles :

| Section | Ce qu'elle affiche |
|---|---|
| **Bandeau d'accueil** | le bandeau de l'accueil : titre, introduction, deux boutons (un lien est une ancre comme `#contact` ou un chemin) et lignes latérales |
| **En-tête de page** | lien de retour vers l'accueil, h1 et introduction (cocher *large* pour une introduction plus longue) |
| **Services** | *Résumé* : la liste numérotée de l'accueil avec un lien « voir tout ». *Offres détaillées* : un bloc par service avec livrables et stack |
| **Projets** | *Cartes* : les cartes de l'accueil avec un lien « voir tout ». *Études de cas* : rangées avec faits, filtre par catégorie et visionneuse d'image |
| **Clients** | *Logos* : la grille de l'accueil. *Fiches détaillées* : logo, secteur et réalisation, avec la formulation du nombre de clients |
| **Résumé du parcours** | la frise de l'accueil à côté de la liste plate des compétences, avec un lien « voir tout » |
| **Expérience** | la liste détaillée des expériences |
| **Stack groupée** | les compétences, par groupe |
| **Points** | une liste de points courts, numérotés (étapes de la méthode) ou non (principes de travail) |
| **Formulaire de contact** / **Coordonnées** | le formulaire et ses textes ; l'e-mail, les profils, la localisation et les langues issus des réglages du site |
| **Appel à l'action final** | le bloc de contact en bas de page ; son bouton mène à une page du site ou à un lien `mailto:`. Une page sans ce bloc se termine par un simple pied de page |

Les présentations *résumé* ont une **ancre** (l'identifiant de la section), un **numéro** facultatif
(« 01 ») affiché avant le titre et un **lien « voir tout »** vers une autre page. Les services, projets,
clients, expériences et compétences eux-mêmes s'éditent dans les collections ci-dessous, pas dans la
section.

### Ajouter une page

1. **Site → Pages → Créer**. Renseigne le nom, le fragment d'URL et le SEO en français, puis passe en
   anglais et renseigne les mêmes champs.
2. Ajoute des sections. Réutilise les mêmes types que les autres pages : le site ne connaît que ceux-là.
3. Laisse **Afficher dans le menu** coché pour la lister dans le menu principal (après les autres, ou
   déplace-la avec **Ordre**). Pour que le menu mobile de l'accueil fasse défiler jusqu'à une section de
   l'accueil au lieu d'ouvrir la page, renseigne l'identifiant de cette section dans **Ancre sur l'accueil**.
4. Reconstruis et renvoie le site : la page, ses liens hreflang et ses entrées de sitemap sont générés.

Supprimer une page la retire du menu et du sitemap au prochain build. Les liens qui y mènent depuis
d'autres pages (un lien « voir tout », un bouton final) doivent être changés avant.

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

Un nouveau type de section, ou de nouveaux champs : un bloc dans `apps/cms/src/blocks/`, son composant dans
`apps/web/src/components/blocks/` et une migration (voir [Déploiement](deployment.fr.md)). Ajouter une page
composée de sections existantes, elle, se fait entièrement dans l'admin.

## Typographie

La ponctuation française utilise une espace fine insécable (U+202F) avant `?`, `!`, `:` et `;`, pour que
le signe ne passe jamais seul à la ligne. Copie un texte existant quand tu en as besoin, ou colle le
caractère.
