import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <span className={styles.wordmark}>NoFussQR</span>
        <span className={styles.tagline}>What you type is what encodes</span>
      </div>
    </header>
  );
}
