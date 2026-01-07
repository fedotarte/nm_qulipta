import styles from './ClinicalCases.module.css';

export function ClinicalCases() {
  return (
    <section id="clinical-cases" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Клинические случаи</h2>
        <p className={styles.placeholder}>Контент секции...</p>
      </div>
    </section>
  );
}

