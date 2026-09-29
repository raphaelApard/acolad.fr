Français · [English](deployment.md)

# Déploiement

Deux éléments se déploient séparément : le **CMS** (une application Node) et le **site statique**
(des fichiers pour Apache).

```
Hébergement Node : Payload CMS  ◄──── formulaire de contact ──── visiteurs
      │  API REST
      ▼
machine de build : pnpm build ──► apps/web/dist/ ──► hébergement Apache (racine web)
```

Le choix de l'hébergement du CMS reste ouvert : tout hébergement Node ≥ 22.12 avec un disque persistant
convient (petit VPS, plateforme de conteneurs avec volume…). L'hébergement statique ne peut pas le faire
tourner.

## 1. Le CMS

Configure `apps/cms/.env` (voir le README pour chaque variable). En production :

- `PAYLOAD_SECRET` — un long secret aléatoire, jamais réutilisé ailleurs.
- `CMS_URL` — l'URL HTTPS publique du CMS.
- `SITE_URL` — `https://www.acolad.fr` (séparées par des virgules s'il y a plusieurs origines). Seules ces
  origines peuvent appeler l'API depuis un navigateur (le formulaire de contact).
- `DATABASE_URI` — un chemin sur le disque persistant, par ex. `file:/var/lib/acolad/cms.db`.
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_FROM`, et éventuellement
  `CONTACT_TO`. Sans `SMTP_HOST`, les e-mails de notification sont seulement écrits dans le journal.

Puis, depuis la racine du dépôt :

```bash
pnpm install --frozen-lockfile
pnpm --filter cms build
pnpm --filter cms migrate      # crée ou met à jour les tables
pnpm --filter cms seed         # premier déploiement uniquement : charge le contenu initial
pnpm --filter cms start        # sert l'admin et l'API sur :3000
```

Place-le derrière un reverse proxy HTTPS qui transmet `X-Forwarded-For` (l'endpoint de contact limite le
débit par IP). Crée ton compte admin sur `/admin`, ou renseigne `SEED_ADMIN_EMAIL` et
`SEED_ADMIN_PASSWORD` pour le seed. Le seed refuse de s'exécuter sur un CMS qui contient déjà du contenu.

Les images envoyées sont stockées dans `apps/cms/media/` (ignoré par git, comme la base).

## 2. Le site statique

Construis-le face au CMS en fonctionnement, puis envoie le résultat :

```bash
PAYLOAD_URL=https://cms.example.com pnpm build
```

Le build lit chaque page depuis le CMS et télécharge les images pour les optimiser : le CMS doit donc
être joignable depuis la machine de build. Envoie le **contenu de `apps/web/dist/`**, `.htaccess` caché
inclus, à la racine web (`www/` ou `public_html/`). Il contient :

- un dossier par page et par langue, `404.html`, `sitemap.xml`, `robots.txt` ;
- `_astro/` (images optimisées et bundle de scripts, nommés par hash de contenu, mis en cache un an) ;
- `assets/` (polices, icônes, cartes de partage) et `.htaccess` (redirection HTTPS et `www`, en-têtes de
  sécurité, cache, compression).

Si le CMS est joint par une autre adresse publique que celle utilisée au build, renseigne
`PUBLIC_CONTACT_ENDPOINT` pour que le formulaire de contact envoie au bon endroit.

**Après chaque modification de contenu dans l'admin, reconstruis et renvoie le site.** Il n'y a pas
encore de reconstruction automatique (voir « Pas encore fait »).

## 3. Modifier le modèle de contenu

1. Modifie la collection ou le global dans `apps/cms/src/`. Un nouveau type de section est un bloc :
   ajoute-le dans `apps/cms/src/blocks/` et à la liste de `blocks/index.ts`, puis ajoute son composant dans
   `apps/web/src/components/blocks/` et au registre de `blocks/index.ts` de ce dossier.
2. `pnpm --filter cms generate:types` — le site importe `apps/cms/src/payload-types.ts`, commite-le.
3. `pnpm --filter cms migrate:create <nom-court>` et commite les fichiers générés dans
   `apps/cms/src/migrations/`.
4. Lance `pnpm --filter cms migrate` sur chaque environnement.

En développement, le CMS met son schéma à jour tout seul (mode « push »). Si un changement de schéma
fait attendre cette étape une confirmation, supprime `apps/cms/data/cms.db` et relance `pnpm seed` : la
base de développement ne contient rien que le seed ne recrée (sauf contenu que tu aurais modifié).

## 4. Sauvegardes

Le contenu n'est **pas** dans git. Sauvegarde régulièrement deux choses :

- le fichier SQLite (`DATABASE_URI`) ;
- le dossier `apps/cms/media/`.

`pnpm seed -- --reset` ne restaure que le contenu de l'ancien site, pas les modifications ultérieures.

## 5. Vérifier une livraison

- `pnpm typecheck` et `pnpm test` passent.
- Avec le CMS lancé, `pnpm build` réussit et `pnpm preview` affiche le site.
- `dist/.htaccess`, `dist/sitemap.xml` (une URL par page et par langue, chacune avec alternates fr, en et
  x-default), `dist/robots.txt` et `dist/404.html` existent.
- Envoie un message depuis `/contact/` : il apparaît dans **Boîte de réception → Messages** et la
  notification arrive. Arrête le CMS et envoie-en un autre : une note d'erreur s'affiche et le client mail
  s'ouvre.

## Pas encore fait

- **Reconstruction automatique** quand le contenu change (un webhook du CMS vers un job de build).
- **CAPTCHA** sur le formulaire de contact, si le honeypot, le contrôle de délai et la limite de débit
  ne suffisent pas.
- **Choix et mise en place de l'hébergement du CMS**, et ses sauvegardes.
- **Mise à jour des images de partage** (`og-fr.png`, `og-en.png`), qui affichent encore une ancienne
  accroche.
