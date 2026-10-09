[English version](README.md)

# Passation design — site one page

Design validé du site one page de Raphaël Apard (hero variante A). Canvas source :
https://claude.ai/artifact/NLsarn2xjtxf3TRG1sGVhP

## Contenu

| Chemin | Description |
|---|---|
| `tokens.css` | Couleurs, polices, mise en page et échelle typographique en variables CSS |
| `content/fr.json` | Tous les textes français, structurés pour les composants |
| `content/types.ts` | Typage TypeScript des fichiers de contenu |
| `assets/img/` | Portrait et captures (WebP) → à copier dans `public/img/` |
| `assets/logos/` | Logos clients (WebP) → à copier dans `public/logos/` |
| `mockups/*.dc.html` | Sources des artboards, pour référence (voir ci-dessous) |

Les maquettes sont des fichiers du canvas : elles ont besoin de son moteur pour
s'afficher et utilisent des trous de gabarit `{{…}}`. Lis-les pour le balisage,
les espacements et les comportements exacts ; ouvre le lien du canvas pour les
voir rendues.

| Maquette | Viewport |
|---|---|
| `Main.dc.html` | Desktop, page fluide (conçue à 1440) |
| `Mobile-1.dc.html` | Mobile 390 : header → compétences |
| `Mobile-2.dc.html` | Mobile 390 : missions → footer |
| `MissionStates.dc.html` | Carte mission avec champs facultatifs absents |

## Structure de la page

Ordre, avec les numéros de section affichés :

1. Header — nom, navigation par ancres, switch FR/EN (mobile : bouton menu)
2. Hero — ligne d'infos, nom (h1), titre, accroche, CTA mailto, LinkedIn · Malt · GitHub, portrait
3. `01` Domaines d'intervention — 6 items, 3 colonnes
4. `02` IA & développement assisté — bande sombre, 2 paragraphes, tags
5. Logos clients — « Ils m'ont fait confiance », grille 6 × 2 (mobile 3 × 4), niveaux de gris
6. `03` Compétences — bande blanche, 6 groupes, 3 colonnes
7. `04` Missions — lignes : méta | contenu | capture ; puis « Autres projets » sur bande blanche
8. « Autres expériences » — Simplon, Makina Corpus
9. `05` Certifications · formation · langues — bande blanche, 3 colonnes
10. Footer / contact — bande sombre, grand titre, lien mailto, profils

## Mise en page

- Conteneur `max-width: 1312px`, marges latérales 64px (20px sur mobile).
- Un seul point de rupture à **960px** : en dessous, toutes les grilles passent sur
  une colonne, la navigation passe derrière le bouton menu, la grille de logos
  passe à 3 colonnes.
- Ligne de mission (desktop) : `grid-template-columns: 240px 1fr 400px`, gap 48px.
  Sans capture : `240px 1fr`.
- Captures : `aspect-ratio: 16 / 10`, `object-fit: cover`, `object-position: top`.
- Logos : tuiles blanches de 120px de haut (92px mobile) séparées par un filet de
  1px ; chaque logo a sa propre hauteur dans `content/fr.json` pour équilibrer le
  poids visuel.

## Comportement mobile (fermé par défaut)

| Bloc | Visible fermé | Affiché à l'ouverture |
|---|---|---|
| Groupe de compétences | une ligne de tags | le reste des tags (« Afficher tout » / « Réduire ») |
| Mission | période, lieu, client, rôle | accroche, capture, réalisations, stack |
| Autre projet | nom du client | capture, texte |
| Expérience | période, lieu, entreprise, rôle | texte, réalisations / sous-projets |

Modèle : le titre contient un `<button aria-expanded aria-controls>` ; le panneau
est l'élément référencé par `aria-controls`. Le bouton des compétences porte le
nom du groupe pour les lecteurs d'écran (`Afficher tout — Front-end`). N'afficher
ce bouton que si les tags débordent réellement d'une ligne (mesurer, ne pas estimer).

## Règles de contenu

- Les textes viennent uniquement de `content/<lang>.json`. Ne pas inventer de
  chiffres, de clients ni de témoignages.
- Les champs facultatifs n'affichent rien s'ils sont absents : `place`,
  `achievements`, `stack`, `image`, `projects`. Une mission sans `image` laisse le
  contenu occuper toute la largeur.

## Accessibilité (WCAG AA)

- Ratios de contraste dans les commentaires de `tokens.css` ; texte discret jamais
  plus clair que `#454D5A` sur fond clair ni `#A9B1BD` sur fond sombre.
- Focus visible : `outline: 3px solid` couleur d'accent (`#8FA8FF` sur bandes
  sombres), décalage 3px.
- Un seul `h1` (nom), un `h2` par section, `h3` par mission / groupe, `h4` pour
  les autres projets.
- Lien d'évitement « Aller au contenu » en premier élément focusable.
- Cibles tactiles ≥ 44px ; les logos ont le nom du client en `alt`.

## Bilingue

- Français par défaut. Routes `/fr` et `/en`, alternates `hreflang`, `lang` sur `<html>`.
- En production, le switch FR/EN doit être fait de **liens** vers l'autre langue,
  pas des boutons dessinés dans la maquette.

## Performance

- Images en WebP ; toujours renseigner `width` / `height` ; `loading="lazy"` sous
  la ligne de flottaison.
- Polices auto-hébergées (par exemple `next/font/google`) : Schibsted Grotesk
  400–800, JetBrains Mono 400–500.
- Pas de vidéo.

## Points ouverts

- [ ] `content/en.json` — textes anglais à rédiger (seul le français a été fourni).
- [ ] URL LinkedIn, Malt et GitHub (`links` dans le fichier de contenu).
- [ ] URL de vérification des certifications (`verifyUrl`).
- [ ] `assets/img/missions/docteur-conso-2026.webp` fait 2000 × 1248 : à
      redimensionner à 1200px de large comme les autres captures.
- [ ] `assets/img/portrait.webp` fait 468 × 542 : une source plus grande serait
      plus nette sur écran Retina.
