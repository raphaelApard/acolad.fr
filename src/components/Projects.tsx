import type { Dictionary } from "@/i18n/dictionaries";
import styles from "./Projects.module.css";
import { Section } from "./Section";

export function Projects({ dict }: { dict: Dictionary }) {
  return (
    <Section id="projets" index={2} label={dict.nav.work}>
      <ul className={styles.list}>
        {dict.projects.map((project) => (
          <li key={project.title}>
            <article className={styles.item}>
              {/* Placeholder until real project screenshots are available. */}
              <div aria-hidden="true" className={styles.media}>
                {project.img}
              </div>
              <div className={styles.text}>
                <p className={styles.tag}>{project.tag}</p>
                <h3 className={styles.title}>{project.title}</h3>
                <p className={styles.desc}>{project.desc}</p>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </Section>
  );
}
