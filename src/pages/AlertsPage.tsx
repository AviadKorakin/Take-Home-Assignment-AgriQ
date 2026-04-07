import { alerts } from "../data/mockData";
import AlertCard from "../components/alerts/AlertCard";
import styles from "./AlertsPage.module.css";

export default function AlertsPage() {
  return (
    <section className={styles.page}>
      <div className={styles.pageHeader}>
        <h2 className={styles.title}>Alerts</h2>
        <p className={styles.description}>
          Active issues that need operator attention now.
        </p>
      </div>

      <div className={styles.grid}>
        {alerts.map((alert) => (
          <AlertCard key={alert.id} alert={alert} />
        ))}
      </div>
    </section>
  );
}
