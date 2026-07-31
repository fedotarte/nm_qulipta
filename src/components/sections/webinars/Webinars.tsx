"use client";

import Image from "next/image";
import Link from "next/link";
import { WebinarsSlider } from "./WebinarsSlider";
import { webinarSlides } from "./webinarSlides";

import styles from "./Webinars.module.css";

const HeaderLogo = () => (
  <Link href="/" className={styles.headerLogo} aria-label="На главную">
    <Image
      src="/icons/logo.svg"
      alt="КЬЮЛИПТА"
      width={128}
      height={40}
      className={styles.headerLogoImage}
    />
  </Link>
);

export function Webinars() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <HeaderLogo />
        <h1 className={styles.title}>Записи вебинаров</h1>
        <button type="button" className={styles.profileButton}>
          <Image src="/icons/profile-circle.svg" alt="" width={24} height={24} />
          <span>Личный кабинет</span>
        </button>
      </div>
      <WebinarsSlider slides={webinarSlides} />
    </section>
  );
}

