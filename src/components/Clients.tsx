import Image from "next/image";

import type { Dictionary } from "@/i18n/dictionaries";
import { clients } from "@/lib/site";
import styles from "./Clients.module.css";
import { Section } from "./Section";

export function Clients({ dict }: { dict: Dictionary }) {
  return (
    <Section
      id="clients"
      index={3}
      label={dict.nav.clients}
      headingId="clients-title"
    >
      <h2 id="clients-title" className={styles.title}>
        {dict.clientsTitle}
      </h2>
      <ul className={styles.grid}>
        {clients.map((client) => (
          <li key={client.name} className={styles.cell}>
            <Image
              src={client.logo}
              alt={client.name}
              sizes="(max-width: 720px) calc(50vw - 54px), 200px"
              className={`${styles.logo} ${styles[client.scale]}`}
            />
          </li>
        ))}
      </ul>
    </Section>
  );
}
