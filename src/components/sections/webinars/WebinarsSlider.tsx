"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

import type { WebinarSlide } from "./webinarSlides";
import styles from "./Webinars.module.css";

import "swiper/css";

const ArrowIcon = ({ className }: { className: string }) => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M8.90961 20.67C8.71961 20.67 8.52961 20.6 8.37961 20.45C8.08961 20.16 8.08961 19.68 8.37961 19.39L14.8996 12.87C15.3796 12.39 15.3796 11.61 14.8996 11.13L8.37961 4.61002C8.08961 4.32002 8.08961 3.84002 8.37961 3.55002C8.66961 3.26002 9.14961 3.26002 9.43961 3.55002L15.9596 10.07C16.4696 10.58 16.7596 11.27 16.7596 12C16.7596 12.73 16.4796 13.42 15.9596 13.93L9.43961 20.45C9.28961 20.59 9.09961 20.67 8.90961 20.67Z"
      fill="white"
      stroke="white"
    />
  </svg>
);

const PlayIcon = () => (
  <Image src="/icons/play-circle.svg" alt="" width={24} height={24} aria-hidden />
);

const CardTail = ({ color }: { color: string }) => (
  <svg
    width="24"
    height="16"
    viewBox="0 0 24 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M0 0H24C24 6.98148 19.0814 12.9964 12.2389 14.3826L7.71972 15.2981C5.98808 15.6488 4.61074 13.8543 5.39742 12.2723L6.37958 10.2971C8.73481 5.56079 5.28963 0 0 0Z"
      fill={color}
    />
  </svg>
);

const WebinarCardTitle = ({ title }: { title: string }) => {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const titleElement = titleRef.current;
    if (!titleElement) return;

    const updateTruncationState = () => {
      setIsTruncated(titleElement.scrollHeight > titleElement.clientHeight + 1);
    };

    updateTruncationState();

    const resizeObserver = new ResizeObserver(updateTruncationState);
    resizeObserver.observe(titleElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, [title]);

  return (
    <h2
      ref={titleRef}
      className={styles.cardTitle}
      title={isTruncated ? title : undefined}
    >
      {title}
    </h2>
  );
};

interface WebinarsSliderProps {
  slides: WebinarSlide[];
}

export function WebinarsSlider({ slides }: WebinarsSliderProps) {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const updateNavState = (swiperInstance: SwiperType) => {
    setIsBeginning(swiperInstance.isBeginning);
    setIsEnd(swiperInstance.isEnd);
  };

  const sliderContainerClassName = `${styles.sliderContainer} ${
    isBeginning ? styles.hideLeftMask : ""
  } ${isEnd ? styles.hideRightMask : ""}`;

  return (
    <div className={sliderContainerClassName}>
      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: `.${styles.nextButton}`,
          prevEl: `.${styles.prevButton}`,
        }}
        slidesPerView="auto"
        spaceBetween={16}
        breakpoints={{
          980: {
            spaceBetween: 18,
          },
          1280: {
            spaceBetween: 18,
          },
        }}
        onSwiper={updateNavState}
        onSlideChange={updateNavState}
        onReachBeginning={() => setIsBeginning(true)}
        onReachEnd={() => setIsEnd(true)}
        onFromEdge={() => {
          setIsBeginning(false);
          setIsEnd(false);
        }}
        className={styles.swiper}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className={styles.slide}>
            <div className={styles.slideContent}>
              <article
                className={`${styles.card} ${
                  slide.style === "orange" ? styles.cardOrange : styles.cardBlue
                }`}
              >
                <div className={styles.preview}>
                  <Image
                    src={slide.previewImage}
                    alt={slide.title}
                    fill
                    className={styles.previewImage}
                    sizes="(max-width: 980px) 90vw, 360px"
                  />
                </div>
                <WebinarCardTitle title={slide.title} />
                <button
                  type="button"
                  className={styles.watchButton}
                  data-video-url={slide.videoUrl ?? ""}
                  aria-label={`Смотреть: ${slide.title}`}
                >
                  <span>Смотреть</span>
                  <PlayIcon />
                </button>
              </article>
              <div className={styles.cardTail}>
                <CardTail color={slide.style === "orange" ? "#F15E22" : "#107E9A"} />
              </div>
              <div className={styles.speaker}>
                <div className={styles.speakerText}>
                  <p className={styles.speakerName}>{slide.speakerName}</p>
                  <p className={styles.speakerBio}>{slide.speakerBio}</p>
                </div>
                <Image
                  src={slide.speakerImage}
                  alt={slide.speakerName}
                  width={88}
                  height={88}
                  className={styles.speakerPhoto}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        type="button"
        className={`${styles.navButton} ${styles.prevButton} ${
          isBeginning ? styles.navButtonHidden : ""
        }`}
        aria-label="Предыдущий слайд"
      >
        <ArrowIcon className={styles.navArrowPrev} />
      </button>
      <button
        type="button"
        className={`${styles.navButton} ${styles.nextButton} ${
          isEnd ? styles.navButtonHidden : ""
        }`}
        aria-label="Следующий слайд"
      >
        <ArrowIcon className={styles.navArrowNext} />
      </button>
    </div>
  );
}
