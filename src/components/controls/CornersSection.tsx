import { useQRConfig } from '../../state/QRConfigContext';
import { SegmentedControl } from '../ui/SegmentedControl';
import { Field } from '../ui/Field';
import type { CornerSquareType, CornerDotType } from '../../state/types';

const CORNER_SQUARE_OPTIONS: { value: CornerSquareType; label: string }[] = [
  { value: 'square', label: 'Square' },
  { value: 'extra-rounded', label: 'Rounded' },
  { value: 'dot', label: 'Dot' },
];

const CORNER_DOT_OPTIONS: { value: CornerDotType; label: string }[] = [
  { value: 'square', label: 'Square' },
  { value: 'rounded', label: 'Rounded' },
  { value: 'dot', label: 'Dot' },
  { value: 'extra-rounded', label: 'Soft' },
];

export function CornersSection() {
  const { config, update } = useQRConfig();

  return (
    <div className="section-card">
      <div className="section-header">Corners</div>
      <div className="section-body">
        <Field label="Corner frame">
          <SegmentedControl
            options={CORNER_SQUARE_OPTIONS}
            value={config.cornerSquareType}
            onChange={(v) => update({ cornerSquareType: v })}
            ariaLabel="Corner frame style"
          />
        </Field>
        <Field label="Corner dot">
          <SegmentedControl
            options={CORNER_DOT_OPTIONS}
            value={config.cornerDotType}
            onChange={(v) => update({ cornerDotType: v })}
            ariaLabel="Corner dot style"
          />
        </Field>
      </div>
    </div>
  );
}
