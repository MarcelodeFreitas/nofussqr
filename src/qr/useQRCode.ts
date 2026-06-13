import { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import type { QRConfig, ExportFormat, QRShape } from '../state/types';
import { mapConfigToOptions } from './mapConfig';

export function useQRCode(config: QRConfig) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const qrRef = useRef<QRCodeStyling | undefined>(undefined);
  // shape changes require a new instance; track the last rendered shape
  const shapeRef = useRef<QRShape | undefined>(undefined);
  // track the shape of the last appended instance to distinguish append vs update
  const lastAppendedShape = useRef<QRShape | undefined>(undefined);

  if (!qrRef.current || shapeRef.current !== config.shape) {
    qrRef.current = new QRCodeStyling(mapConfigToOptions(config));
    shapeRef.current = config.shape;
  }

  useEffect(() => {
    const node = containerRef.current;
    if (!node || !qrRef.current) return;

    if (lastAppendedShape.current !== config.shape) {
      // Shape changed or first mount: shape is baked into the new instance, just append
      lastAppendedShape.current = config.shape;
      node.innerHTML = '';
      qrRef.current.append(node);
    } else {
      // Non-shape config change: update in place.
      // Omit shape from update options — update() does not re-apply the SVG clipPath,
      // so passing it would silently revert a circle QR back to square.
      const { shape: _shape, ...updateOptions } = mapConfigToOptions(config);
      qrRef.current.update(updateOptions);
    }
  }, [config]);

  const download = (format: ExportFormat, size: number) => {
    const { shape: _shape, ...exportOptions } = mapConfigToOptions(config, size);

    if (format === 'jpeg' && config.bgTransparent) {
      exportOptions.backgroundOptions = { color: config.bgColor || '#ffffff' };
    }

    qrRef.current?.update(exportOptions);
    qrRef.current?.download({ name: 'nofussqr', extension: format });

    setTimeout(() => {
      const { shape: _s, ...resetOptions } = mapConfigToOptions(config);
      qrRef.current?.update(resetOptions);
    }, 200);
  };

  return { containerRef, download };
}
