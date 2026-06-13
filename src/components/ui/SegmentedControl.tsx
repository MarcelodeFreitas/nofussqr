import styles from './SegmentedControl.module.css';

interface Option<T extends string> {
  value: T;
  label: string;
  title?: string;
  disabled?: boolean;
}

interface SegmentedControlProps<T extends string> {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel: string;
  wrap?: boolean;
  cols?: number;
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
  wrap,
  cols,
}: SegmentedControlProps<T>) {
  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={`${styles.group} ${wrap && !cols ? styles.wrap : ''}`}
      style={cols ? { display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)` } : undefined}
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          role="radio"
          aria-checked={opt.value === value}
          className={`${styles.btn} ${opt.value === value ? styles.active : ''} ${opt.disabled ? styles.disabled : ''}`}
          onClick={() => !opt.disabled && onChange(opt.value)}
          disabled={opt.disabled}
          title={opt.title ?? opt.label}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
