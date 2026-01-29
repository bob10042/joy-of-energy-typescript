import { PricePlanService } from '../../../src/services/PricePlanService';
import { MeterReadingService } from '../../../src/services/MeterReadingService';
import { ReadingsRepository } from '../../../src/repositories/ReadingsRepository';
import { ElectricityReading } from '../../../src/models/ElectricityReading';
import { PricePlan } from '../../../src/models/PricePlan';

describe('PricePlanService', () => {
  let pricePlanService: PricePlanService;
  let meterReadingService: MeterReadingService;
  let repository: ReadingsRepository;

  beforeEach(() => {
    repository = new ReadingsRepository();
    repository.clear();
    meterReadingService = new MeterReadingService(repository);
    pricePlanService = new PricePlanService(meterReadingService);
  });

  describe('calculateCost', () => {
    it('should return 0 for empty readings', () => {
      const plan: PricePlan = {
        planId: 'test',
        planName: 'Test Plan',
        energySupplier: 'Test',
        unitRate: 10,
      };
      const cost = pricePlanService.calculateCost([], plan);
      expect(cost).toBe(0);
    });

    it('should calculate cost based on average usage and unit rate', () => {
      const readings: ElectricityReading[] = [
        { time: 0, reading: 0.5 },
        { time: 3600, reading: 0.5 }, // 1 hour later
      ];
      const plan: PricePlan = {
        planId: 'test',
        planName: 'Test Plan',
        energySupplier: 'Test',
        unitRate: 2, // £2/kWh
      };
      
      // Total 1.0 kWh over 1 hour = 1.0 kWh/h average * £2 = £2
      const cost = pricePlanService.calculateCost(readings, plan);
      expect(cost).toBe(2);
    });
  });

  describe('compareAllPlans', () => {
    it('should return null when no readings exist', () => {
      const result = pricePlanService.compareAllPlans('non-existent');
      expect(result).toBeNull();
    });

    it('should compare all plans for a meter with readings', () => {
      // Store some readings
      meterReadingService.storeReadings({
        smartMeterId: 'smart-meter-0',
        electricityReadings: [
          { time: 0, reading: 0.5 },
          { time: 3600, reading: 0.5 },
        ],
      });

      const result = pricePlanService.compareAllPlans('smart-meter-0');
      
      expect(result).not.toBeNull();
      expect(result!.pricePlanComparisons).toHaveProperty('price-plan-0');
      expect(result!.pricePlanComparisons).toHaveProperty('price-plan-1');
      expect(result!.pricePlanComparisons).toHaveProperty('price-plan-2');
    });
  });

  describe('recommendCheaperPlans', () => {
    beforeEach(() => {
      meterReadingService.storeReadings({
        smartMeterId: 'smart-meter-0',
        electricityReadings: [
          { time: 0, reading: 0.5 },
          { time: 3600, reading: 0.5 },
        ],
      });
    });

    it('should return empty array when no readings exist', () => {
      const result = pricePlanService.recommendCheaperPlans('non-existent');
      expect(result).toEqual([]);
    });

    it('should return recommendations sorted by cost ascending', () => {
      const result = pricePlanService.recommendCheaperPlans('smart-meter-0');
      
      expect(result.length).toBeGreaterThan(0);
      
      // Verify ascending order
      for (let i = 1; i < result.length; i++) {
        const prevCost = Object.values(result[i - 1])[0];
        const currCost = Object.values(result[i])[0];
        expect(currCost).toBeGreaterThanOrEqual(prevCost);
      }
    });

    it('should respect limit parameter', () => {
      const result = pricePlanService.recommendCheaperPlans('smart-meter-0', 2);
      expect(result).toHaveLength(2);
    });

    it('should return cheapest plan first', () => {
      const result = pricePlanService.recommendCheaperPlans('smart-meter-0');
      
      // price-plan-2 has the lowest unit rate (£1/kWh)
      const firstPlanId = Object.keys(result[0])[0];
      expect(firstPlanId).toBe('price-plan-2');
    });
  });

  describe('getAllPricePlans', () => {
    it('should return all available price plans', () => {
      const plans = pricePlanService.getAllPricePlans();
      expect(plans).toHaveLength(3);
      expect(plans.map(p => p.planId)).toContain('price-plan-0');
      expect(plans.map(p => p.planId)).toContain('price-plan-1');
      expect(plans.map(p => p.planId)).toContain('price-plan-2');
    });
  });

  describe('getPricePlanForMeter', () => {
    it('should return correct plan for registered meter', () => {
      const plan = pricePlanService.getPricePlanForMeter('smart-meter-0');
      expect(plan).not.toBeNull();
      expect(plan!.planId).toBe('price-plan-0');
    });

    it('should return null for unregistered meter', () => {
      const plan = pricePlanService.getPricePlanForMeter('unknown-meter');
      expect(plan).toBeNull();
    });
  });
});
