import styles from './Quiz.module.css';

export function Quiz() {
  return (
    <section id="quiz" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Интерактивный квиз</h2>
        <p className={styles.description}>
          Поставьте верный диагноз и назначьте лечение пациентке с головной болью.
        </p>
        <p className={styles.placeholder}>Контент секции...</p>
      </div>
    </section>
  );
}

