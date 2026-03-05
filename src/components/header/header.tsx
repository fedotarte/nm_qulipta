"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./header.module.css";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Handle Escape key press
  useEffect(() => {
    const controller = new AbortController();
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleEscape, {
      signal: controller.signal,
    });
    return () => {
      document.removeEventListener("keydown", handleEscape);
      controller.abort();
    };
  }, [isMenuOpen, closeMenu]);

  // Prevent body scroll and add class when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("drawer-open");
    } else {
      document.body.style.overflow = "";
      document.body.classList.remove("drawer-open");
    }

    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("drawer-open");
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={`${styles.header} ${isMenuOpen ? styles.headerHidden : ""}`}
      >
        <nav className={styles.nav}>
          <button type="button" className={styles.loginButton}>
            Войти
          </button>
          <button
            type="button"
            className={styles.burgerButton}
            onClick={toggleMenu}
            aria-label="Открыть меню"
            aria-expanded={isMenuOpen}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M35 12.9167H5C4.31667 12.9167 3.75 12.3501 3.75 11.6667C3.75 10.9834 4.31667 10.4167 5 10.4167H35C35.6833 10.4167 36.25 10.9834 36.25 11.6667C36.25 12.3501 35.6833 12.9167 35 12.9167Z"
                fill="white"
              />
              <path
                d="M35 21.25H5C4.31667 21.25 3.75 20.6833 3.75 20C3.75 19.3167 4.31667 18.75 5 18.75H35C35.6833 18.75 36.25 19.3167 36.25 20C36.25 20.6833 35.6833 21.25 35 21.25Z"
                fill="white"
              />
              <path
                d="M35 29.5833H5C4.31667 29.5833 3.75 29.0166 3.75 28.3333C3.75 27.6499 4.31667 27.0833 5 27.0833H35C35.6833 27.0833 36.25 27.6499 36.25 28.3333C36.25 29.0166 35.6833 29.5833 35 29.5833Z"
                fill="white"
              />
            </svg>
          </button>
        </nav>
        <div className={styles.separator} />
      </header>

      {/* Mobile Drawer */}
      <div
        className={`${styles.drawer} ${isMenuOpen ? styles.drawerOpen : ""}`}
        aria-hidden={!isMenuOpen}
      >
        <div className={styles.drawerContent}>
          <button
            type="button"
            className={styles.drawerCloseButton}
            onClick={closeMenu}
            aria-label="Закрыть меню"
          >
            <svg
              width="46"
              height="46"
              viewBox="0 0 46 46"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.8837 32.3108L32.3112 11.8832C33.0091 11.1853 33.9886 11.0072 34.4718 11.4904C34.955 11.9736 34.7769 12.953 34.079 13.651L13.6514 34.0785C12.9535 34.7765 11.974 34.9545 11.4908 34.4714C11.0076 33.9882 11.1857 33.0087 11.8837 32.3108Z"
                fill="white"
              />
              <path
                d="M11.4908 11.4906C11.974 11.0074 12.9535 11.1855 13.6514 11.8834L34.079 32.3109C34.7769 33.0089 34.955 33.9883 34.4718 34.4715C33.9886 34.9547 33.0091 34.7766 32.3112 34.0787L11.8837 13.6512C11.1857 12.9532 11.0076 11.9737 11.4908 11.4906Z"
                fill="white"
              />
            </svg>
          </button>

          <nav className={styles.drawerNav}>
            <Link
              href="/materials"
              className={styles.drawerLink}
              onClick={closeMenu}
            >
              Практические материалы
            </Link>
            <Link
              href="/therapy"
              className={styles.drawerLink}
              onClick={closeMenu}
            >
              Для терапии
            </Link>
          </nav>

          <button type="button" className={styles.drawerLoginButton}>
            Личный кабинет
          </button>

          <div className={styles.drawerFooter}>
            <Image
              src="/icons/abbvy_footer_logo_2.svg"
              alt="AbbVie"
              width={120}
              height={40}
              className={styles.drawerLogo}
            />

            <div className={styles.drawerFooterText}>
              <p>
                Информацию о нежелательных явлениях, связанных с применением
                препаратов компании «ЭббВи», необходимо направить по
                адресу:{" "}
              </p>
              <Link href="mailto:ruabhvie@abbvie.com">ruabhvie@abbvie.com</Link>
            </div>

            <div className={styles.drawerFooterText}>
              <p>
                Материал подготовлен при поддержке ООО «ЭббВи», 125196, Москва,
                ул. Лесная, д. 7
                <br />
                Тел: <Link href="tel:+74952584277">+7 (495) 258-42-77</Link>
              </p>
            </div>

            <div className={styles.drawerFooterText}>
              <p>
                Информация предназначена исключительно для специалистов
                здравоохранения Российской Федерации.
              </p>
              <p>Номер одобрения: RU-XXX-TEST-250011 Июнь 2025.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className={styles.overlay}
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
};
