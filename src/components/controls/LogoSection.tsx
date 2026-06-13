import { useQRConfig } from '../../state/QRConfigContext';
import { FileDrop } from '../ui/FileDrop';
import { Slider } from '../ui/Slider';
import { Toggle } from '../ui/Toggle';
import { Field } from '../ui/Field';
import { fileToDataURL } from '../../lib/image';

export function LogoSection() {
  const { config, updateLogo } = useQRConfig();
  const logo = config.logo;

  const handleFile = async (file: File) => {
    const dataUrl = await fileToDataURL(file);
    updateLogo({ dataUrl });
  };

  return (
    <div className="section-card">
      <div className="section-header">Center Logo</div>
      <div className="section-body">
        <FileDrop
          accept="image/*"
          onFile={handleFile}
          hasFile={Boolean(logo.dataUrl)}
          onClear={() => updateLogo({ dataUrl: null })}
          previewUrl={logo.dataUrl}
        />

        {logo.dataUrl && (
          <p style={{
            fontSize: 'var(--text-xs)',
            color: 'var(--ink-soft)',
            background: 'var(--accent-soft)',
            border: '1px solid var(--accent)',
            borderRadius: 'var(--radius-sm)',
            padding: 'var(--s2) var(--s3)',
            lineHeight: 'var(--leading)',
          }}>
            Error correction set to H — maximum resilience for QR codes with a logo.
          </p>
        )}

        {logo.dataUrl && (
          <>
            <Field label="Logo size" htmlFor="logo-size">
              <Slider
                id="logo-size"
                min={0.1}
                max={0.5}
                step={0.01}
                value={logo.sizePct}
                onChange={(v) => updateLogo({ sizePct: v })}
                format={(v) => `${Math.round(v * 100)}%`}
              />
            </Field>
            <Field label="Margin" htmlFor="logo-margin">
              <Slider
                id="logo-margin"
                min={0}
                max={20}
                step={1}
                value={logo.margin}
                onChange={(v) => updateLogo({ margin: v })}
                format={(v) => `${v}px`}
              />
            </Field>
            <Field label="Hide dots behind logo" row>
              <Toggle
                checked={logo.hideBackgroundDots}
                onChange={(v) => updateLogo({ hideBackgroundDots: v })}
              />
            </Field>
          </>
        )}
      </div>
    </div>
  );
}
