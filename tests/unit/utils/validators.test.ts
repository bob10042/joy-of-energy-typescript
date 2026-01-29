import { validateReadingsRequest, validateSmartMeterId } from '../../../src/utils/validators';

describe('Validators', () => {
  describe('validateReadingsRequest', () => {
    it('should reject null body', () => {
      const result = validateReadingsRequest(null);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('required');
    });

    it('should reject undefined body', () => {
      const result = validateReadingsRequest(undefined);
      expect(result.valid).toBe(false);
    });

    it('should reject missing smartMeterId', () => {
      const result = validateReadingsRequest({
        electricityReadings: [{ time: 1000, reading: 0.5 }],
      });
      expect(result.valid).toBe(false);
      expect(result.error).toContain('smartMeterId');
    });

    it('should reject non-string smartMeterId', () => {
      const result = validateReadingsRequest({
        smartMeterId: 123,
        electricityReadings: [{ time: 1000, reading: 0.5 }],
      });
      expect(result.valid).toBe(false);
      expect(result.error).toContain('smartMeterId');
    });

    it('should reject empty smartMeterId', () => {
      const result = validateReadingsRequest({
        smartMeterId: '   ',
        electricityReadings: [{ time: 1000, reading: 0.5 }],
      });
      expect(result.valid).toBe(false);
      expect(result.error).toContain('empty');
    });

    it('should reject non-array electricityReadings', () => {
      const result = validateReadingsRequest({
        smartMeterId: 'test-meter',
        electricityReadings: 'not-an-array',
      });
      expect(result.valid).toBe(false);
      expect(result.error).toContain('array');
    });

    it('should reject empty electricityReadings array', () => {
      const result = validateReadingsRequest({
        smartMeterId: 'test-meter',
        electricityReadings: [],
      });
      expect(result.valid).toBe(false);
      expect(result.error).toContain('empty');
    });

    it('should reject reading with missing time', () => {
      const result = validateReadingsRequest({
        smartMeterId: 'test-meter',
        electricityReadings: [{ reading: 0.5 }],
      });
      expect(result.valid).toBe(false);
      expect(result.error).toContain('time');
    });

    it('should reject reading with invalid time type', () => {
      const result = validateReadingsRequest({
        smartMeterId: 'test-meter',
        electricityReadings: [{ time: 'invalid', reading: 0.5 }],
      });
      expect(result.valid).toBe(false);
      expect(result.error).toContain('time');
    });

    it('should reject reading with missing reading field', () => {
      const result = validateReadingsRequest({
        smartMeterId: 'test-meter',
        electricityReadings: [{ time: 1000 }],
      });
      expect(result.valid).toBe(false);
      expect(result.error).toContain('reading');
    });

    it('should reject reading with invalid reading type', () => {
      const result = validateReadingsRequest({
        smartMeterId: 'test-meter',
        electricityReadings: [{ time: 1000, reading: 'invalid' }],
      });
      expect(result.valid).toBe(false);
      expect(result.error).toContain('reading');
    });

    it('should reject negative reading value', () => {
      const result = validateReadingsRequest({
        smartMeterId: 'test-meter',
        electricityReadings: [{ time: 1000, reading: -0.5 }],
      });
      expect(result.valid).toBe(false);
      expect(result.error).toContain('non-negative');
    });

    it('should accept valid request', () => {
      const result = validateReadingsRequest({
        smartMeterId: 'test-meter',
        electricityReadings: [
          { time: 1000, reading: 0.5 },
          { time: 2000, reading: 0.6 },
        ],
      });
      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should reject reading with Infinity time', () => {
      const result = validateReadingsRequest({
        smartMeterId: 'test-meter',
        electricityReadings: [{ time: Infinity, reading: 0.5 }],
      });
      expect(result.valid).toBe(false);
    });

    it('should reject reading with Infinity reading', () => {
      const result = validateReadingsRequest({
        smartMeterId: 'test-meter',
        electricityReadings: [{ time: 1000, reading: Infinity }],
      });
      expect(result.valid).toBe(false);
    });
  });

  describe('validateSmartMeterId', () => {
    it('should reject undefined', () => {
      const result = validateSmartMeterId(undefined);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('required');
    });

    it('should reject empty string', () => {
      const result = validateSmartMeterId('');
      expect(result.valid).toBe(false);
      expect(result.error).toContain('required');
    });

    it('should reject whitespace-only string', () => {
      const result = validateSmartMeterId('   ');
      expect(result.valid).toBe(false);
      expect(result.error).toContain('empty');
    });

    it('should accept valid meter ID', () => {
      const result = validateSmartMeterId('smart-meter-0');
      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });
  });
});
