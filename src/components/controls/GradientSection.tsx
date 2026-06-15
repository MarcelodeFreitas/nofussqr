import { useEffect, useRef } from 'react';
import { useQRConfig } from '../../state/QRConfigContext';
import { Toggle } from '../ui/Toggle';
import { ColorInput } from '../ui/ColorInput';
import { SegmentedControl } from '../ui/SegmentedControl';
import { Slider } from '../ui/Slider';
import { Field } from '../ui/Field';
import type { GradientType } from '../../state/types';

const GRADIENT_TYPE_OPTIONS: { value: GradientType; label: string }[] = [
  { value: 'linear', label: 'Linear' },
  { value: 'radial', label: 'Radial' },
];

export function GradientSection() {
  const { config, updateGradient } = useQRConfig();
  const g = config.gradient;
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!g.enabled) return;
    sectionRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [g.enabled]);

  return (
    <div className="section-card" ref={sectionRef}>
      <div className="section-header">Gradient</div>
      <div className="section-body">
        <Field label="Enable gradient" row>
          <Toggle checked={g.enabled} onChange={(v) => updateGradient({ enabled: v })} />
        </Field>

        {g.enabled && (
          <>
            <Field label="Type">
              <SegmentedControl
                options={GRADIENT_TYPE_OPTIONS}
                value={g.type}
                onChange={(v) => updateGradient({ type: v })}
                ariaLabel="Gradient type"
              />
            </Field>
            <Field label="Start color">
              <ColorInput value={g.colorStart} onChange={(v) => updateGradient({ colorStart: v })} />
            </Field>
            <Field label="End color">
              <ColorInput value={g.colorEnd} onChange={(v) => updateGradient({ colorEnd: v })} />
            </Field>
            {g.type === 'linear' && (
              <Field label="Rotation" htmlFor="grad-rotation">
                <Slider
                  id="grad-rotation"
                  min={0}
                  max={360}
                  step={5}
                  value={g.rotation}
                  onChange={(v) => updateGradient({ rotation: v })}
                  format={(v) => `${v} deg`}
                />
              </Field>
            )}
          </>
        )}
      </div>
    </div>
  );
}
