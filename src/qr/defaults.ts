import type { QRConfig } from '../state/types';

export const DEFAULT_CONFIG: QRConfig = {
  data: '',
  errorCorrectionLevel: 'M',
  shape: 'square',
  dotType: 'rounded',
  cornerSquareType: 'extra-rounded',
  cornerDotType: 'dot',
  fgColor: '#1a1915',
  bgColor: '#ffffff',
  bgTransparent: false,
  gradient: {
    enabled: false,
    type: 'linear',
    rotation: 0,
    colorStart: '#1a1915',
    colorEnd: '#c9613f',
  },
  logo: {
    dataUrl: null,
    sizePct: 0.3,
    margin: 4,
    hideBackgroundDots: true,
  },
  exportFormat: 'svg',
  exportSize: 1024,
};
