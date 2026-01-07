import styles from './Library.module.css';

export function Library() {
  return (
    <section id="library" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Библиотека</h2>
        <p className={styles.placeholder}>Контент секции...</p>
      </div>
    </section>
  );
}

