import Card from "../common/Card";
import StatusBadge from "../common/StatusBadge";
import SensorGrid from "./SensorGrid";
import type { Pile } from "../../types/dashboard";
import styles from "./SelectedPilePanel.module.css";

interface SelectedPilePanelProps {
  pile: Pile;
}

export default function SelectedPilePanel({
  pile,
}: Readonly<SelectedPilePanelProps>) {
  return (
    <Card className={styles.panel} padding="lg" elevation="raised">
      <div className={styles.header}>
        <div>
          <p className={styles.siteName}>{pile.siteName}</p>
          <h3 className={styles.pileName}>{pile.pileName}</h3>
        </div>
        <StatusBadge status={pile.status} />
      </div>

      <div className={styles.summary}>
        <div className={styles.summaryItem}>
          <span className={styles.label}>Most sensors</span>
          <span className={styles.value}>
            {pile.mostSensors.temperatureC}°C / {pile.mostSensors.moisturePct}%
            moisture
          </span>
        </div>

        <div className={styles.summaryItem}>
          <span className={styles.label}>Problem sensors</span>
          <span className={styles.value}>
            {pile.problemSensors.length === 0
              ? "None"
              : `${pile.problemSensors.length} active issue(s)`}
          </span>
        </div>
      </div>

      {pile.problemSensors.length > 0 && (
        <div className={styles.issues}>
          <h4 className={styles.issuesTitle}>Current issues</h4>
          <ul className={styles.issueList}>
            {pile.problemSensors.map((issue) => (
              <li
                key={`${issue.layer}-${issue.sensorRange}`}
                className={styles.issueItem}
              >
                <strong>{issue.sensorRange}</strong> ({issue.layer}) —{" "}
                {issue.issue}
                {issue.temperatureC != null || issue.moisturePct != null ? (
                  <>
                    {" "}
                    —{" "}
                    {issue.temperatureC == null
                      ? "—"
                      : `${issue.temperatureC}°C`}{" "}
                    /{" "}
                    {issue.moisturePct == null
                      ? "—"
                      : `${issue.moisturePct}% moisture`}
                  </>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      )}

      <SensorGrid sensors={pile.sensors} />
    </Card>
  );
}
