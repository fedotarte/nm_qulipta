import Link from 'next/link';
import styles from './Logo.module.css';

export function Logo() {
  return (
    <Link href="/" className={styles.logo}>
      <span className={styles.brand}>КЬЮЛИПТА</span>
      <span className={styles.subtitle}>Атогепант</span>
    </Link>
  );
}

