import { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import type { QRConfig, ExportFormat } from '../state/types';
import { mapConfigToOptions } from './mapConfig';

export function useQRCode(config: QRConfig) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const qrRef = useRef<QRCodeStyling | undefined>(undefined);
  // shape changes require a new instance; track the last rendered shape
  const shapeRef = useRef<string | undefined>(undefined);

  if (!qrRef.current || shapeRef.current !== config.shape) {
    qrRef.current = new QRCodeStyling(mapConfigToOptions(config));
    shapeRef.current = config.shape;
  }

  useEffect(() => {
    const node = containerRef.current;
    if (node && qrRef.current) {
      node.innerHTML = '';
      qrRef.current.append(node);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.shape]);

  useEffect(() => {
    qrRef.current?.update(mapConfigToOptions(config));
  }, [config]);

  const download = (format: ExportFormat, size: number) => {
    const exportOptions = mapConfigToOptions(config, size);

    if (format === 'jpeg' && config.bgTransparent) {
      exportOptions.backgroundOptions = { color: config.bgColor || '#ffffff' };
    }

    qrRef.current?.update(exportOptions);
    qrRef.current?.download({ name: 'nofussqr', extension: format });

    setTimeout(() => {
      qrRef.current?.update(mapConfigToOptions(config));
    }, 200);
  };

  return { containerRef, download };
}
