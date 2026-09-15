import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";

import type { Locale } from "@/i18n/config";
import "@/styles/globals.css";
import styles from "./LocaleLayout.module.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

/** Shared `<html>` shell for each locale's root layout. */
export function LocaleLayout({
  lang,
  children,
}: {
  lang: Locale;
  children: ReactNode;
}) {
  return (
    <html lang={lang} className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <div className={styles.page}>{children}</div>
      </body>
    </html>
  );
}
