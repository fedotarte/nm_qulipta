import Link from 'next/link';
import { Nav } from '@/components/Nav';
import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Nav />
        <div className={styles.actions}>
          <Link href="/login" className={styles.loginButton}>
            Войти
          </Link>
        </div>
      </div>
    </header>
  );
}
