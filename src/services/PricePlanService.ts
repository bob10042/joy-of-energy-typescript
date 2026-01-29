import { ElectricityReading } from '../models/ElectricityReading';
import { PricePlan, PricePlanComparison, PricePlanRecommendation } from '../models/PricePlan';
import { SmartMeterAccount, SMART_METER_ACCOUNTS } from '../models/SmartMeter';
import { PRICE_PLANS } from '../data/seedData';
import { MeterReadingService } from './MeterReadingService';

export class PricePlanService {
  private pricePlans: PricePlan[];
  private smartMeterAccounts: SmartMeterAccount[];

  constructor(private meterReadingService: MeterReadingService) {
    this.pricePlans = PRICE_PLANS;
    this.smartMeterAccounts = SMART_METER_ACCOUNTS;
  }

  /**
   * Calculate the cost for given readings under a specific price plan
   */
  calculateCost(readings: ElectricityReading[], pricePlan: PricePlan): number {
    if (readings.length === 0) {
      return 0;
    }

    const averageHourlyUsage = this.meterReadingService.calculateAverageHourlyUsage(readings);
    return averageHourlyUsage * pricePlan.unitRate;
  }

  /**
   * Get the current price plan for a smart meter
   */
  getPricePlanForMeter(smartMeterId: string): PricePlan | null {
    const account = this.smartMeterAccounts.find(a => a.smartMeterId === smartMeterId);
    if (!account) {
      return null;
    }

    return this.pricePlans.find(p => p.planId === account.pricePlanId) || null;
  }

  /**
   * Compare costs across all price plans for a given smart meter
   */
  compareAllPlans(smartMeterId: string): PricePlanComparison | null {
    const readings = this.meterReadingService.getReadings(smartMeterId);
    if (!readings || readings.length === 0) {
      return null;
    }

    const currentPlan = this.getPricePlanForMeter(smartMeterId);
    const pricePlanComparisons: Record<string, number> = {};

    for (const plan of this.pricePlans) {
      const cost = this.calculateCost(readings, plan);
      pricePlanComparisons[plan.planId] = Math.round(cost * 100) / 100; // Round to 2 decimal places
    }

    return {
      pricePlanId: currentPlan?.planId || 'unknown',
      pricePlanComparisons,
    };
  }

  /**
   * Recommend cheaper price plans, sorted from cheapest to most expensive
   */
  recommendCheaperPlans(smartMeterId: string, limit?: number): PricePlanRecommendation[] {
    const comparison = this.compareAllPlans(smartMeterId);
    if (!comparison) {
      return [];
    }

    // Convert to array and sort by cost (ascending)
    const recommendations = Object.entries(comparison.pricePlanComparisons)
      .map(([planId, cost]) => ({ [planId]: cost }))
      .sort((a, b) => {
        const costA = Object.values(a)[0];
        const costB = Object.values(b)[0];
        return costA - costB;
      });

    // Apply limit if specified
    if (limit && limit > 0) {
      return recommendations.slice(0, limit);
    }

    return recommendations;
  }

  /**
   * Get all available price plans
   */
  getAllPricePlans(): PricePlan[] {
    return this.pricePlans;
  }
}
