import Card from "../common/Card";
import StatusBadge from "../common/StatusBadge";
import type { AlertItem } from "../../types/dashboard";
import styles from "./AlertCard.module.css";

interface AlertCardProps {
  alert: AlertItem;
}

export default function AlertCard({ alert }: Readonly<AlertCardProps>) {
  return (
    <Card as="article" className={styles.card}>
      <div className={styles.topRow}>
        <div>
          <p className={styles.label}>Pile</p>
          <h3 className={styles.pileName}>{alert.pileName}</h3>
        </div>

        <StatusBadge status={alert.severity} />
      </div>

      <div className={styles.content}>
        <div>
          <span className={styles.label}>Sensors involved</span>
          <p className={styles.value}>{alert.sensorsInvolved}</p>
        </div>

        <div>
          <span className={styles.label}>Current reading</span>
          <p className={styles.value}>{alert.currentReading}</p>
        </div>

        <div>
          <span className={styles.label}>What to do next</span>
          <p className={styles.action}>{alert.action}</p>
        </div>
      </div>
    </Card>
  );
}
