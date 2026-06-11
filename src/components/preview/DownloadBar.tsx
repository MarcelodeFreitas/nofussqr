import { Select } from '../ui/Select';
import type { ExportFormat } from '../../state/types';
import styles from './DownloadBar.module.css';

interface DownloadBarProps {
  format: ExportFormat;
  size: number;
  onFormatChange: (f: ExportFormat) => void;
  onSizeChange: (n: number) => void;
  onDownload: () => void;
}

const FORMAT_OPTIONS = [
  { value: 'svg', label: 'SVG' },
  { value: 'png', label: 'PNG' },
  { value: 'jpeg', label: 'JPEG' },
  { value: 'webp', label: 'WEBP' },
];

const SIZE_OPTIONS = [
  { value: '256', label: '256 px' },
  { value: '512', label: '512 px' },
  { value: '1024', label: '1024 px' },
  { value: '2048', label: '2048 px' },
  { value: '4096', label: '4096 px' },
];

export function DownloadBar({ format, size, onFormatChange, onSizeChange, onDownload }: DownloadBarProps) {
  return (
    <div className={styles.bar}>
      <div className={styles.controls}>
        <Select
          value={format}
          options={FORMAT_OPTIONS}
          onChange={(v) => onFormatChange(v as ExportFormat)}
        />
        {format !== 'svg' && (
          <Select
            value={String(size)}
            options={SIZE_OPTIONS}
            onChange={(v) => onSizeChange(Number(v))}
          />
        )}
      </div>
      <button type="button" className="btn-primary" onClick={onDownload}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
          <path d="M7 2v7M4 6l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 11h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        Download
      </button>
    </div>
  );
}
