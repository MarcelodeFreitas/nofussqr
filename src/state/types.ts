export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export type DotType =
  | 'square'
  | 'rounded'
  | 'dots'
  | 'classy'
  | 'classy-rounded'
  | 'extra-rounded';

export type CornerSquareType = 'square' | 'extra-rounded' | 'dot';
export type CornerDotType = 'square' | 'dot';
export type GradientType = 'linear' | 'radial';
export type ExportFormat = 'svg' | 'png' | 'jpeg' | 'webp';
export type QRShape = 'square' | 'circle';

export interface GradientConfig {
  enabled: boolean;
  type: GradientType;
  rotation: number;
  colorStart: string;
  colorEnd: string;
}

export interface LogoConfig {
  dataUrl: string | null;
  sizePct: number;
  margin: number;
  hideBackgroundDots: boolean;
}

export interface QRConfig {
  data: string;
  errorCorrectionLevel: ErrorCorrectionLevel;
  shape: QRShape;
  dotType: DotType;
  cornerSquareType: CornerSquareType;
  cornerDotType: CornerDotType;
  fgColor: string;
  bgColor: string;
  bgTransparent: boolean;
  gradient: GradientConfig;
  logo: LogoConfig;
  exportFormat: ExportFormat;
  exportSize: number;
}
