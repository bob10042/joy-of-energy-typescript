export interface SmartMeterAccount {
  smartMeterId: string;
  pricePlanId: string;
}

export const SMART_METER_ACCOUNTS: SmartMeterAccount[] = [
  { smartMeterId: 'smart-meter-0', pricePlanId: 'price-plan-0' }, // Sarah - Dr Evil's Dark Energy
  { smartMeterId: 'smart-meter-1', pricePlanId: 'price-plan-1' }, // Peter - The Green Eco
  { smartMeterId: 'smart-meter-2', pricePlanId: 'price-plan-0' }, // Charlie - Dr Evil's Dark Energy
  { smartMeterId: 'smart-meter-3', pricePlanId: 'price-plan-2' }, // Andrea - Power for Everyone
  { smartMeterId: 'smart-meter-4', pricePlanId: 'price-plan-1' }, // Alex - The Green Eco
];
