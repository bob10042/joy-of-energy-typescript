import { MeterReadingService } from '../../../src/services/MeterReadingService';
import { ReadingsRepository } from '../../../src/repositories/ReadingsRepository';
import { ElectricityReading } from '../../../src/models/ElectricityReading';

describe('MeterReadingService', () => {
  let service: MeterReadingService;
  let repository: ReadingsRepository;

  beforeEach(() => {
    repository = new ReadingsRepository();
    repository.clear(); // Start fresh
    service = new MeterReadingService(repository);
  });

  describe('storeReadings', () => {
    it('should store readings for a smart meter', () => {
      const request = {
        smartMeterId: 'test-meter',
        electricityReadings: [
          { time: 1000, reading: 0.5 },
          { time: 2000, reading: 0.6 },
        ],
      };

      service.storeReadings(request);
      
      const readings = service.getReadings('test-meter');
      expect(readings).toHaveLength(2);
      expect(readings![0].reading).toBe(0.5);
    });

    it('should append readings to existing data', () => {
      const request1 = {
        smartMeterId: 'test-meter',
        electricityReadings: [{ time: 1000, reading: 0.5 }],
      };
      const request2 = {
        smartMeterId: 'test-meter',
        electricityReadings: [{ time: 2000, reading: 0.6 }],
      };

      service.storeReadings(request1);
      service.storeReadings(request2);

      const readings = service.getReadings('test-meter');
      expect(readings).toHaveLength(2);
    });
  });

  describe('getReadings', () => {
    it('should return null for non-existent meter', () => {
      const readings = service.getReadings('non-existent');
      expect(readings).toBeNull();
    });

    it('should return readings for existing meter', () => {
      const request = {
        smartMeterId: 'test-meter',
        electricityReadings: [{ time: 1000, reading: 0.5 }],
      };
      service.storeReadings(request);

      const readings = service.getReadings('test-meter');
      expect(readings).not.toBeNull();
      expect(readings).toHaveLength(1);
    });
  });

  describe('calculateAverageHourlyUsage', () => {
    it('should return 0 for empty readings', () => {
      const result = service.calculateAverageHourlyUsage([]);
      expect(result).toBe(0);
    });

    it('should return reading value for single reading', () => {
      const readings: ElectricityReading[] = [{ time: 1000, reading: 0.5 }];
      const result = service.calculateAverageHourlyUsage(readings);
      expect(result).toBe(0.5);
    });

    it('should calculate average for multiple readings over time', () => {
      // 2 readings, 1 hour apart, total 1.0 kWh
      const readings: ElectricityReading[] = [
        { time: 0, reading: 0.4 },
        { time: 3600, reading: 0.6 }, // 1 hour later
      ];
      const result = service.calculateAverageHourlyUsage(readings);
      expect(result).toBe(1.0); // 1.0 kWh over 1 hour = 1.0 kWh/h
    });

    it('should handle unordered readings', () => {
      const readings: ElectricityReading[] = [
        { time: 3600, reading: 0.6 },
        { time: 0, reading: 0.4 },
      ];
      const result = service.calculateAverageHourlyUsage(readings);
      expect(result).toBe(1.0);
    });
  });

  describe('hasReadings', () => {
    it('should return false for meter with no readings', () => {
      expect(service.hasReadings('non-existent')).toBe(false);
    });

    it('should return true for meter with readings', () => {
      service.storeReadings({
        smartMeterId: 'test-meter',
        electricityReadings: [{ time: 1000, reading: 0.5 }],
      });
      expect(service.hasReadings('test-meter')).toBe(true);
    });
  });
});
