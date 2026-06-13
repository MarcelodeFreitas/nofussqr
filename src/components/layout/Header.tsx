import { useTheme } from '../../hooks/useTheme';
import styles from './Header.module.css';

export function Header() {
  const { dark, toggle } = useTheme();

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <span className={styles.wordmark}>
          NoFuss<span className={styles.wordmarkAccent}>QR</span>
        </span>
        <span className={styles.tagline}>What you type is what encodes</span>
      </div>
      <button
        type="button"
        className={styles.themeToggle}
        onClick={toggle}
        aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
        title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {dark ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <circle cx="8" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.4"/>
            <path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3.1 3.1l1.06 1.06M11.84 11.84l1.06 1.06M3.1 12.9l1.06-1.06M11.84 4.16l1.06-1.06" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M13.5 9.5A5.5 5.5 0 0 1 6.5 2.5a5.5 5.5 0 1 0 7 7z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
          </svg>
        )}
      </button>
    </header>
  );
}
