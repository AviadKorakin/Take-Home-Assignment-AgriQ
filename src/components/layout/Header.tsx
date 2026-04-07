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
  return (
    <header className={styles.header}>
      <div className={styles.leftGroup}>
        <div className={styles.brand}>
          <h1 className={styles.title}>agriQ</h1>
        </div>

        <nav className={styles.nav} aria-label="Main navigation">
          <button
            className={`${styles.navButton} ${
              currentPage === "sites" ? styles.active : ""
            }`}
            onClick={() => onChangePage("sites")}
          >
            Sites
          </button>

          <button
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
