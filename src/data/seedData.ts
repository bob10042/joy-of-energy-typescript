import { PricePlan } from '../models/PricePlan';
import { ElectricityReading } from '../models/ElectricityReading';

export const PRICE_PLANS: PricePlan[] = [
  {
    planId: 'price-plan-0',
    planName: "Dr Evil's Dark Energy",
    energySupplier: 'Dr Evil',
    unitRate: 10, // £10/kWh - most expensive
  },
  {
    planId: 'price-plan-1',
    planName: 'The Green Eco',
    energySupplier: 'Green Energy',
    unitRate: 2, // £2/kWh - mid-range
  },
  {
    planId: 'price-plan-2',
    planName: 'Power for Everyone',
    energySupplier: 'Power Co',
    unitRate: 1, // £1/kWh - cheapest
  },
];

// Generate some seed readings for testing
function generateReadings(smartMeterId: string, count: number = 5): ElectricityReading[] {
  const readings: ElectricityReading[] = [];
  const baseTime = Math.floor(Date.now() / 1000) - (count * 3600); // Start from hours ago
  
  for (let i = 0; i < count; i++) {
    readings.push({
      time: baseTime + (i * 3600), // Each reading 1 hour apart
      reading: Math.random() * 0.5 + 0.1, // Random reading between 0.1 and 0.6 kWh
    });
  }
  
  return readings;
}

export const SEED_READINGS: Record<string, ElectricityReading[]> = {
  'smart-meter-0': generateReadings('smart-meter-0', 5),
  'smart-meter-1': generateReadings('smart-meter-1', 5),
  'smart-meter-2': generateReadings('smart-meter-2', 5),
  'smart-meter-3': generateReadings('smart-meter-3', 5),
  'smart-meter-4': generateReadings('smart-meter-4', 5),
};
