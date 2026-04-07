import type { PileStatus, SensorStatus } from "../../types/dashboard";
import styles from "./StatusBadge.module.css";

interface StatusBadgeProps {
  status: PileStatus | SensorStatus;
  compact?: boolean;
}

export default function StatusBadge({
  status,
  compact = false,
}: Readonly<StatusBadgeProps>) {
  let statusClass;
  if (status === "OK") {
    statusClass = styles.ok;
  } else if (status === "Warning") {
    statusClass = styles.warning;
  } else if (status === "Critical") {
    statusClass = styles.critical;
  } else {
    statusClass = styles.faulty;
  }

  return (
    <span
      className={`${styles.badge} ${statusClass} ${compact ? styles.compact : ""}`}
    >
      {status}
    </span>
  );
}
