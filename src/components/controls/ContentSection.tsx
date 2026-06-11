import { useQRConfig } from '../../state/QRConfigContext';

export function ContentSection() {
  const { config, update } = useQRConfig();

  return (
    <div className="section-card">
      <div className="section-header">Content</div>
      <div className="section-body">
        <textarea
          id="qr-data"
          rows={3}
          placeholder="Enter a URL or text to encode..."
          value={config.data}
          onChange={(e) => update({ data: e.target.value })}
          style={{
            width: '100%',
            padding: 'var(--s2) var(--s3)',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            resize: 'vertical',
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-sm)',
            color: 'var(--ink)',
            lineHeight: 'var(--leading)',
            transition: 'border-color var(--duration-fast) var(--ease)',
          }}
          onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
          onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
        />
      </div>
    </div>
  );
}
