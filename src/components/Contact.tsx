import type { Dictionary } from "@/i18n/dictionaries";
import { site } from "@/lib/site";
import styles from "./Contact.module.css";
import button from "./ui/button.module.css";

export function Contact({ dict }: { dict: Dictionary }) {
  return (
    <section id="contact" aria-labelledby="contact-title" className={styles.contact}>
      <div className={styles.main}>
        <h2 id="contact-title" className={styles.title}>
          {dict.contactTitle}
        </h2>
        <p className={styles.cta}>
          <a
            href={`mailto:${site.email}`}
            className={`${button.button} ${button.primary} ${button.large}`}
          >
            {dict.cta.contact}
          </a>
        </p>
      </div>
      <address className={styles.info}>
        <p>
          © {new Date().getFullYear()} {site.name} - {site.business}
        </p>
        <p>{site.city}</p>
        <ul aria-label={dict.a11y.socialLinks} className={styles.socials}>
          {site.socials.map((social) => (
            <li key={social.href}>
              <a href={social.href} target="_blank" rel="noopener noreferrer me">
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </address>
    </section>
  );
}
