import { notFound } from "next/navigation";
import { ARTICLES } from "@/content";
import styles from "./page.module.css";

export default async function ArticlePage(
  props: PageProps<"/articles/[slug]">,
) {
  const { slug } = await props.params;

  const found = ARTICLES.find((article) => article.slug === slug);
  if (!found) {
    notFound();
  }

  if (slug === "episodic-migraine") {
    return (
      <main className={styles.page}>
        <div className={styles.desktop}>
          <header className={styles.topBar}>
            <div className={styles.topBrand}>КЬЮЛИПТА</div>
            <button type="button" className={styles.accountButton}>
              Личный кабинет
            </button>
          </header>

          <div className={styles.contentGrid}>
            <section className={styles.mainColumn}>
              <h1 className={styles.title}>ЭПИЗОДИЧЕСКАЯ МИГРЕНЬ</h1>

              <article className={styles.section}>
                <h2 className={styles.sectionTitle}>
                  КЬЮЛИПТА ОБЛАДАЕТ ВЫСОКИМ СРОДСТВОМ И АКТИВНОСТЬЮ К CGRP-РЕЦЕПТОРУ
                </h2>
                <img
                  src="/api/figma-assets/episodic-migraine-full"
                  alt="Иллюстрация механизма действия"
                  className={styles.firstBlockCrop}
                />
              </article>

              <article className={styles.section}>
                <h2 className={styles.sectionTitle}>
                  ПРЕВЕНТИВНАЯ ТЕРАПИЯ МИГРЕНИ, КОТОРАЯ МОЖЕТ ДЕЙСТВОВАТЬ БЫСТРО
                </h2>
                <img
                  src="/api/figma-assets/episodic-migraine-2-1-1"
                  alt="Сокращение среднего числа дней с мигренью"
                  className={styles.sectionImage}
                />
              </article>

              <article className={styles.section}>
                <h2 className={styles.sectionTitle}>
                  У КАЖДОГО ВТОРОГО ПАЦИЕНТА К КОНЦУ 1 ГОДА ТЕРАПИИ ЗАФИКСИРОВАНО
                  ПОЛНОЕ ПРЕКРАЩЕНИЕ ПРИСТУПОВ
                </h2>
                <img
                  src="/api/figma-assets/episodic-migraine-3-2-1"
                  alt="Поисковая конечная точка эффективности"
                  className={styles.sectionImage}
                />
              </article>

              <article className={styles.section}>
                <h2 className={styles.sectionTitle}>
                  ПРОФИЛАКТИЧЕСКАЯ ТЕРАПИЯ МИГРЕНИ, КОТОРАЯ ХОРОШО ПЕРЕНОСИТСЯ ПО
                  СРАВНЕНИЮ С ПЛАЦЕБО
                </h2>
                <div className={styles.aeCardWrap}>
                  <img
                    src="/api/figma-assets/episodic-migraine-group-4"
                    alt="Частота нежелательных явлений"
                    className={styles.aeCardImage}
                  />
                </div>
              </article>

              <img
                src="/api/figma-assets/episodic-migraine-frame-163"
                alt="Блок с преимуществами и упаковкой"
                className={styles.sectionImage}
              />

              <img
                src="/api/figma-assets/episodic-migraine-frame-194"
                alt="В каких случаях рекомендуется модификация дозы до 10 мг"
                className={styles.sectionImage}
              />

              <section className={styles.disclaimer}>
                CGRP — кальцитонин ген родственный пептид. R-CGRP — рецептор к
                кальцитонин ген родственному пептиду. mITT — модифицированная
                популяция всех пациентов с назначенным лечением.
              </section>

              <section className={styles.references}>
                <h3 className={styles.referencesTitle}>Список литературы</h3>
                <p className={styles.referencesText}>
                  1. Haanes KA, Edvinsson L. Pathophysiological Mechanisms in
                  Migraine and the Identification of New Therapeutic Targets.
                  CNS Drugs. 2019;33(6):525-537. 2. Moore E, et al.
                  Pharmacologic characterization of atogepant: A potent and
                  selective calcitonin gene-related peptide receptor antagonist.
                  Cephalalgia. 2024;44(1). 3. Ashina M, Tepper SJ, Reuter U, et
                  al. Once-daily oral atogepant for the long-term preventive
                  treatment of migraine. Headache. 2023;63(1):79-88.
                </p>
              </section>
            </section>

            <aside className={styles.sidebar}>
              <button type="button" className={styles.sidebarMainButton}>
                Хроническая мигрень
              </button>
              <h3 className={styles.sidebarTitle}>Другие материалы по теме:</h3>
              <div className={styles.sidebarCard}>
                <p>Кьюлипта - механизм действия</p>
                <button type="button">Читать</button>
              </div>
              <div className={styles.sidebarCard}>
                <p>Случаи из реальной клинической практики</p>
                <button type="button">Читать</button>
              </div>
            </aside>
          </div>

          <footer className={styles.bottomBar}>
            <span>
              Информацию о нежелательных явлениях, связанных с применением
              препаратов компании «ЭббВи», необходимо направить по адресу:
              ruabhvie@abbvie.com
            </span>
            <span>
              Материал подготовлен при поддержке ООО «ЭббВи», 125171, Россия, г.
              Москва, Ленинградское ш., д.16а, стр. 1; Тел. +7 (495) 258-42-77
            </span>
            <span>
              Информация предназначена исключительно для специалистов
              здравоохранения РФ. Номер одобрения: RU-QLP-260034 март 2026
            </span>
          </footer>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.fallback}>
      <h1 className={styles.fallbackTitle}>{found.title}</h1>
      <p className={styles.fallbackText}>
        Для этой статьи дизайн пока не подключен.
      </p>
    </main>
  );
}
