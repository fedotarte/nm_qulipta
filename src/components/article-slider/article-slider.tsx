"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import type { ArticleConfig } from "@/content";

import styles from "./article-slider.module.css";

import "swiper/css";

const ArrowIcon = ({
  className,
  fill,
}: {
  className?: string;
  fill?: string;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={fill ? fill : "none"}
    className={className}
  >
    <path
      d="M8.90961 20.67C8.71961 20.67 8.52961 20.6 8.37961 20.45C8.08961 20.16 8.08961 19.68 8.37961 19.39L14.8996 12.87C15.3796 12.39 15.3796 11.61 14.8996 11.13L8.37961 4.61002C8.08961 4.32002 8.08961 3.84002 8.37961 3.55002C8.66961 3.26002 9.14961 3.26002 9.43961 3.55002L15.9596 10.07C16.4696 10.58 16.7596 11.27 16.7596 12C16.7596 12.73 16.4796 13.42 15.9596 13.93L9.43961 20.45C9.28961 20.59 9.09961 20.67 8.90961 20.67Z"
      fill="#fff"
      stroke="#fff"
    />
  </svg>
);
const LockIcon = ({ className }: { className?: string }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M12 17.3501C12.9002 17.3501 13.63 16.6203 13.63 15.7201C13.63 14.8199 12.9002 14.0901 12 14.0901C11.0998 14.0901 10.37 14.8199 10.37 15.7201C10.37 16.6203 11.0998 17.3501 12 17.3501Z"
      fill="#135D6C"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.28 8.28V9.53C20.08 9.88 21 11.3 21 14.79V18.65C21 22.75 19.75 24 15.65 24H8.35C4.25 24 3 22.75 3 18.65V14.79C3 11.3 3.92 9.88 6.72 9.53V8.28C6.72 8.1326 6.71896 7.98257 6.7179 7.83065C6.69961 5.19978 6.67736 2 12 2C17.3226 2 17.3004 5.19978 17.2821 7.83065C17.281 7.98257 17.28 8.1326 17.28 8.28ZM8.12 9.44H8.35V9.45H15.65H15.88V8.28C15.88 8.16497 15.8803 8.05145 15.8805 7.9395C15.8868 5.19989 15.891 3.4 12 3.4C8.109 3.4 8.11316 5.19989 8.11948 7.9395C8.11974 8.05145 8.12 8.16497 8.12 8.28V9.44ZM12 12.7C10.34 12.7 8.98 14.05 8.98 15.72C8.98 16.7337 9.48343 17.6355 10.2557 18.1841V19.0614C10.2557 20.0259 11.0375 20.8077 12.002 20.8077C12.9664 20.8077 13.7482 20.0259 13.7482 19.0614V18.1841C14.5183 17.6372 15.02 16.7381 15.02 15.72C15.02 14.06 13.66 12.7 12 12.7Z"
      fill="#135D6C"
    />
  </svg>
);

const ArticleIcon = ({ className }: { className: string }) => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M16.6014 18.7949H14.2914C13.7547 18.7949 12.9731 18.6315 12.5181 18.1765L10.7214 16.7883L11.7947 15.3998L13.6731 16.8582C13.8131 16.9632 14.0697 17.0332 14.2914 17.0332H16.6014C16.9514 17.0332 17.3714 16.7298 17.4531 16.4265L18.9231 11.9349C18.9581 11.8415 18.9931 11.7132 18.9347 11.6199C18.8881 11.5499 18.7597 11.5032 18.6081 11.5032H16.1814C15.7497 11.5032 15.3414 11.3166 15.0497 10.99C14.7697 10.6633 14.6414 10.2199 14.6997 9.77657L15.0031 7.82819C15.0381 7.67652 14.9331 7.50158 14.8047 7.45492C14.6997 7.41992 14.5247 7.47819 14.4781 7.53652L11.9931 11.2349L10.5347 10.2549L13.0197 6.55656C13.5097 5.82156 14.5481 5.4832 15.3881 5.7982C16.3331 6.1132 16.9397 7.16321 16.7297 8.14321L16.4847 9.74154H18.6081C19.3431 9.74154 19.9847 10.0565 20.3697 10.6049C20.7431 11.1415 20.8247 11.8299 20.5914 12.4949L19.1447 16.9049C18.8764 17.9432 17.7564 18.7949 16.6014 18.7949Z"
      fill="white"
    />
    <path
      d="M9.98668 18.13H9.38001C7.56001 18.13 7.29169 16.8583 7.29169 16.1V10.1616C7.29169 9.40325 7.56001 8.13159 9.38001 8.13159H9.98668C11.8067 8.13159 12.075 9.40325 12.075 10.1616V16.1C12.075 16.8583 11.8067 18.13 9.98668 18.13ZM9.07669 16.3683C9.11169 16.3683 9.20501 16.38 9.38001 16.38H9.98668C10.1734 16.38 10.2783 16.3566 10.3133 16.345C10.3133 16.3216 10.325 16.2517 10.325 16.1V10.1616C10.325 10.0099 10.3134 9.92828 10.3017 9.90495C10.2784 9.90495 10.185 9.89327 9.98668 9.89327H9.38001C9.19335 9.89327 9.08835 9.91664 9.05335 9.9283C9.05335 9.95164 9.04169 10.0216 9.04169 10.1733V16.1117C9.04169 16.2634 9.05336 16.345 9.06503 16.38C9.06503 16.3683 9.07669 16.3683 9.07669 16.3683Z"
      fill="white"
    />
    <path
      d="M14 26.5416C13.1833 26.5416 12.355 26.2266 11.7367 25.6082L9.74167 23.6366C9.24001 23.1466 8.58666 22.8783 7.88666 22.8783H7C4.585 22.8783 2.625 20.93 2.625 18.5383V5.80994C2.625 3.41827 4.585 1.46997 7 1.46997H21C23.415 1.46997 25.375 3.41827 25.375 5.80994V18.5383C25.375 20.93 23.415 22.8783 21 22.8783H20.1133C19.4133 22.8783 18.7483 23.1466 18.2583 23.6366L16.2633 25.6082C15.645 26.2266 14.8167 26.5416 14 26.5416ZM7 3.20829C5.55333 3.20829 4.375 4.37492 4.375 5.79826V18.5266C4.375 19.9616 5.55333 21.1166 7 21.1166H7.88666C9.05333 21.1166 10.15 21.5716 10.9783 22.3882L12.9733 24.36C13.545 24.92 14.4667 24.92 15.0383 24.36L17.0333 22.3882C17.8617 21.5716 18.9583 21.1166 20.125 21.1166H21C22.4467 21.1166 23.625 19.95 23.625 18.5266V5.79826C23.625 4.36326 22.4467 3.20829 21 3.20829H7Z"
      fill="white"
    />
  </svg>
);

interface ArticleSliderProps {
  articles: ArticleConfig[];
}

export const ArticleSlider = ({ articles }: ArticleSliderProps) => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const updateNavState = (swiperInstance: SwiperType) => {
    setIsBeginning(swiperInstance.isBeginning);
    setIsEnd(swiperInstance.isEnd);
  };

  const containerClassName = `${styles.swiperContainer} ${
    isBeginning ? styles.maskRight : ""
  } ${isEnd ? styles.maskLeft : ""} ${
    !isBeginning && !isEnd ? styles.maskBoth : ""
  }`;

  return (
    <section className={styles.slider}>
      <div className={styles.desktopSlider}>
        <div className={containerClassName}>
          <Swiper
            modules={[Navigation]}
            slidesPerView="auto"
            spaceBetween={12}
            onSwiper={(s) => {
              setSwiper(s);
              updateNavState(s);
            }}
            onSlideChange={updateNavState}
            onReachBeginning={() => setIsBeginning(true)}
            onReachEnd={() => setIsEnd(true)}
            onFromEdge={() => {
              setIsBeginning(false);
              setIsEnd(false);
            }}
            className={styles.swiper}
          >
            {articles.map((article, index) => (
              <SwiperSlide key={article.id} className={styles.slide}>
                <ArticleCard article={article} isAuthenticated={index === 0} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Navigation buttons */}
        {!isBeginning && (
          <button
            className={`${styles.navButton} ${styles.navButtonPrev}`}
            onClick={() => swiper?.slidePrev()}
            aria-label="Предыдущий слайд"
          >
            <ArrowIcon />
          </button>
        )}
        {!isEnd && (
          <button
            className={`${styles.navButton} ${styles.navButtonNext}`}
            onClick={() => swiper?.slideNext()}
            aria-label="Следующий слайд"
          >
            <ArrowIcon />
          </button>
        )}
      </div>

      <div className={styles.mobileList}>
        {articles.map((article) => (
          <MobileArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
};

interface ArticleCardProps {
  article: ArticleConfig;
  isAuthenticated?: boolean;
}

export const ArticleCard = ({
  article,
  isAuthenticated = false,
}: ArticleCardProps) => {
  const isInDev = article.status === "in_dev";

  if (isInDev) {
    return (
      <div className={styles.cardDisabled}>
        <ArticleIcon className={styles.mobileIcon} />
        <h3 className={styles.cardTitle}>{article.title}</h3>
        <span className={styles.devBadge}>Материал в разработке</span>
        <ArrowIcon className={styles.cardArrowIconDisabled} />
      </div>
    );
  }

  const cardClassName = isAuthenticated ? styles.card : styles.cardLocked;

  return (
    <Link href={`/articles/${article.slug}`} className={cardClassName}>
      <ArticleIcon className={styles.mobileIcon} />
      {!isAuthenticated && <LockIcon className={styles.lockIcon} />}
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{article.title}</h3>
        <div className={styles.cardDivider} />
        {article.description && (
          <p
            className={
              isAuthenticated
                ? styles.cardDescription
                : styles.cardDescriptionBlurred
            }
          >
            {article.description}
          </p>
        )}
        <div className={styles.cardButton}>
          <span>
            {isAuthenticated ? "Перейти" : "Авторизуйтесь для просмотра"}
          </span>
          {isAuthenticated && <ArrowIcon className={styles.cardButtonArrow} />}
        </div>
      </div>
      <ArrowIcon className={styles.cardArrowIcon} />
    </Link>
  );
};

const MobileArticleCard = ({ article }: { article: ArticleConfig }) => {
  const isInDev = article.status === "in_dev";

  const content = (
    <>
      {article.icon && (
        <div className={styles.mobileIcon}>
          <Image src={article.icon} alt="" width={32} height={32} />
        </div>
      )}
      <h3 className={styles.mobileTitle}>{article.title}</h3>
      <ArrowIcon className={styles.mobileArrow} />
    </>
  );

  if (isInDev) {
    return <div className={styles.mobileCardDisabled}>{content}</div>;
  }

  return (
    <Link href={`/articles/${article.slug}`} className={styles.mobileCard}>
      {content}
    </Link>
  );
};
