import { useQRConfig } from '../../state/QRConfigContext';
import { SegmentedControl } from '../ui/SegmentedControl';
import { Field } from '../ui/Field';
import type { ErrorCorrectionLevel } from '../../state/types';

const ECC_OPTIONS: { value: ErrorCorrectionLevel; label: string; title: string }[] = [
  { value: 'L', label: 'L', title: 'Low (~7% recovery)' },
  { value: 'M', label: 'M', title: 'Medium (~15% recovery)' },
  { value: 'Q', label: 'Q', title: 'Quartile (~25% recovery)' },
  { value: 'H', label: 'H', title: 'High (~30% recovery)' },
];

export function EncodingSection() {
  const { config, update } = useQRConfig();
  const hasLogo = Boolean(config.logo.dataUrl);

  const eccOptions = ECC_OPTIONS.map((opt) => ({
    ...opt,
    disabled: hasLogo && (opt.value === 'L' || opt.value === 'M'),
  }));

  return (
    <div className="section-card">
      <div className="section-header">Encoding</div>
      <div className="section-body">
        <Field
          label="Error correction"
          tooltip="Controls how much of the QR can be damaged or obscured and still scan. L = smallest code, least resilient. H = densest code, survives ~30% damage — use with logos."
        >
          <SegmentedControl
            options={eccOptions}
            value={config.errorCorrectionLevel}
            onChange={(v) => update({ errorCorrectionLevel: v })}
            ariaLabel="Error correction level"
          />
        </Field>
        {hasLogo && (
          <p style={{
            fontSize: 'var(--text-xs)',
            color: 'var(--ink-faint)',
            lineHeight: 'var(--leading)',
          }}>
            L and M are disabled — a logo covers part of the code and requires Q or H to stay scannable.
          </p>
        )}
      </div>
    </div>
  );
}
