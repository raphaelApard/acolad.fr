import type { Dictionary } from "@/i18n/dictionaries";
import { stack } from "@/lib/site";
import styles from "./Background.module.css";
import { Section } from "./Section";

export function Background({ dict }: { dict: Dictionary }) {
  return (
    <Section
      id="parcours"
      index={4}
      label={dict.nav.about}
      className={styles.grid}
    >
      <ol>
        {dict.timeline.map((entry) => (
          <li key={entry.years} className={styles.entry}>
            <span className={styles.years}>{entry.years}</span>
            <div>
              <h3 className={styles.role}>{entry.role}</h3>
              <p className={styles.org}>{entry.org}</p>
            </div>
          </li>
        ))}
      </ol>
      <div>
        <h3 className={styles.stackLabel}>{dict.stackLabel}</h3>
        <ul className={styles.chips}>
          {stack.map((tech) => (
            <li key={tech} className={styles.chip}>
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
