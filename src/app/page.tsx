"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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

type HeroVisualKey = "home" | "chronic" | "episodic" | "quiz";

const HOVER_IMAGE_DEBOUNCE_MS = 120;
const DEFAULT_HERO_VISUAL: HeroVisualKey = "home";
const DEFAULT_HERO_IMAGE_SRC = "/pictures/cheetah_hero.png";
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
const HERO_VISUAL_BY_SLUG: Record<string, HeroVisualKey> = {
  "chronic-migraine": "chronic",
  "episodic-migraine": "episodic",
  "interactive-quiz": "quiz",
};
const HERO_DIMMING_BY_VISUAL: Record<HeroVisualKey, number> = {
  home: 0.04,
  chronic: 0.04,
  episodic: 0,
  quiz: 0.1,
};
const URL_ACTIVE_TAB_KEY = "tab";

export default function Home() {
  const articles = getAllArticles();
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

  const [activeHeroVisual, setActiveHeroVisual] =
    useState<HeroVisualKey>(DEFAULT_HERO_VISUAL);
  const [activeCardSlug, setActiveCardSlug] = useState<string | null>(null);
  const activeCardSlugRef = useRef<string | null>(null);
  const activeHeroImageSrc =
    (activeCardSlug && heroImageBySlug.get(activeCardSlug)) ??
    DEFAULT_HERO_IMAGE_SRC;
  const activeHeroDimming = HERO_DIMMING_BY_VISUAL[activeHeroVisual];
  const isEpisodicVisual = activeHeroVisual === "episodic";
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const syncUrlWithActiveTab = useCallback((slug: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set(URL_ACTIVE_TAB_KEY, slug);
    url.hash = slug;
    window.history.replaceState(window.history.state, "", url);
  }, []);

  const scheduleVisualUpdate = useCallback((nextVisual: HeroVisualKey) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    hoverTimeoutRef.current = setTimeout(() => {
      setActiveHeroVisual(nextVisual);
    }, HOVER_IMAGE_DEBOUNCE_MS);
  }, []);

  const handleCardHoverStart = useCallback(
    (article: ArticleConfig) => {
      setActiveCardSlug(article.slug);
      activeCardSlugRef.current = article.slug;
      syncUrlWithActiveTab(article.slug);

      const heroVisual = HERO_VISUAL_BY_SLUG[article.slug];
      if (!heroVisual) {
        return;
      }

      scheduleVisualUpdate(heroVisual);
    },
    [scheduleVisualUpdate, syncUrlWithActiveTab],
  );

  const handleCardHoverEnd = useCallback(() => {
    const slug = activeCardSlugRef.current;
    const pinnedVisual =
      (slug && HERO_VISUAL_BY_SLUG[slug]) ?? DEFAULT_HERO_VISUAL;
    scheduleVisualUpdate(pinnedVisual as HeroVisualKey);
  }, [scheduleVisualUpdate]);

  useEffect(() => {
    const syncStateWithUrl = () => {
      const url = new URL(window.location.href);
      const tabSlug = url.searchParams.get("tab");
      const hashSlug = url.hash.replace(/^#/, "");
      const fromUrl = tabSlug || hashSlug;

      if (!fromUrl || !HERO_CARD_SLUGS.has(fromUrl)) {
        setActiveCardSlug(null);
        setActiveHeroVisual(DEFAULT_HERO_VISUAL);
        return;
      }

      setActiveCardSlug(fromUrl);
      const visualFromTab = HERO_VISUAL_BY_SLUG[fromUrl];
      setActiveHeroVisual(visualFromTab ?? DEFAULT_HERO_VISUAL);
    };

    syncStateWithUrl();
    window.addEventListener("hashchange", syncStateWithUrl);
    window.addEventListener("popstate", syncStateWithUrl);

    return () => {
      window.removeEventListener("hashchange", syncStateWithUrl);
      window.removeEventListener("popstate", syncStateWithUrl);
    };
  }, []);

  useEffect(
    () => () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    },
    [],
  );

  return (
    <div className={styles.page} data-visual={activeHeroVisual}>
      <BackgroundImageLayer
        src={activeHeroImageSrc}
        dimming={activeHeroDimming}
        objectFit={isEpisodicVisual ? "contain" : undefined}
        objectPosition={isEpisodicVisual ? "right center" : undefined}
      />
      <div
        className={styles.heroDesktopGradient}
        data-visual={activeHeroVisual}
        aria-hidden="true"
      />
      <div className={styles.globalMobileFide}></div>
      <div className={styles.globalMobileFideBottom}></div>
      <Header />

      <main className={styles.main}>
        <Hero
          title="Быстрее, чем мигрень"
          subtitle=""
          description="Единственный гепант для превентивной терапии хронической мигрени, одобренный в РФ*"
          disclaimer="* ОХЛП Кьюлипта ЛП-№(006822)-(РГ-RU), https://lk.regmed.ru/Register/EAEU_SmPC, дата обращения март 2026; регистрационное удостоверение ЛП-№(006822)-(РГ-RU) от 09.09.2024"
        >
          <ArticleSlider
            articles={orderedArticles}
            onCardHoverStart={handleCardHoverStart}
            onCardHoverEnd={handleCardHoverEnd}
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
