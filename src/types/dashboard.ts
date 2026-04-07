export type PileStatus = "OK" | "Warning" | "Critical";
export type SensorStatus = PileStatus | "Faulty";
export type LayerName = "bottom" | "middle" | "top";

export interface SensorIssue {
  sensorRange: string;
  layer: LayerName;
  issue: string;
  temperatureC?: number;
  moisturePct?: number;
}

export interface SensorBall {
  id: string;
  label: string;
  layer: LayerName;
  x: number;
  y: number;
  z: number;
  status: SensorStatus;
  temperatureC?: number;
  moisturePct?: number;
  note?: string;
}

export interface Pile {
  id: string;
  siteName: string;
  pileName: string;
  status: PileStatus;
  mostSensors: {
    temperatureC: number;
    moisturePct: number;
  };
  problemSensors: SensorIssue[];
  sensors: SensorBall[];
}

export interface AlertItem {
  id: string;
  pileId: string;
  pileName: string;
  severity: "Warning" | "Critical";
  sensorsInvolved: string;
  currentReading: string;
  action: string;
}
