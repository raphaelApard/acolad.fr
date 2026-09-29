Français · [English](README.md)

# www.acolad.fr — HTML/CSS/JS pur (branche `develop`)

Site personnel de Raphaël Apard — Développeur web & solutions IA (Toulouse / Revel).

Cette branche est la version **sans framework** du site : HTML écrit à la main, une
feuille CSS et quelques lignes de JavaScript. Un petit script Node prépare les
fichiers pour la production (CSS inlinée, images responsives). La version Next.js
se trouve sur `main`.

## Structure

```
index.html            Accueil français (/)
services/ projets/ clients/ parcours/ contact/
                      Pages de section françaises (/services/, /projets/, …), un index.html chacune
en/index.html         Accueil anglais (/en/)
en/services/ work/ clients/ background/ contact/
                      Pages de section anglaises (/en/services/, /en/work/, …)
404.html              Page introuvable
css/style.css         Tous les styles (source — inlinés et minifiés au build)
js/main.js            Menu mobile, lightbox des projets, filtre des projets, formulaire de contact
assets/
  clients/*.webp      Logos clients (images sources)
  fonts/*.woff2       Geist & Geist Mono, sous-ensemble latin (auto-hébergées, SIL OFL)
  favicon.svg, apple-touch-icon.png, og-fr.png, og-en.png
robots.txt, sitemap.xml
.htaccess             Apache : redirection HTTPS/www, 404, en-têtes de sécurité, cache, compression
scripts/build.mjs     Build de production -> dist/
```

## Commandes

Nécessite Node.js ≥ 20.11 et pnpm (ou npm).

```bash
pnpm install     # installe sharp (traitement d'images, build uniquement)
pnpm dev         # sert les fichiers sources      -> http://localhost:3000
pnpm build       # construit le site de production -> dist/
pnpm preview     # sert dist/                      -> http://localhost:3000
```

Les fichiers sources fonctionnent sans build : `pnpm dev` suffit pendant l'édition.

## Ce que fait le build

- **CSS :** `css/style.css` est minifié et inliné dans une balise `<style>` de chaque
  page, ce qui supprime la requête de feuille de style bloquante.
- **Images :** chaque `<img>` avec un attribut `sizes` et un `src` raster dans
  `/assets/` devient un `<picture>` : WebP à plusieurs largeurs (plafonnées à la
  largeur de la source) plus un repli pour les vieux navigateurs — PNG pour les
  images transparentes, JPEG sinon.
- Tout le reste est copié tel quel.

## Déploiement

Lancer `pnpm build`, puis téléverser le **contenu de `dist/`** (y compris le
`.htaccess` caché) à la racine web du serveur (`www/` ou `public_html/`).

## Guide d'édition

- **Les textes** sont directement dans les fichiers HTML. Chaque page existe en
  français et en anglais : garder chaque paire synchronisée, y compris `<title>`,
  meta description, balises Open Graph et JSON-LD.
- **Accueil et pages de section :** l'accueil résume chaque section et la termine par
  un lien « voir tout » vers la page de section correspondante. Sur l'accueil, le menu
  desktop mène aux pages de section tandis que le menu mobile garde les ancres de la page.
- **Nouvelle page :** ajouter son dossier (FR et EN), le lister dans `SITE_FILES` de
  `scripts/build.mjs`, et ajouter les deux URL à `sitemap.xml`.
- **Page des projets :** les boutons de filtre sont livrés `hidden` et révélés par
  `js/main.js` ; chaque ligne de projet porte un `data-category` (`web` ou `ia`).
- **Formulaire de contact :** il n'y a pas de backend. `js/main.js` ouvre le client
  mail du visiteur (`mailto:`) avec le message pré-rempli et affiche une confirmation ;
  sans JavaScript, le formulaire se rabat sur une action `mailto:` simple.
- **Modifications du JS :** incrémenter le paramètre `?v=N` de `/js/main.js?v=N` dans
  chaque fichier HTML (mis en cache un an). Le CSS est inliné, il n'a pas besoin de version.
- **Images :** ajouter l'image source dans `assets/` (au moins 2× sa plus grande taille
  affichée), puis écrire un `<img>` simple avec `width`, `height`, `alt`, `loading="lazy"`
  (sous la ligne de flottaison) et un `sizes` exact — le build génère le reste.
  Utiliser un nouveau nom de fichier pour remplacer une image.
- **Menu mobile :** API Popover native (`popovertarget` / `popover`), aucun JavaScript
  nécessaire pour l'ouvrir. Les navigateurs sans support affichent les liens en ligne.
- **SEO :** mettre à jour le `<lastmod>` de `sitemap.xml` quand le contenu change.
