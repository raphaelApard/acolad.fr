import type { MetadataRoute } from "next";

import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — Web & IA`,
    short_name: site.name,
    start_url: "/",
    display: "browser",
    background_color: "#fafaf8",
    theme_color: "#fafaf8",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
