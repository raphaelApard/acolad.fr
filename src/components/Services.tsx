import type { Dictionary } from "@/i18n/dictionaries";
import { Section } from "./Section";
import styles from "./Services.module.css";

export function Services({ dict }: { dict: Dictionary }) {
  return (
    <Section id="services" index={1} label={dict.nav.services}>
      <ol className={styles.list}>
        {dict.services.map((service, i) => (
          <li key={service.title} className={styles.item}>
            <span aria-hidden="true" className={styles.number}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className={styles.title}>{service.title}</h3>
            <p className={styles.desc}>{service.desc}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
