import Link from 'next/link';
import styles from './Nav.module.css';

export interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Хроническая и эпизодическая мигрень', href: '#migraine-types' },
  { label: 'Интерактивный квиз', href: '#quiz' },
  { label: 'Клинические случаи', href: '#clinical-cases' },
  { label: 'Ответы экспертов', href: '#experts' },
  { label: 'Записи вебинаров', href: '#webinars' },
  { label: 'Библиотека', href: '#library' },
  { label: 'Нормативные документы', href: '#documents' },
];

export function Nav() {
  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        {navItems.map((item) => (
          <li key={item.href} className={styles.item}>
            <Link href={item.href} className={styles.link}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
