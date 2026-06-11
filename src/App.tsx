import { QRConfigProvider } from './state/QRConfigContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ControlsPanel } from './components/controls/ControlsPanel';
import { PreviewPanel } from './components/preview/PreviewPanel';

export function App() {
  return (
    <QRConfigProvider>
      <Header />
      <main className="app-layout">
        <ControlsPanel />
        <PreviewPanel />
      </main>
      <Footer />
    </QRConfigProvider>
  );
}
