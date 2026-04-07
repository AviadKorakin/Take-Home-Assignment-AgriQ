import StatusBadge from "../common/StatusBadge";
import type { LayerName, SensorBall } from "../../types/dashboard";
import styles from "./SensorGrid.module.css";

interface SensorGridProps {
  sensors: SensorBall[];
}

const LAYER_ORDER: LayerName[] = ["top", "middle", "bottom"];

export default function SensorGrid({ sensors }: Readonly<SensorGridProps>) {
  return (
    <div className={styles.wrapper}>
      {LAYER_ORDER.map((layer) => {
        const layerSensors = sensors.filter((sensor) => sensor.layer === layer);

        return (
          <section key={layer} className={styles.layerSection}>
            <div className={styles.layerHeader}>
              <h4 className={styles.layerTitle}>
                {layer.charAt(0).toUpperCase() + layer.slice(1)} layer
              </h4>
              <span className={styles.layerMeta}>
                {layerSensors.length} sensors
              </span>
            </div>

            <div className={styles.grid}>
              {layerSensors.map((sensor) => (
                <div key={sensor.id} className={styles.sensorCard}>
                  <div className={styles.sensorTop}>
                    <strong className={styles.sensorLabel}>
                      {sensor.label}
                    </strong>
                    <StatusBadge status={sensor.status} compact />
                  </div>

                  <div className={styles.sensorDetails}>
                    <span>
                      Temp:{" "}
                      {sensor.temperatureC === undefined
                        ? "—"
                        : `${sensor.temperatureC}°C`}
                    </span>
                    <span>
                      Moisture:{" "}
                      {sensor.moisturePct === undefined
                        ? "—"
                        : `${sensor.moisturePct}%`}
                    </span>
                    {sensor.note ? <span>Note: {sensor.note}</span> : null}
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
