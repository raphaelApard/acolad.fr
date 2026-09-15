import type { Metadata } from "next";

import { LocaleLayout } from "@/components/LocaleLayout";
import { localePath } from "@/i18n/config";
import { site } from "@/lib/site";
import styles from "./global-not-found.module.css";

export const metadata: Metadata = {
  // Next.js already emits `noindex` for the 404 page.
  title: `Page introuvable — ${site.name}`,
};

export default function GlobalNotFound() {
  return (
    <LocaleLayout lang="fr">
      <main className={styles.main}>
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>Page introuvable</h1>
        <p lang="en" className={styles.sub}>
          Page not found
        </p>
        <p className={styles.links}>
          <a href={localePath("fr")}>Retour à l’accueil</a>
          <a href={localePath("en")} lang="en">
            Back to home
          </a>
        </p>
      </main>
    </LocaleLayout>
  );
}
