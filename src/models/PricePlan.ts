export interface PricePlan {
  planId: string;
  planName: string;
  energySupplier: string;
  unitRate: number;           // £/kWh base rate
  peakTimeMultiplier?: number; // Optional: multiplier for peak hours
}

export interface PricePlanComparison {
  pricePlanId: string;
  pricePlanComparisons: Record<string, number>;
}

export interface PricePlanRecommendation {
  [planId: string]: number;
}
