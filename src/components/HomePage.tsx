import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildStructuredData } from "@/lib/structured-data";
import { Background } from "./Background";
import { Clients } from "./Clients";
import { Contact } from "./Contact";
import { Hero } from "./Hero";
import { JsonLd } from "./JsonLd";
import { Projects } from "./Projects";
import { Services } from "./Services";
import { SiteHeader } from "./SiteHeader";

export function HomePage({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);

  return (
    <>
      <JsonLd data={buildStructuredData(lang, dict)} />
      <a className="skip-link" href="#main">
        {dict.a11y.skipToContent}
      </a>
      <SiteHeader lang={lang} dict={dict} />
      <main id="main">
        <Hero dict={dict} />
        <Services dict={dict} />
        <Projects dict={dict} />
        <Clients dict={dict} />
        <Background dict={dict} />
        <Contact dict={dict} />
      </main>
    </>
  );
}
