import Card from "../common/Card";
import StatusBadge from "../common/StatusBadge";
import type { Pile } from "../../types/dashboard";
import styles from "./PileCard.module.css";

interface PileCardProps {
  pile: Pile;
  isSelected: boolean;
  onSelect: (pileId: string) => void;
}

export default function PileCard({
  pile,
  isSelected,
  onSelect,
}: Readonly<PileCardProps>) {
  return (
    <button className={styles.button} onClick={() => onSelect(pile.id)}>
      <Card
        className={`${styles.card} ${isSelected ? styles.selected : ""}`}
        elevation="soft"
      >
        <div className={styles.header}>
          <div>
            <p className={styles.siteName}>{pile.siteName}</p>
            <h3 className={styles.pileName}>{pile.pileName}</h3>
          </div>
          <StatusBadge status={pile.status} />
        </div>

        <div className={styles.metrics}>
          <div className={styles.metric}>
            <span className={styles.metricLabel}>Most sensors</span>
            <span className={styles.metricValue}>
              {pile.mostSensors.temperatureC}°C / {pile.mostSensors.moisturePct}
              % moisture
            </span>
          </div>

          <div className={styles.metric}>
            <span className={styles.metricLabel}>Problem sensors</span>
            <span className={styles.metricValue}>
              {pile.problemSensors.length === 0
                ? "None"
                : pile.problemSensors
                    .map((issue) => issue.sensorRange)
                    .join(", ")}
            </span>
          </div>
        </div>
      </Card>
    </button>
  );
}
