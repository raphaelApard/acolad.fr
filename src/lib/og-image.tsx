import { ImageResponse } from "next/og";

import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { site } from "./site";

export const ogImageSize = { width: 1200, height: 630 };

export function renderOgImage(lang: Locale) {
  const dict = getDictionary(lang);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#fafaf8",
          color: "#111",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 28,
            color: "#555",
          }}
        >
          <span style={{ fontWeight: 700, color: "#111" }}>{site.name}</span>
          <span>{dict.hero.role}</span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 64,
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            maxWidth: 1000,
          }}
        >
          {dict.hero.title}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "2px solid #e2e2de",
            paddingTop: 28,
            fontSize: 26,
            color: "#555",
          }}
        >
          <span>{dict.hero.based}</span>
          <span>{new URL(site.url).host}</span>
        </div>
      </div>
    ),
    ogImageSize,
  );
}
