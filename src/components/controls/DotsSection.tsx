import { useQRConfig } from '../../state/QRConfigContext';
import { SegmentedControl } from '../ui/SegmentedControl';
import { Toggle } from '../ui/Toggle';
import { Field } from '../ui/Field';
import type { DotType, QRShape } from '../../state/types';

const DOT_OPTIONS: { value: DotType; label: string }[] = [
  { value: 'square', label: 'Square' },
  { value: 'rounded', label: 'Rounded' },
  { value: 'dots', label: 'Dots' },
  { value: 'classy', label: 'Classy' },
  { value: 'classy-rounded', label: 'Classy+' },
  { value: 'extra-rounded', label: 'Soft' },
];

const SHAPE_OPTIONS: { value: QRShape; label: string }[] = [
  { value: 'square', label: 'Square' },
  { value: 'circle', label: 'Circle' },
];

export function DotsSection() {
  const { config, update } = useQRConfig();

  return (
    <div className="section-card">
      <div className="section-header">Dots &amp; Shape</div>
      <div className="section-body">
        <Field label="Dot style">
          <SegmentedControl
            options={DOT_OPTIONS}
            value={config.dotType}
            onChange={(v) => update({ dotType: v })}
            ariaLabel="Dot style"
            cols={3}
          />
        </Field>
        <Field label="Overall shape">
          <SegmentedControl
            options={SHAPE_OPTIONS}
            value={config.shape}
            onChange={(v) => update({ shape: v })}
            ariaLabel="QR code shape"
          />
        </Field>
        <Field label="Round corners" row>
          <Toggle
            checked={config.dotRoundSize}
            onChange={(v) => update({ dotRoundSize: v })}
          />
        </Field>
      </div>
    </div>
  );
}
