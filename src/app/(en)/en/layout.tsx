import type { Viewport } from "next";
import type { ReactNode } from "react";

import { LocaleLayout } from "@/components/LocaleLayout";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("en");

export const viewport: Viewport = {
  themeColor: "#fafaf8",
  colorScheme: "light",
};

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <LocaleLayout lang="en">{children}</LocaleLayout>;
}
