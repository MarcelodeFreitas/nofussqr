import type { RefObject } from 'react';
import styles from './QRPreview.module.css';

interface QRPreviewProps {
  containerRef: RefObject<HTMLDivElement | null>;
}

export function QRPreview({ containerRef }: QRPreviewProps) {
  return (
    <div className={`${styles.canvas} checkered`}>
      <div ref={containerRef} className={styles.qr} aria-label="QR code preview" />
    </div>
  );
}
