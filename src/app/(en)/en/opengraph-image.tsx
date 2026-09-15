import { getDictionary } from "@/i18n/dictionaries";
import { ogImageSize, renderOgImage } from "@/lib/og-image";

export const dynamic = "force-static";
export const size = ogImageSize;
export const contentType = "image/png";
export const alt = getDictionary("en").meta.ogAlt;

export default function OpenGraphImage() {
  return renderOgImage("en");
}
