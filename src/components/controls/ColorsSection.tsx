import { useQRConfig } from '../../state/QRConfigContext';
import { ColorInput } from '../ui/ColorInput';
import { Toggle } from '../ui/Toggle';
import { Field } from '../ui/Field';

export function ColorsSection() {
  const { config, update } = useQRConfig();

  return (
    <div className="section-card">
      <div className="section-header">Colors</div>
      <div className="section-body">
        <Field label="Foreground" htmlFor="fg-color">
          <ColorInput
            id="fg-color"
            value={config.fgColor}
            onChange={(v) => update({ fgColor: v })}
          />
        </Field>
        <Field label="Background" htmlFor="bg-color" row>
          <Toggle
            checked={config.bgTransparent}
            onChange={(v) => update({ bgTransparent: v })}
            label="Transparent"
          />
        </Field>
        {!config.bgTransparent && (
          <ColorInput
            id="bg-color"
            value={config.bgColor}
            onChange={(v) => update({ bgColor: v })}
          />
        )}
      </div>
    </div>
  );
}
