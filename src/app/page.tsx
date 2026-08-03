"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./page.module.css";
import {
  ArticleSlider,
  ArticleCard,
  BackgroundImageLayer,
  Footer,
  Header,
  Hero,
  ScrollShadowList,
} from "@/components";
import type { ArticleConfig } from "@/content";
import { getAllArticles } from "@/content";

const DEFAULT_HERO_IMAGE_SRC = "/pictures/cheetah-hero.png";
const HERO_CARD_ORDER = [
  "chronic-migraine",
  "episodic-migraine",
  "interactive-quiz",
  "clinical-cases",
  "expert-answers",
  "webinar-recordings",
  "library",
] as const;
const HERO_CARD_SLUGS = new Set<string>(HERO_CARD_ORDER);
const URL_ACTIVE_TAB_KEY = "tab";
const HERO_LEGAL_TEXT = `Кьюлипта (атогепант)
Ознакомиться с полной инструкцией по медицинскому применению лекарственного препарата/ОХЛП можно по ссылке
ЛП-№ (006822)-(РГ-RU). Дата регистрации 09.09.2024

* Препарат КЬЮЛИПТА показан для профилактического лечения мигрени, возникающей не менее 4 дней в месяц, у взрослых в возрасте от 18 лет1.
Пациенты с эпизодической мигренью в исследовании ADVANCE2, и пациенты с хронической мигренью в исследовании PROGRESS3, получавшие препарат КЬЮЛИПТА в дозе 60 мг один раз в сутки, в течение 12 недель достигли основные конечные точки эффективности и продемонстрировали статистически значимое уменьшение среднего количества дней с мигренью в месяц по сравнению с плацебо.

1. ОХЛП Кьюлипта ЛП-№ (006822)-(РГ-RU), https://lk.regmed.ru/Register/EAEU_SmPC, дата обращения июнь 2026;
2. Ailani J, et al. N Engl J Med. 2021; 385: 695–706.
3. Pozo-Rosich P, et al. Lancet. 2023;402(10404):775–785; erratum, 2023.

** ОХЛП Кьюлипта ЛП-№(006822)-(РГ-RU), https://lk.regmed.ru/Register/EAEU_SmPC, дата обращения июнь 2026; регистрационное удостоверение ЛП-№(006822)-(РГ-RU) от 09.09.2024
https://grls.rosminzdrav.ru/`;

function preloadHeroImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const image = new window.Image();
    let isSettled = false;

    const finish = () => {
      if (isSettled) {
        return;
      }

      isSettled = true;
      image.onload = null;
      image.onerror = null;
      resolve();
    };

    image.onload = () => {
      if (!image.decode) {
        finish();
        return;
      }

      image.decode().then(finish, finish);
    };
    image.onerror = finish;
    image.src = src;

    if (image.complete) {
      if (!image.decode) {
        finish();
        return;
      }

      image.decode().then(finish, finish);
    }
  });
}

export default function Home() {
  const articles = useMemo(() => getAllArticles(), []);
  const orderedArticles = useMemo(() => {
    const bySlug = new Map(articles.map((article) => [article.slug, article]));
    return HERO_CARD_ORDER.map((slug) => bySlug.get(slug)).filter(
      (article): article is ArticleConfig => Boolean(article),
    );
  }, [articles]);
  const heroImageBySlug = useMemo(() => {
    const imageEntries = articles.flatMap((article) =>
      article.heroImage ? [[article.slug, article.heroImage] as const] : [],
    );
    return new Map<string, string>(imageEntries);
  }, [articles]);
  const heroImageSources = useMemo(
    () =>
      Array.from(
        new Set([DEFAULT_HERO_IMAGE_SRC, ...heroImageBySlug.values()]),
      ),
    [heroImageBySlug],
  );

  const [activeCardSlug, setActiveCardSlug] = useState<string | null>(null);
  const [areHeroImagesReady, setAreHeroImagesReady] = useState(false);
  const activeHeroImageSrc =
    (activeCardSlug && heroImageBySlug.get(activeCardSlug)) ??
    DEFAULT_HERO_IMAGE_SRC;
  const syncUrlWithActiveTab = useCallback((slug: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set(URL_ACTIVE_TAB_KEY, slug);
    url.hash = slug;
    window.history.replaceState(window.history.state, "", url);
  }, []);

  const handleCardHoverStart = useCallback(
    (article: ArticleConfig) => {
      setActiveCardSlug(article.slug);
      syncUrlWithActiveTab(article.slug);
    },
    [syncUrlWithActiveTab],
  );

  useEffect(() => {
    let isCancelled = false;

    setAreHeroImagesReady(false);

    Promise.allSettled(heroImageSources.map(preloadHeroImage)).then(() => {
      if (!isCancelled) {
        setAreHeroImagesReady(true);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [heroImageSources]);

  useEffect(() => {
    const syncStateWithUrl = () => {
      const url = new URL(window.location.href);
      const tabSlug = url.searchParams.get("tab");
      const hashSlug = url.hash.replace(/^#/, "");
      const fromUrl = tabSlug || hashSlug;

      if (!fromUrl || !HERO_CARD_SLUGS.has(fromUrl)) {
        setActiveCardSlug(null);
        return;
      }

      setActiveCardSlug(fromUrl);
    };

    syncStateWithUrl();
    window.addEventListener("hashchange", syncStateWithUrl);
    window.addEventListener("popstate", syncStateWithUrl);

    return () => {
      window.removeEventListener("hashchange", syncStateWithUrl);
      window.removeEventListener("popstate", syncStateWithUrl);
    };
  }, []);

  return (
    <div className={styles.page}>
      <BackgroundImageLayer src={activeHeroImageSrc} priority />
      {!areHeroImagesReady && (
        <div className={styles.pageLoader} role="status" aria-live="polite">
          <span>Загрузка...</span>
        </div>
      )}
      <Header />

      <main className={styles.main}>
        <Hero
          title="Опережая мигрень*"
          subtitle=""
          description="Единственный гепант для превентивной терапии хронической мигрени, одобренный в РФ**."
          legalText={HERO_LEGAL_TEXT}
        >
          <ArticleSlider
            articles={orderedArticles}
            onCardHoverStart={handleCardHoverStart}
            activeArticleSlug={activeCardSlug}
          />
        </Hero>
        <ScrollShadowList>
          {orderedArticles.map((article, index) => {
            return (
              <ArticleCard
                article={article}
                key={article.id}
                isAuthenticated={article.isAuthenticated ?? index === 0}
                isActive={activeCardSlug === article.slug}
              />
            );
          })}
        </ScrollShadowList>
      </main>

      <Footer />
    </div>
  );
}
