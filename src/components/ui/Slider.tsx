import styles from './Slider.module.css';

interface SliderProps {
  id?: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  format?: (value: number) => string;
}

export function Slider({ id, min, max, step, value, onChange, format }: SliderProps) {
  const display = format ? format(value) : String(value);

  return (
    <div className={styles.wrap}>
      <input
        id={id}
        type="range"
        className={styles.range}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <span className={styles.readout}>{display}</span>
    </div>
  );
}
