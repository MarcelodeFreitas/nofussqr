import styles from './SegmentedControl.module.css';

interface Option<T extends string> {
  value: T;
  label: string;
  title?: string;
}

interface SegmentedControlProps<T extends string> {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel: string;
  wrap?: boolean;
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
  wrap,
}: SegmentedControlProps<T>) {
  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={`${styles.group} ${wrap ? styles.wrap : ''}`}
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          role="radio"
          aria-checked={opt.value === value}
          className={`${styles.btn} ${opt.value === value ? styles.active : ''}`}
          onClick={() => onChange(opt.value)}
          title={opt.title ?? opt.label}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
