import styles from './Experts.module.css';

export function Experts() {
  return (
    <section id="experts" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Ответы экспертов</h2>
        <p className={styles.placeholder}>Контент секции...</p>
      </div>
    </section>
  );
}

