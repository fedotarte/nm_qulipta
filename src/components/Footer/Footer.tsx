import Link from 'next/link';
import styles from './Footer.module.css';

const footerLinks = [
  { label: 'Политика конфиденциальности', href: '/privacy' },
  { label: 'Условия использования', href: '/terms' },
  { label: 'Контакты', href: '/contacts' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <span className={styles.logo}>КЬЮЛИПТА</span>
          <span className={styles.subtitle}>Атогепант</span>
        </div>

        <nav className={styles.nav}>
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href} className={styles.link}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.copyright}>
          <p>© {currentYear} AbbVie Inc. Все права защищены.</p>
          <p className={styles.disclaimer}>
            Информация предназначена для медицинских специалистов.
          </p>
        </div>
      </div>
    </footer>
  );
}

