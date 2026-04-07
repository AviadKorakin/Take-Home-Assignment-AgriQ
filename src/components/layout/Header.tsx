import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { AppPage } from "../../App";
import styles from "./Header.module.css";

interface HeaderProps {
  readonly currentPage: AppPage;
  readonly onChangePage: (page: AppPage) => void;
}

export default function Header({
  currentPage,
  onChangePage,
}: Readonly<HeaderProps>) {
  const navRef = useRef<HTMLElement | null>(null);
  const sitesRef = useRef<HTMLButtonElement | null>(null);
  const alertsRef = useRef<HTMLButtonElement | null>(null);

  const [indicatorStyle, setIndicatorStyle] = useState({
    width: 0,
    x: 0,
  });

  useLayoutEffect(() => {
    const activeButton =
      currentPage === "sites" ? sitesRef.current : alertsRef.current;

    if (!navRef.current || !activeButton) {
      return;
    }

    setIndicatorStyle({
      width: activeButton.offsetWidth,
      x: activeButton.offsetLeft,
    });
  }, [currentPage]);

  useEffect(() => {
    const handleResize = () => {
      const activeButton =
        currentPage === "sites" ? sitesRef.current : alertsRef.current;

      if (!navRef.current || !activeButton) {
        return;
      }

      setIndicatorStyle({
        width: activeButton.offsetWidth,
        x: activeButton.offsetLeft,
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [currentPage]);

  return (
    <header className={styles.header}>
      <div className={styles.leftGroup}>
        <div className={styles.brand}>
          <h1 className={styles.title}>agriQ</h1>
        </div>

        <nav ref={navRef} className={styles.nav} aria-label="Main navigation">
          <span
            className={styles.activeIndicator}
            style={{
              width: `${indicatorStyle.width}px`,
              transform: `translateX(${indicatorStyle.x}px)`,
            }}
            aria-hidden="true"
          />

          <button
            ref={sitesRef}
            className={`${styles.navButton} ${
              currentPage === "sites" ? styles.active : ""
            }`}
            onClick={() => onChangePage("sites")}
          >
            Sites
          </button>

          <button
            ref={alertsRef}
            className={`${styles.navButton} ${
              currentPage === "alerts" ? styles.active : ""
            }`}
            onClick={() => onChangePage("alerts")}
          >
            Alerts
          </button>
        </nav>
      </div>
    </header>
  );
}
