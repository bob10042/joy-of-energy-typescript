import { ElectricityReading, ReadingsRequest } from '../models/ElectricityReading';
import { ReadingsRepository } from '../repositories/ReadingsRepository';

export class MeterReadingService {
  constructor(private readingsRepository: ReadingsRepository) {}

  storeReadings(request: ReadingsRequest): void {
    this.readingsRepository.store(request.smartMeterId, request.electricityReadings);
  }

  getReadings(smartMeterId: string): ElectricityReading[] | null {
    return this.readingsRepository.getReadings(smartMeterId);
  }

  hasReadings(smartMeterId: string): boolean {
    return this.readingsRepository.hasReadings(smartMeterId);
  }

  /**
   * Calculate the average hourly consumption from readings
   */
  calculateAverageHourlyUsage(readings: ElectricityReading[]): number {
    if (readings.length < 2) {
      return readings.length === 1 ? readings[0].reading : 0;
    }

    // Sort readings by time
    const sortedReadings = [...readings].sort((a, b) => a.time - b.time);

    // Calculate total energy and time span
    const totalEnergy = sortedReadings.reduce((sum, r) => sum + r.reading, 0);
    const timeSpanSeconds = sortedReadings[sortedReadings.length - 1].time - sortedReadings[0].time;
    const timeSpanHours = timeSpanSeconds / 3600;

    if (timeSpanHours === 0) {
      return totalEnergy;
    }

    return totalEnergy / timeSpanHours;
  }
}
