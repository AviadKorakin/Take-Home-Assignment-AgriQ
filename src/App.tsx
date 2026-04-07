import { useState } from "react";
import styles from "./App.module.css";
import SitesPage from "./pages/SitesPage";
import AlertsPage from "./pages/AlertsPage";
import Header from "./components/layout/Header";

export type AppPage = "sites" | "alerts";

export default function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>("sites");

  return (
    <div className={styles.appShell}>
      <Header currentPage={currentPage} onChangePage={setCurrentPage} />

      <main className={styles.pageContent}>
        {currentPage === "sites" ? <SitesPage /> : <AlertsPage />}
      </main>
    </div>
  );
}
