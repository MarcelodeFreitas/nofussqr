import type { ReactNode } from 'react';
import { Tooltip } from './Tooltip';
import styles from './Field.module.css';

interface FieldProps {
  label: string;
  htmlFor?: string;
  tooltip?: string;
  children: ReactNode;
  row?: boolean;
}

export function Field({ label, htmlFor, tooltip, children, row }: FieldProps) {
  return (
    <div className={`${styles.field} ${row ? styles.row : ''}`}>
      <div className={styles.labelRow}>
        <label className={styles.label} htmlFor={htmlFor}>
          {label}
        </label>
        {tooltip && <Tooltip text={tooltip} />}
      </div>
      <div className={styles.control}>{children}</div>
    </div>
  );
}
