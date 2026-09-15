import type { Viewport } from "next";
import type { ReactNode } from "react";

import { LocaleLayout } from "@/components/LocaleLayout";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("fr");

export const viewport: Viewport = {
  themeColor: "#fafaf8",
  colorScheme: "light",
};

export default function FrenchLayout({ children }: { children: ReactNode }) {
  return <LocaleLayout lang="fr">{children}</LocaleLayout>;
}
