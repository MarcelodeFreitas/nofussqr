import type { Options } from 'qr-code-styling';
import type { QRConfig } from '../state/types';

export function mapConfigToOptions(c: QRConfig, overrideSize?: number): Options {
  const size = overrideSize ?? 320;
  const margin = c.shape === 'circle' ? Math.ceil(size * 0.15) : 10;

  return {
    width: size,
    height: size,
    type: 'svg',
    shape: 'square',
    data: c.data || ' ',
    margin,
    qrOptions: {
      errorCorrectionLevel: c.errorCorrectionLevel,
      mode: 'Byte',
    },
    dotsOptions: {
      type: c.dotType,
      roundSize: true,
      color: c.gradient.enabled ? undefined : c.fgColor,
      gradient: c.gradient.enabled
        ? {
            type: c.gradient.type,
            rotation: (c.gradient.rotation * Math.PI) / 180,
            colorStops: [
              { offset: 0, color: c.gradient.colorStart },
              { offset: 1, color: c.gradient.colorEnd },
            ],
          }
        : undefined,
    },
    cornersSquareOptions: {
      type: c.cornerSquareType,
      color: c.fgColor,
    },
    cornersDotOptions: {
      type: c.cornerDotType,
      color: c.fgColor,
    },
    backgroundOptions: {
      round: c.shape === 'circle' ? 1 : 0,
      color: c.bgTransparent ? 'rgba(0,0,0,0)' : c.bgColor,
    },
    image: c.logo.dataUrl ?? undefined,
    imageOptions: {
      imageSize: c.logo.sizePct,
      margin: c.logo.margin,
      hideBackgroundDots: c.logo.hideBackgroundDots,
      crossOrigin: 'anonymous',
    },
  };
}
