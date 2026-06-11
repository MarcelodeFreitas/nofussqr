import type { Options } from 'qr-code-styling';
import type { QRConfig } from '../state/types';

export function mapConfigToOptions(c: QRConfig, overrideSize?: number): Options {
  const size = overrideSize ?? 320;

  return {
    width: size,
    height: size,
    type: 'svg',
    shape: c.shape,
    data: c.data || ' ',
    margin: 10,
    qrOptions: {
      errorCorrectionLevel: c.errorCorrectionLevel,
      mode: 'Byte',
    },
    dotsOptions: {
      type: c.dotType,
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
