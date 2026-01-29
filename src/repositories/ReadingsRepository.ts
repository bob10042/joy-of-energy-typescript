import { ElectricityReading } from '../models/ElectricityReading';
import { SEED_READINGS } from '../data/seedData';

export class ReadingsRepository {
  private readings: Map<string, ElectricityReading[]>;

  constructor() {
    // Initialize with seed data
    this.readings = new Map(Object.entries(SEED_READINGS));
  }

  store(smartMeterId: string, newReadings: ElectricityReading[]): void {
    const existingReadings = this.readings.get(smartMeterId) || [];
    this.readings.set(smartMeterId, [...existingReadings, ...newReadings]);
  }

  getReadings(smartMeterId: string): ElectricityReading[] | null {
    const readings = this.readings.get(smartMeterId);
    return readings && readings.length > 0 ? readings : null;
  }

  hasReadings(smartMeterId: string): boolean {
    const readings = this.readings.get(smartMeterId);
    return readings !== undefined && readings.length > 0;
  }

  getAllMeterIds(): string[] {
    return Array.from(this.readings.keys());
  }

  clear(): void {
    this.readings.clear();
  }
}

// Singleton instance for the application
export const readingsRepository = new ReadingsRepository();
