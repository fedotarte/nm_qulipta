import Image from "next/image";
import styles from "./page.module.css";
import {
  ArticleSlider,
  ArticleCard,
  Footer,
  Header,
  Hero,
  ScrollShadowList,
} from "@/components";
import { getAllArticles } from "@/content";

export default function Home() {
  const articles = getAllArticles();

  return (
    <div className={styles.page}>
      <Image
        src="/pictures/cheetah.jpg"
        alt=""
        fill
        className={styles.backgroundVideo}
        priority
      />
      <div className={styles.globalMobileFide}></div>
      <div className={styles.globalMobileFideBottom}></div>
      <Header />

      <main className={styles.main}>
        <Hero title="Быстрее, чем мигрень" subtitle="" description="">
          <ArticleSlider articles={articles} />
        </Hero>
        <ScrollShadowList>
          {articles.map((article, index) => {
            return (
              <ArticleCard
                article={article}
                key={article.id}
                isAuthenticated={index === 0}
              />
            );
          })}
        </ScrollShadowList>
      </main>

      <Footer />
    </div>
  );
}
