import { useQRConfig } from '../../state/QRConfigContext';
import { SegmentedControl } from '../ui/SegmentedControl';
import { Field } from '../ui/Field';
import type { ErrorCorrectionLevel } from '../../state/types';

const ECC_OPTIONS: { value: ErrorCorrectionLevel; label: string; title: string }[] = [
  { value: 'L', label: 'L', title: 'Low (~7% recovery)' },
  { value: 'M', label: 'M', title: 'Medium (~15% recovery)' },
  { value: 'Q', label: 'Q', title: 'Quartile (~25% recovery)' },
  { value: 'H', label: 'H', title: 'High (~30% recovery) - use with logos' },
];

export function EncodingSection() {
  const { config, update } = useQRConfig();

  return (
    <div className="section-card">
      <div className="section-header">Encoding</div>
      <div className="section-body">
        <Field
          label="Error correction"
          tooltip="Higher levels let the QR code survive more damage or obstruction, but make the code denser. Use Q or H when adding a center logo."
        >
          <SegmentedControl
            options={ECC_OPTIONS}
            value={config.errorCorrectionLevel}
            onChange={(v) => update({ errorCorrectionLevel: v })}
            ariaLabel="Error correction level"
          />
        </Field>
      </div>
    </div>
  );
}
