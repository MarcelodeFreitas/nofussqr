import { useState } from 'react';
import styles from './Tooltip.module.css';

interface TooltipProps {
  text: string;
}

export function Tooltip({ text }: TooltipProps) {
  const [visible, setVisible] = useState(false);

  return (
    <span
      className={styles.wrap}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      <button
        type="button"
        className={styles.trigger}
        aria-label="More info"
        aria-describedby={visible ? 'tooltip-bubble' : undefined}
        tabIndex={0}
      >
        ?
      </button>
      {visible && (
        <span id="tooltip-bubble" role="tooltip" className={styles.bubble}>
          {text}
        </span>
      )}
    </span>
  );
}
