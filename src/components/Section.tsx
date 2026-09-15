import type { ReactNode } from "react";

import styles from "./Section.module.css";

type Props = {
  id: string;
  index: number;
  label: string;
  /**
   * When the section body renders its own, more descriptive heading, the index
   * label becomes decorative text and `headingId` must point at that heading.
   */
  headingId?: string;
  className?: string;
  children: ReactNode;
};

export function Section({
  id,
  index,
  label,
  headingId,
  className,
  children,
}: Props) {
  const LabelTag = headingId ? "p" : "h2";
  const labelId = headingId ? undefined : `${id}-title`;

  return (
    <section
      id={id}
      aria-labelledby={headingId ?? labelId}
      className={styles.section}
    >
      <LabelTag id={labelId} className={styles.label}>
        <span aria-hidden="true">{String(index).padStart(2, "0")} — </span>
        {label}
      </LabelTag>
      <div className={className ? `${styles.body} ${className}` : styles.body}>
        {children}
      </div>
    </section>
  );
}
