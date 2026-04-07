import type { AlertItem, Pile, SensorBall } from "../types/dashboard";

const buildSensors = (
  prefix: string,
  normalTemp: number,
  normalMoisture: number,
  overrides: Partial<SensorBall & { id: string }>[],
): SensorBall[] => {
  const sensors: SensorBall[] = [];

  for (let i = 1; i <= 30; i++) {
    const label = `S${String(i).padStart(2, "0")}`;
    let layer: string;
    if (i <= 10) {
      layer = "bottom";
    } else if (i <= 20) {
      layer = "middle";
    } else {
      layer = "top";
    }

    let z: number;
    if (layer === "bottom") {
      z = 2;
    } else if (layer === "middle") {
      z = 5;
    } else {
      z = 8;
    }

    sensors.push({
      id: `${prefix}-${label}`,
      label,
      layer: layer as SensorBall["layer"],
      x: ((i - 1) % 5) * 10 + 5,
      y: (Math.floor((i - 1) / 5) % 2) * 10 + 5,
      z,
      status: "OK",
      temperatureC: normalTemp,
      moisturePct: normalMoisture,
    });
  }

  for (const override of overrides) {
    const idx = sensors.findIndex((s) => s.id === override.id);
    if (idx >= 0) {
      sensors[idx] = { ...sensors[idx], ...override };
    }
  }

  return sensors;
};

export const piles: Pile[] = [
  {
    id: "emek-north",
    siteName: "Main Site",
    pileName: "Emek North",
    status: "OK",
    mostSensors: { temperatureC: 21, moisturePct: 12.5 },
    problemSensors: [],
    sensors: buildSensors("emek-north", 21, 12.5, []),
  },
  {
    id: "emek-south",
    siteName: "Main Site",
    pileName: "Emek South",
    status: "Warning",
    mostSensors: { temperatureC: 28, moisturePct: 13.2 },
    problemSensors: [
      {
        sensorRange: "S01-S04",
        layer: "bottom",
        issue: "High temperature and moisture in bottom layer",
        temperatureC: 44,
        moisturePct: 16.1,
      },
    ],
    sensors: buildSensors("emek-south", 28, 13.2, [
      {
        id: "emek-south-S01",
        status: "Warning",
        temperatureC: 44,
        moisturePct: 16.1,
      },
      {
        id: "emek-south-S02",
        status: "Warning",
        temperatureC: 44,
        moisturePct: 16.1,
      },
      {
        id: "emek-south-S03",
        status: "Warning",
        temperatureC: 44,
        moisturePct: 16.1,
      },
      {
        id: "emek-south-S04",
        status: "Warning",
        temperatureC: 44,
        moisturePct: 16.1,
      },
    ]),
  },
  {
    id: "emek-east",
    siteName: "Main Site",
    pileName: "Emek East",
    status: "Critical",
    mostSensors: { temperatureC: 26, moisturePct: 13 },
    problemSensors: [
      {
        sensorRange: "S11-S15",
        layer: "middle",
        issue: "Critical heat and moisture in middle layer",
        temperatureC: 51,
        moisturePct: 18.4,
      },
      {
        sensorRange: "S28",
        layer: "top",
        issue: "Erratic readings, possible faulty sensor",
      },
    ],
    sensors: buildSensors("emek-east", 26, 13, [
      {
        id: "emek-east-S11",
        status: "Critical",
        temperatureC: 51,
        moisturePct: 18.4,
      },
      {
        id: "emek-east-S12",
        status: "Critical",
        temperatureC: 51,
        moisturePct: 18.4,
      },
      {
        id: "emek-east-S13",
        status: "Critical",
        temperatureC: 51,
        moisturePct: 18.4,
      },
      {
        id: "emek-east-S14",
        status: "Critical",
        temperatureC: 51,
        moisturePct: 18.4,
      },
      {
        id: "emek-east-S15",
        status: "Critical",
        temperatureC: 51,
        moisturePct: 18.4,
      },
      { id: "emek-east-S28", status: "Faulty", note: "Erratic readings" },
    ]),
  },
  {
    id: "emek-west",
    siteName: "Main Site",
    pileName: "Emek West",
    status: "Warning",
    mostSensors: { temperatureC: 35, moisturePct: 14.8 },
    problemSensors: [
      {
        sensorRange: "S06-S08",
        layer: "bottom",
        issue: "Rising heat and moisture in bottom layer",
        temperatureC: 39,
        moisturePct: 16.2,
      },
    ],
    sensors: buildSensors("emek-west", 35, 14.8, [
      {
        id: "emek-west-S06",
        status: "Warning",
        temperatureC: 39,
        moisturePct: 16.2,
      },
      {
        id: "emek-west-S07",
        status: "Warning",
        temperatureC: 39,
        moisturePct: 16.2,
      },
      {
        id: "emek-west-S08",
        status: "Warning",
        temperatureC: 39,
        moisturePct: 16.2,
      },
    ]),
  },
];

export const alerts: AlertItem[] = [
  {
    id: "alert-1",
    pileId: "emek-south",
    pileName: "Emek South",
    severity: "Warning",
    sensorsInvolved: "S01-S04 (bottom)",
    currentReading: "44°C / 16.1% moisture",
    action: "Inspect the bottom layer and increase monitoring frequency.",
  },
  {
    id: "alert-2",
    pileId: "emek-east",
    pileName: "Emek East",
    severity: "Critical",
    sensorsInvolved: "S11-S15 (middle)",
    currentReading: "51°C / 18.4% moisture",
    action: "Immediate inspection and intervention required.",
  },
  {
    id: "alert-3",
    pileId: "emek-east",
    pileName: "Emek East",
    severity: "Warning",
    sensorsInvolved: "S28 (top)",
    currentReading: "Erratic readings",
    action: "Check sensor health and verify whether replacement is needed.",
  },
  {
    id: "alert-4",
    pileId: "emek-west",
    pileName: "Emek West",
    severity: "Warning",
    sensorsInvolved: "S06-S08 (bottom)",
    currentReading: "39°C / 16.2% moisture",
    action: "Inspect the bottom layer and watch for further spread.",
  },
];
