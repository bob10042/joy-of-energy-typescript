import request from 'supertest';
import { app } from '../../src/app';

describe('API Integration Tests', () => {
  describe('GET /', () => {
    it('should serve HTML demo page', async () => {
      const response = await request(app)
        .get('/')
        .set('Accept', 'text/html');
      expect(response.status).toBe(200);
      expect(response.type).toBe('text/html');
    });
  });

  describe('GET /api', () => {
    it('should return API info', async () => {
      const response = await request(app).get('/api');
      expect(response.status).toBe(200);
      expect(response.body.name).toBe('JOI Energy API');
    });
  });

  describe('POST /readings/store', () => {
    it('should store valid readings', async () => {
      const response = await request(app)
        .post('/readings/store')
        .send({
          smartMeterId: 'test-meter',
          electricityReadings: [
            { time: 1000, reading: 0.5 },
            { time: 2000, reading: 0.6 },
          ],
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });

    it('should reject missing smartMeterId', async () => {
      const response = await request(app)
        .post('/readings/store')
        .send({
          electricityReadings: [{ time: 1000, reading: 0.5 }],
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toContain('smartMeterId');
    });

    it('should reject empty readings array', async () => {
      const response = await request(app)
        .post('/readings/store')
        .send({
          smartMeterId: 'test-meter',
          electricityReadings: [],
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toContain('empty');
    });

    it('should reject negative reading values', async () => {
      const response = await request(app)
        .post('/readings/store')
        .send({
          smartMeterId: 'test-meter',
          electricityReadings: [{ time: 1000, reading: -0.5 }],
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toContain('non-negative');
    });
  });

  describe('GET /readings/read/:smartMeterId', () => {
    it('should return readings for existing meter', async () => {
      // First store some readings
      await request(app)
        .post('/readings/store')
        .send({
          smartMeterId: 'integration-test-meter',
          electricityReadings: [
            { time: 1000, reading: 0.5 },
          ],
        });

      const response = await request(app).get('/readings/read/integration-test-meter');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('should return 404 for non-existent meter', async () => {
      const response = await request(app).get('/readings/read/definitely-not-exists-xyz');
      expect(response.status).toBe(404);
    });
  });

  describe('GET /price-plans/compare-all/:smartMeterId', () => {
    beforeAll(async () => {
      await request(app)
        .post('/readings/store')
        .send({
          smartMeterId: 'compare-test-meter',
          electricityReadings: [
            { time: 0, reading: 0.5 },
            { time: 3600, reading: 0.5 },
          ],
        });
    });

    it('should compare all plans for meter with readings', async () => {
      const response = await request(app).get('/price-plans/compare-all/compare-test-meter');
      expect(response.status).toBe(200);
      expect(response.body.pricePlanComparisons).toBeDefined();
    });

    it('should return 404 for meter without readings', async () => {
      const response = await request(app).get('/price-plans/compare-all/no-readings-meter-xyz');
      expect(response.status).toBe(404);
    });
  });

  describe('GET /price-plans/recommend/:smartMeterId', () => {
    beforeAll(async () => {
      await request(app)
        .post('/readings/store')
        .send({
          smartMeterId: 'recommend-test-meter',
          electricityReadings: [
            { time: 0, reading: 0.5 },
            { time: 3600, reading: 0.5 },
          ],
        });
    });

    it('should return recommendations sorted by cost', async () => {
      const response = await request(app).get('/price-plans/recommend/recommend-test-meter');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('should respect limit parameter', async () => {
      const response = await request(app).get('/price-plans/recommend/recommend-test-meter?limit=2');
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
    });

    it('should reject invalid limit', async () => {
      const response = await request(app).get('/price-plans/recommend/recommend-test-meter?limit=-1');
      expect(response.status).toBe(400);
    });
  });

  describe('GET /price-plans', () => {
    it('should return all price plans', async () => {
      const response = await request(app).get('/price-plans');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(3);
    });
  });

  describe('404 handling', () => {
    it('should return 404 for unknown endpoints', async () => {
      const response = await request(app).get('/unknown/endpoint');
      expect(response.status).toBe(404);
    });
  });
});
