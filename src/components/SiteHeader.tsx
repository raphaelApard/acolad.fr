import { localePath, locales, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { site } from "@/lib/site";
import styles from "./SiteHeader.module.css";

const MENU_ID = "mobile-menu";

// The mobile menu is a native popover (no framework JS). This tiny script only
// closes it once a section link is chosen.
const closeMenuOnNavigate = `document.getElementById("${MENU_ID}").addEventListener("click",function(e){if(e.target.closest("a")&&this.hidePopover)this.hidePopover()})`;

export function SiteHeader({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const items = [
    { href: "#services", label: dict.nav.services },
    { href: "#projets", label: dict.nav.work },
    { href: "#clients", label: dict.nav.clients },
    { href: "#parcours", label: dict.nav.about },
    { href: "#contact", label: dict.nav.contact },
  ];

  const links = (
    <ul>
      {items.map((item) => (
        <li key={item.href}>
          <a href={item.href}>{item.label}</a>
        </li>
      ))}
    </ul>
  );

  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <a href={localePath(lang)} className={styles.brand}>
          {site.name}
        </a>

        <nav aria-label={dict.a11y.mainNav} className={styles.nav}>
          {links}
        </nav>

        <ul aria-label={dict.a11y.languageSwitch} className={styles.langs}>
          {locales.map((locale) => (
            <li key={locale}>
              <a
                href={localePath(locale)}
                hrefLang={locale}
                lang={locale}
                aria-current={locale === lang ? "page" : undefined}
                className={styles.lang}
              >
                {locale.toUpperCase()}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          popoverTarget={MENU_ID}
          aria-label={dict.a11y.menu}
          className={styles.menuButton}
        >
          <span className={styles.menuBar} />
          <span className={styles.menuBar} />
        </button>
      </div>

      <nav
        id={MENU_ID}
        popover="auto"
        aria-label={dict.a11y.mainNav}
        className={styles.mobileNav}
      >
        {links}
      </nav>
      <script dangerouslySetInnerHTML={{ __html: closeMenuOnNavigate }} />
    </header>
  );
}
