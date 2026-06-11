import { ContentSection } from './ContentSection';
import { EncodingSection } from './EncodingSection';
import { DotsSection } from './DotsSection';
import { CornersSection } from './CornersSection';
import { ColorsSection } from './ColorsSection';
import { GradientSection } from './GradientSection';
import { LogoSection } from './LogoSection';

export function ControlsPanel() {
  return (
    <div className="app-controls">
      <ContentSection />
      <EncodingSection />
      <DotsSection />
      <CornersSection />
      <ColorsSection />
      <GradientSection />
      <LogoSection />
    </div>
  );
}
