import { useRef, useState } from 'react';
import styles from './FileDrop.module.css';

interface FileDropProps {
  accept: string;
  onFile: (file: File) => void;
  hasFile: boolean;
  onClear: () => void;
  previewUrl?: string | null;
}

export function FileDrop({ accept, onFile, hasFile, onClear, previewUrl }: FileDropProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFiles = (files: FileList | null) => {
    if (files?.[0]) onFile(files[0]);
  };

  return (
    <div
      className={`${styles.zone} ${dragging ? styles.dragging : ''} ${hasFile ? styles.hasFile : ''}`}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files); }}
      onClick={() => !hasFile && inputRef.current?.click()}
      role="button"
      tabIndex={0}
      aria-label="Upload logo image"
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click(); }}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className={styles.hidden}
        onChange={(e) => handleFiles(e.target.files)}
      />

      {hasFile ? (
        <div className={styles.preview}>
          {previewUrl && <img src={previewUrl} alt="Logo preview" className={styles.thumb} />}
          <button
            type="button"
            className={styles.clear}
            onClick={(e) => { e.stopPropagation(); onClear(); }}
            aria-label="Remove logo"
          >
            Remove
          </button>
        </div>
      ) : (
        <div className={styles.empty}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
            <path d="M10 4v8M6 8l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 14v1a2 2 0 002 2h10a2 2 0 002-2v-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span>Drop image or click to upload</span>
        </div>
      )}
    </div>
  );
}
