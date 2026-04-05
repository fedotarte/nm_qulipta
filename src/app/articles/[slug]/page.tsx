import { notFound } from "next/navigation";
import Link from "next/link";
import { ARTICLES } from "@/content";
import { Footer } from "@/components";
import { LightboxImage } from "./LightboxImage";
import { ReferencesAccordion } from "./ReferencesAccordion";
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
        <header className={styles.topBar}>
          <div className={styles.topBarInner}>
            <Link href="/" aria-label="На главную">
              <img
                src="/icons/logo.svg"
                alt="КЬЮЛИПТА"
                className={styles.topBrandLogo}
              />
            </Link>
            <button type="button" className={styles.accountButton}>
              <img
                src="/icons/profile-circle.svg"
                alt=""
                aria-hidden="true"
                className={styles.accountButtonIcon}
              />
              Личный кабинет
            </button>
          </div>
        </header>

        <div className={styles.desktop}>
          <div className={styles.contentGrid}>
            <section className={styles.mainColumn}>
              <h1 className={styles.title}>ЭПИЗОДИЧЕСКАЯ МИГРЕНЬ</h1>

              <article className={styles.section}>
                <h2 className={styles.sectionTitle}>
                  КЬЮЛИПТА ОБЛАДАЕТ ВЫСОКИМ СРОДСТВОМ И АКТИВНОСТЬЮ К CGRP-РЕЦЕПТОРУ
                </h2>
                <LightboxImage
                  src="/pictures/cgrp-affinity-activity.png"
                  alt="Иллюстрация механизма действия"
                  className={styles.sectionImage}
                />
              </article>

              <article className={styles.section}>
                <h2 className={styles.sectionTitle}>
                  ПРЕВЕНТИВНАЯ ТЕРАПИЯ МИГРЕНИ, КОТОРАЯ МОЖЕТ ДЕЙСТВОВАТЬ БЫСТРО
                </h2>
                <LightboxImage
                  src="/pictures/episodic-migraine-2-1-1.png"
                  alt="Сокращение среднего числа дней с мигренью"
                  className={styles.sectionImage}
                />
              </article>

              <article className={styles.section}>
                <h2 className={styles.sectionTitle}>
                  У КАЖДОГО ВТОРОГО ПАЦИЕНТА К КОНЦУ 1 ГОДА ТЕРАПИИ ЗАФИКСИРОВАНО
                  ПОЛНОЕ ПРЕКРАЩЕНИЕ ПРИСТУПОВ
                </h2>
                <LightboxImage
                  src="/pictures/episodic-migraine-3-2-1.png"
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
                  <div className={styles.aeLayout}>
                    <div className={styles.aeTopMenu}>
                      <span className={styles.aeTopMenuPrimary}>
                        ЭПИЗОДИЧЕСКАЯ МИГРЕНЬ, 60 мг
                      </span>
                      <span className={styles.aeTopMenuSecondary}>
                        ИССЛЕДОВАНИЕ ADVANCE
                      </span>
                    </div>

                    <div className={styles.aeContent}>
                      <ul className={styles.aeFacts}>
                        <li>
                          <span className={styles.aeIconCircle}>
                            <img
                              src="/icons/ae-shield.svg"
                              alt=""
                              aria-hidden="true"
                              className={styles.aeIconShield}
                            />
                          </span>
                          <p>
                            В 12-недельном исследовании препарат Кьюлипта 60 мг
                            характеризовался хорошей переносимостью по
                            сравнению с плацебо в течение 12 недель
                          </p>
                        </li>
                        <li>
                          <span
                            className={`${styles.aeIconCircle} ${styles.aeIconHours}`}
                          >
                            11
                            <br />
                            часов
                          </span>
                          <p>Период полувыведения атогепанта 11 часов</p>
                        </li>
                        <li>
                          <span className={styles.aeIconCircle}>
                            <img
                              src="/icons/ae-target.svg"
                              alt=""
                              aria-hidden="true"
                              className={styles.aeIconGlyph}
                            />
                          </span>
                          <p>
                            У пациентов, принимавших Кьюлипта 60 мг или плацебо,
                            не было зарегистрировано серьезных НЯ, связанных с
                            лечением
                          </p>
                        </li>
                      </ul>

                      <LightboxImage
                        src="/pictures/episodic-migraine-group-4.png"
                        alt="Частота нежелательных явлений"
                        className={styles.aeCardImage}
                      />
                    </div>
                  </div>
                </div>
              </article>

              <LightboxImage
                src="/pictures/episodic-migraine-frame-163.png"
                alt="Блок с преимуществами и упаковкой"
                className={`${styles.sectionImage} ${styles.packageBlockImage}`}
              />

              <LightboxImage
                src="/pictures/episodic-migraine-frame-194.png"
                alt="В каких случаях рекомендуется модификация дозы до 10 мг"
                className={`${styles.sectionImage} ${styles.doseAdjustmentImage}`}
              />

              <section className={styles.studyBlock}>
                <div className={styles.studyQrColumn}>
                  <p className={styles.studyQrCaption}>
                    общая характеристика
                    <br />
                    лекарственного
                    <br />
                    препарата КЬЮЛИПТА
                  </p>
                  <img
                    src="/icons/qr.svg"
                    alt="QR-код с дополнительной информацией"
                    className={styles.studyQr}
                  />
                </div>
                <p className={styles.studyText}>
                  Исследование ADVANCE: 12-недельное многоцентровое двойное
                  слепое рандомизированное плацебо-контролируемое исследование
                  фазы III в параллельных группах с целью изучения эффективности
                  и безопасности препарата Кьюлипта для профилактики
                  эпизодической мигрени. Включало пациентов, соответствующих
                  критериям международной классификации головных болей (ICHD)
                  для диагностики мигрени с аурой или без (от 4 до 14 дней с
                  мигренью в месяц). Оценка эффективности основывалась на
                  первичной конечной точке - снижении среднего количества дней с
                  мигренью в месяц по сравнению с исходным уровнем в течение 12
                  недель.
                  <br />
                  <br />
                  Открытое 52-недельное исследование безопасности: 744 пациента
                  были рандомизированы в соотношении 5:2 в группу препарата
                  Кьюлипта 60 мг (N = 546) или стандартной терапии для
                  профилактики мигрени (n = 198). В исследование были включены
                  взрослые пациенты из предыдущего исследования фазы IIb/III,
                  повторно подтвердившие соответствие критериям включения для
                  участия в исследовании, а также новые пациенты. У участников
                  отмечалось от 4 до 14 дней с мигренью в 28-дневный период на
                  этапе включения. Показатели эффективности: изменение среднего
                  количества дней с мигренью в месяц по методу наименьших
                  квадратов по сравнению с уровнем на этапе включения, дней
                  умеренной/тяжелой головной боли, среднемесячного количества
                  дней приема лекарственных препаратов для купирования приступов
                  и долю ответивших на лечение на основании уменьшения
                  количества дней с мигренью в месяц оценивали в популяции mITT
                  (n = 521 пациентов, получавших препарат Кьюлипта) при
                  использовании модели смешанных эффектов для повторных
                  измерений. Конечные точки эффективности для оценки
                  долгосрочной эффективности не классифицировались как
                  первичные, вторичные или дополнительные. Данные о клинической
                  эффективности были получены только в группе препарата Кьюлипта
                  посредством данных eDiary.
                </p>
              </section>

              <section className={styles.disclaimer}>
                CGRP - кальцитонин ген родственный пептид R-CGRP - рецептор к
                кальцитонин ген родственному пептиду mITT - модифицированная
                популяция всех пациентов с назначенным лечением ДММ - дни с
                мигренью в месяц
                <br />
                <br />
                *Ki - константа ингибирования рецептора, является мерой
                сродства ингибитора к рецептору и показывает, насколько сильно
                ингибитор подавляет активность рецептора. Низкая Ki указывает на
                сильное сродство ингибитора к рецептору, требуется меньшая
                концентрация ингибитора для достижения того же уровня
                ингибирования.
                <br />
                † - Пациентов с 4-14 днями мигрени в месяц рандомизировали в
                группу приема КЬЮЛИПТА 60 мг 1 раз в день или группу приема
                стандартной профилактической терапии. Эффективность оценивалась
                только в группе КЬЮЛИПТА. В исследование включено 546 пациентов
                (mITT - 521), лечение завершили 373 пациента.
                <br />
                ‡ - *0% приступов определяется как 0 дней с мигренью в
                определенный период (или специфический интервал)
              </section>

              <section className={styles.references}>
                <ReferencesAccordion
                  references={[
                    "Haanes KA, Edvinsson L. Pathophysiological Mechanisms in Migraine and the Identification of New Therapeutic Targets. CNS Drugs. 2019 Jun;33(6):525-537.",
                    "Moore E, et al. Pharmacologic characterization of atogepant: A potent and selective calcitonin gene-related peptide receptor antagonist. Cephalalgia. 2024 Jan;44(1):3331024231226186.",
                    "Blair HA. Rimegepant: A Review in the Acute Treatment and Preventive Treatment of Migraine. CNS Drugs. 2023 Mar;37(3):255-265.",
                    "Andreou AP, et al. The role of erenumab in the treatment of migraine. Ther Adv Neurol Disord. 2020 May 27:13:1756286420927119.",
                    "Ohlsson L, et al. Fremanezumab blocks CGRP induced dilatation in human cerebral, middle meningeal and abdominal arteries. J Headache Pain. 2018 Aug 14;19(1):66.",
                    "Ailani J, et al. Atogepant for the preventive treatment of migraine. NEnglJ Med. 2021;385:695-706.",
                    "Schwedt TJ, Lipton RB, Ailani J, et al. Time course of efficacy of atogepant for the preventive treatment of migraine: results from the randomized, double-blind ADVANCE trial. Cephalalgia 2022; 42: 3-11.",
                    "Ashina M, Tepper SJ, Reuter U, et al. Once-daily oral atogepant for the long-term preventive treatment of migraine: Findings from a multicenter, randomized, open-label, phase 3 trial. Headache. 2023;63(1):79-88.",
                    "ОХЛП Кьюлипта ЛП-№(006822)-(РГ-RU), https://lk.regmed.ru/Register/EAEU_SmPC, дата обращения январь 2026",
                  ]}
                  accordionClassName={styles.referencesAccordion}
                  titleClassName={styles.referencesTitle}
                  arrowClassName={styles.referencesArrow}
                  listClassName={styles.referencesList}
                />
              </section>
            </section>

            <aside className={styles.sidebar}>
              <button type="button" className={styles.sidebarMainButton}>
                <span>Хроническая мигрень</span>
                <img
                  src="/icons/arrow-right4.svg"
                  alt=""
                  aria-hidden="true"
                  className={styles.sidebarMainButtonIcon}
                />
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

        </div>
        <Footer />
      </main>
    );
  }

  if (slug === "chronic-migraine") {
    return (
      <main className={styles.page}>
        <header className={styles.topBar}>
          <div className={styles.topBarInner}>
            <Link href="/" aria-label="На главную">
              <img
                src="/icons/logo.svg"
                alt="КЬЮЛИПТА"
                className={styles.topBrandLogo}
              />
            </Link>
            <button type="button" className={styles.accountButton}>
              <img
                src="/icons/profile-circle.svg"
                alt=""
                aria-hidden="true"
                className={styles.accountButtonIcon}
              />
              Личный кабинет
            </button>
          </div>
        </header>

        <div className={styles.desktop}>
          <div className={styles.contentGrid}>
            <section className={styles.mainColumn}>
              <h1 className={styles.title}>ХРОНИЧЕСКАЯ МИГРЕНЬ</h1>

              <article className={styles.section}>
                <h2 className={styles.sectionTitle}>
                  ПРЕВЕНТИВНАЯ ТЕРАПИЯ МИГРЕНИ, КОТОРАЯ МОЖЕТ ДЕЙСТВОВАТЬ БЫСТРО
                </h2>
                <LightboxImage
                  src="/pictures/chronic-frame-170.png"
                  alt="Изменение среднего количества дней с мигренью в месяц"
                  className={styles.sectionImage}
                />
              </article>

              <article className={styles.section}>
                <h2 className={styles.sectionTitle}>
                  ПРЕВЕНТИВНАЯ ТЕРАПИЯ МИГРЕНИ, КОТОРАЯ МОЖЕТ ЭФФЕКТИВНО
                  СОКРАЩАТЬ КОЛИЧЕСТВО ДНЕЙ С МИГРЕНЬЮ В МЕСЯЦ
                </h2>
                <LightboxImage
                  src="/pictures/chronic-7-1.png"
                  alt="Снижение среднего числа дней с мигренью в месяц на 50% и более"
                  className={styles.sectionImage}
                />
              </article>

              <article className={styles.section}>
                <h2 className={styles.sectionTitle}>
                  ПРЕВЕНТИВНАЯ ТЕРАПИЯ МИГРЕНИ, КОТОРАЯ ХОРОШО ПЕРЕНОСИТСЯ
                </h2>
                <div className={styles.aeCardWrap}>
                  <div className={styles.aeLayout}>
                    <div className={styles.aeTopMenu}>
                      <span className={styles.aeTopMenuPrimary}>
                        ХРОНИЧЕСКАЯ МИГРЕНЬ, 60 мг
                      </span>
                      <span className={styles.aeTopMenuSecondary}>
                        ИССЛЕДОВАНИЕ PROGRESS
                      </span>
                    </div>

                    <div className={styles.aeContent}>
                      <ul className={styles.aeFacts}>
                        <li>
                          <span className={styles.aeIconCircle}>
                            <img
                              src="/icons/ae-shield.svg"
                              alt=""
                              aria-hidden="true"
                              className={styles.aeIconShield}
                            />
                          </span>
                          <p>
                            В 12-недельном исследовании препарат Кьюлипта 60 мг
                            характеризовался хорошей переносимостью по
                            сравнению с плацебо в течение 12 недель
                          </p>
                        </li>
                        <li>
                          <span
                            className={`${styles.aeIconCircle} ${styles.aeIconHours}`}
                          >
                            11
                            <br />
                            часов
                          </span>
                          <p>Период полувыведения атогепанта 11 часов</p>
                        </li>
                        <li>
                          <span className={styles.aeIconCircle}>
                            <img
                              src="/icons/ae-target.svg"
                              alt=""
                              aria-hidden="true"
                              className={styles.aeIconGlyph}
                            />
                          </span>
                          <p>
                            У пациентов, принимавших Кьюлипта 60 мг или плацебо,
                            не было зарегистрировано серьезных НЯ, связанных с
                            лечением
                          </p>
                        </li>
                      </ul>

                      <LightboxImage
                        src="/pictures/episodic-migraine-group-4.png"
                        alt="Частота нежелательных явлений"
                        className={styles.aeCardImage}
                      />
                    </div>
                  </div>
                </div>
              </article>

              <LightboxImage
                src="/pictures/chronic-frame-163.png"
                alt="Блок с преимуществами и упаковкой"
                className={`${styles.sectionImage} ${styles.packageBlockImage}`}
              />

              <LightboxImage
                src="/pictures/chronic-frame-194.png"
                alt="В каких случаях рекомендуется модификация дозы до 10 мг"
                className={`${styles.sectionImage} ${styles.doseAdjustmentImage}`}
              />

              <section className={styles.studyBlock}>
                <div className={styles.studyQrColumn}>
                  <p className={styles.studyQrCaption}>
                    общая характеристика
                    <br />
                    лекарственного
                    <br />
                    препарата КЬЮЛИПТА
                  </p>
                  <img
                    src="/icons/qr.svg"
                    alt="QR-код с дополнительной информацией"
                    className={styles.studyQr}
                  />
                </div>
                <div className={styles.chronicStudyRight}>
                  <p className={styles.studyText}>
                    Исследование PROGRESS: 12-недельное многоцентровое двойное
                    слепое рандомизированное плацебо-контролируемое исследование
                    фазы III в параллельных группах с целью изучения
                    эффективности и безопасности препарата Кьюлипта для
                    профилактики хронической мигрени. Включало пациентов,
                    соответствующих критериям международной классификации
                    головных болей (ICHD) для хронической мигрени. Оценка
                    эффективности основывалась на первичной конечной точке -
                    снижение среднего количества дней с мигренью в месяц по
                    сравнению с исходным уровнем в течение 12 недель.
                  </p>

                  <section
                    className={`${styles.references} ${styles.chronicReferences}`}
                  >
                    <ol
                      className={`${styles.referencesList} ${styles.chronicReferencesList}`}
                    >
                      <li>
                        ОХЛП Кьюлипта ЛП-№(006822)-(РГ-RU),
                        https://lk.regmed.ru/Register/EAEU_SmPC, дата обращения
                        март 2026.
                      </li>
                      <li>
                        Pozo-Rosich P, et al. Atogepant for the preventive
                        treatment of chronic migraine (PROGRESS), Lancet. 2023;
                        402(10404):775-785. Epub 2023 Jul 26. Erratum in:
                        Lancet. 2023 Sep 2;402(10404):774. Erratum in: Lancet.
                        2023 Oct 14;402(10410):1328.
                      </li>
                    </ol>
                  </section>
                </div>
              </section>
            </section>

            <aside className={styles.sidebar}>
              <button type="button" className={styles.sidebarMainButton}>
                <span>Эпизодическая мигрень</span>
                <img
                  src="/icons/arrow-right4.svg"
                  alt=""
                  aria-hidden="true"
                  className={styles.sidebarMainButtonIcon}
                />
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
        </div>
        <Footer />
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
