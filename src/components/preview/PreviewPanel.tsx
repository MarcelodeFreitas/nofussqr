import { useQRCode } from '../../qr/useQRCode';
import { useQRConfig } from '../../state/QRConfigContext';
import { QRPreview } from './QRPreview';
import { DownloadBar } from './DownloadBar';
import styles from './PreviewPanel.module.css';

export function PreviewPanel() {
  const { config, update } = useQRConfig();
  const { containerRef, download } = useQRCode(config);

  const hasLogo = Boolean(config.logo.dataUrl);
  const showLogoWarning = hasLogo && (config.errorCorrectionLevel === 'L' || config.errorCorrectionLevel === 'M');

  return (
    <aside className="app-preview">
      <QRPreview containerRef={containerRef} />

      {showLogoWarning && (
        <p className={styles.hint}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
            <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M6.5 4v3M6.5 9v.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
          Use ECC Q or H with a logo for reliable scanning
        </p>
      )}

      <DownloadBar
        format={config.exportFormat}
        size={config.exportSize}
        onFormatChange={(f) => update({ exportFormat: f })}
        onSizeChange={(n) => update({ exportSize: n })}
        onDownload={() => download(config.exportFormat, config.exportSize)}
      />
    </aside>
  );
}
