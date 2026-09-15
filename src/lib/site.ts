import type { StaticImageData } from "next/image";

import americanHospital from "@/assets/clients/american-hospital-paris.webp";
import axess from "@/assets/clients/axess-ows.webp";
import eyFabernovel from "@/assets/clients/ey-fabernovel.webp";
import humansConnexion from "@/assets/clients/humans-connexion.webp";
import issy from "@/assets/clients/issy-com.webp";
import makinaCorpus from "@/assets/clients/makina-corpus.webp";
import muzeo from "@/assets/clients/muzeo.webp";
import ovhcloud from "@/assets/clients/ovhcloud.webp";
import pantheonSorbonne from "@/assets/clients/pantheon-sorbonne.webp";
import parisSaclay from "@/assets/clients/paris-saclay.webp";
import syndex from "@/assets/clients/syndex.webp";

export const site = {
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.acolad.fr").replace(
    /\/$/,
    "",
  ),
  name: "Raphaël Apard",
  business: "Acolad développement",
  email: "contact@raphaelapard.fr",
  city: "Toulouse / Revel",
  socials: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/raphael-apard-81b90924/",
    },
    { label: "GitHub", href: "https://github.com/raphaelApard" },
    { label: "Malt", href: "https://www.malt.fr/profile/raphaelapard" },
  ],
} as const;

export function absoluteUrl(path: string): string {
  return new URL(path, site.url).toString();
}

/** Logos are drawn on very different canvases, so each gets a visual scale. */
export type LogoScale = "small" | "mid" | "full";

export const clients: {
  name: string;
  logo: StaticImageData;
  scale: LogoScale;
}[] = [
  {
    name: "Panthéon Sorbonne — Université Paris 1",
    logo: pantheonSorbonne,
    scale: "full",
  },
  { name: "American Hospital of Paris", logo: americanHospital, scale: "full" },
  { name: "OVHcloud", logo: ovhcloud, scale: "small" },
  {
    name: "Issy.com — Ville d’Issy-les-Moulineaux",
    logo: issy,
    scale: "small",
  },
  { name: "Syndex", logo: syndex, scale: "mid" },
  { name: "Muzéo", logo: muzeo, scale: "full" },
  { name: "Axess Open Web Services", logo: axess, scale: "full" },
  { name: "Université Paris-Saclay", logo: parisSaclay, scale: "full" },
  { name: "EY Fabernovel", logo: eyFabernovel, scale: "full" },
  { name: "Makina Corpus", logo: makinaCorpus, scale: "small" },
  { name: "Human’s Connexion", logo: humansConnexion, scale: "mid" },
];

export const stack = [
  "TypeScript",
  "React",
  "Next.js",
  "TanStack Query",
  "Zustand",
  "Node.js",
  "NestJS",
  "Python",
  "FastAPI",
  "PHP",
  "Drupal",
  "Symfony",
  "REST API",
  "GraphQL",
  "OpenAI",
  "Anthropic",
  "Google Gemini",
  "Mistral",
  "LangChain",
  "Llama",
  "AI Agents",
  "RAG",
  "MCP",
  "Prompt Engineering",
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "Redis",
  "Elasticsearch",
  "n8n",
  "Docker",
  "GitHub Actions",
  "CI/CD",
];
