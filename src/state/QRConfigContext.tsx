import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { QRConfig, GradientConfig, LogoConfig } from './types';
import { DEFAULT_CONFIG } from '../qr/defaults';

interface QRConfigContextValue {
  config: QRConfig;
  update: (patch: Partial<QRConfig>) => void;
  updateGradient: (patch: Partial<GradientConfig>) => void;
  updateLogo: (patch: Partial<LogoConfig>) => void;
  reset: () => void;
}

const QRConfigContext = createContext<QRConfigContextValue | null>(null);

export function QRConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<QRConfig>(() => {
    try {
      const saved = localStorage.getItem('nofussqr-config');
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<QRConfig>;
        return { ...DEFAULT_CONFIG, ...parsed, logo: { ...DEFAULT_CONFIG.logo, dataUrl: null } };
      }
    } catch {
      // ignore parse errors
    }
    return DEFAULT_CONFIG;
  });

  const update = useCallback((patch: Partial<QRConfig>) => {
    setConfig((prev) => {
      const next = { ...prev, ...patch };
      try {
        localStorage.setItem('nofussqr-config', JSON.stringify({ ...next, logo: { ...next.logo, dataUrl: null } }));
      } catch {
        // storage unavailable
      }
      return next;
    });
  }, []);

  const updateGradient = useCallback((patch: Partial<GradientConfig>) => {
    setConfig((prev) => {
      const next = { ...prev, gradient: { ...prev.gradient, ...patch } };
      try {
        localStorage.setItem('nofussqr-config', JSON.stringify({ ...next, logo: { ...next.logo, dataUrl: null } }));
      } catch {
        // storage unavailable
      }
      return next;
    });
  }, []);

  const updateLogo = useCallback((patch: Partial<LogoConfig>) => {
    setConfig((prev) => ({ ...prev, logo: { ...prev.logo, ...patch } }));
  }, []);

  const reset = useCallback(() => {
    setConfig(DEFAULT_CONFIG);
    try { localStorage.removeItem('nofussqr-config'); } catch { /* ignore */ }
  }, []);

  return (
    <QRConfigContext.Provider value={{ config, update, updateGradient, updateLogo, reset }}>
      {children}
    </QRConfigContext.Provider>
  );
}

export function useQRConfig() {
  const ctx = useContext(QRConfigContext);
  if (!ctx) throw new Error('useQRConfig must be used within QRConfigProvider');
  return ctx;
}
