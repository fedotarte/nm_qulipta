import styles from './Documents.module.css';

export function Documents() {
  return (
    <section id="documents" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Нормативные документы</h2>
        <p className={styles.placeholder}>Контент секции...</p>
      </div>
    </section>
  );
}

