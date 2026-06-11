import styles from './Toggle.module.css';

interface ToggleProps {
  id?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export function Toggle({ id, checked, onChange, label }: ToggleProps) {
  return (
    <label className={styles.wrap}>
      <input
        id={id}
        type="checkbox"
        className={styles.input}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className={`${styles.track} ${checked ? styles.on : ''}`}>
        <span className={styles.thumb} />
      </span>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
}
