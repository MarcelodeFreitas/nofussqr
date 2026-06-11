import { useRef } from 'react';
import styles from './ColorInput.module.css';

interface ColorInputProps {
  id?: string;
  value: string;
  onChange: (hex: string) => void;
}

export function ColorInput({ id, value, onChange }: ColorInputProps) {
  const colorRef = useRef<HTMLInputElement>(null);

  const handleText = (raw: string) => {
    const v = raw.startsWith('#') ? raw : `#${raw}`;
    if (/^#[0-9a-fA-F]{6}$/.test(v)) {
      onChange(v);
    }
  };

  return (
    <div className={styles.wrap}>
      <button
        type="button"
        className={styles.swatch}
        style={{ background: value }}
        onClick={() => colorRef.current?.click()}
        aria-label="Pick color"
        title={value}
      />
      <input
        ref={colorRef}
        type="color"
        className={styles.hidden}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        tabIndex={-1}
      />
      <input
        id={id}
        type="text"
        className={styles.text}
        defaultValue={value}
        key={value}
        onBlur={(e) => handleText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleText((e.target as HTMLInputElement).value);
        }}
        maxLength={7}
        spellCheck={false}
        aria-label="Hex color"
      />
    </div>
  );
}
