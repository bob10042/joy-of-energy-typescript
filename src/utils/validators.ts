import { ReadingsRequest } from '../models/ElectricityReading';

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export const validateReadingsRequest = (body: any): ValidationResult => {
  if (!body) {
    return { valid: false, error: 'Request body is required' };
  }

  if (!body.smartMeterId || typeof body.smartMeterId !== 'string') {
    return { valid: false, error: 'Invalid or missing smartMeterId' };
  }

  if (body.smartMeterId.trim() === '') {
    return { valid: false, error: 'smartMeterId cannot be empty' };
  }

  if (!Array.isArray(body.electricityReadings)) {
    return { valid: false, error: 'electricityReadings must be an array' };
  }

  if (body.electricityReadings.length === 0) {
    return { valid: false, error: 'electricityReadings cannot be empty' };
  }

  for (let i = 0; i < body.electricityReadings.length; i++) {
    const reading = body.electricityReadings[i];
    
    if (reading.time === undefined || reading.time === null) {
      return { valid: false, error: `Reading at index ${i}: missing time field` };
    }

    if (typeof reading.time !== 'number' || !Number.isFinite(reading.time)) {
      return { valid: false, error: `Reading at index ${i}: time must be a valid number` };
    }

    if (reading.reading === undefined || reading.reading === null) {
      return { valid: false, error: `Reading at index ${i}: missing reading field` };
    }

    if (typeof reading.reading !== 'number' || !Number.isFinite(reading.reading)) {
      return { valid: false, error: `Reading at index ${i}: reading must be a valid number` };
    }

    if (reading.reading < 0) {
      return { valid: false, error: `Reading at index ${i}: reading must be non-negative` };
    }
  }

  return { valid: true };
};

export const validateSmartMeterId = (smartMeterId: string | undefined): ValidationResult => {
  if (!smartMeterId || typeof smartMeterId !== 'string') {
    return { valid: false, error: 'Smart meter ID is required' };
  }

  if (smartMeterId.trim() === '') {
    return { valid: false, error: 'Smart meter ID cannot be empty' };
  }

  return { valid: true };
};
