import type { Dictionary } from "@/i18n/dictionaries";
import styles from "./Hero.module.css";
import button from "./ui/button.module.css";

export function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section aria-labelledby="hero-title" className={styles.hero}>
      <div className={styles.main}>
        <h1 id="hero-title" className={styles.title}>
          {dict.hero.title}
        </h1>
        <p className={styles.sub}>{dict.hero.sub}</p>
        <div className={styles.ctas}>
          <a href="#contact" className={`${button.button} ${button.primary}`}>
            {dict.cta.contact}
          </a>
          <a href="#projets" className={`${button.button} ${button.outline}`}>
            {dict.cta.work}
          </a>
        </div>
      </div>
      <ul className={styles.aside}>
        <li>{dict.hero.role}</li>
        <li>{dict.hero.based}</li>
        <li>{dict.hero.remote}</li>
      </ul>
    </section>
  );
}
