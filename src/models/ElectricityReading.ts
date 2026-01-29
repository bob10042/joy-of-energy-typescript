export interface ElectricityReading {
  time: number;    // Unix timestamp
  reading: number; // kWh reading
}

export interface ReadingsRequest {
  smartMeterId: string;
  electricityReadings: ElectricityReading[];
}
