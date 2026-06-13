import { useQRCode } from '../../qr/useQRCode';
import { useQRConfig } from '../../state/QRConfigContext';
import { QRPreview } from './QRPreview';
import { DownloadBar } from './DownloadBar';

export function PreviewPanel() {
  const { config, update } = useQRConfig();
  const { containerRef, download } = useQRCode(config);

  return (
    <aside className="app-preview">
      <QRPreview containerRef={containerRef} />
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
