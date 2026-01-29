import express, { Application, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import { ReadingsController } from './controllers/ReadingsController';
import { PricePlansController } from './controllers/PricePlansController';
import { MeterReadingService } from './services/MeterReadingService';
import { PricePlanService } from './services/PricePlanService';
import { readingsRepository } from './repositories/ReadingsRepository';
import { swaggerSpec } from './swagger';

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../public')));

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Initialize services
const meterReadingService = new MeterReadingService(readingsRepository);
const pricePlanService = new PricePlanService(meterReadingService);

// Initialize controllers
const readingsController = new ReadingsController(meterReadingService);
const pricePlansController = new PricePlansController(pricePlanService);

// Serve the interactive demo page at root
app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// API info endpoint (always JSON)
app.get('/api', (req: Request, res: Response) => {
  res.json({
    name: 'JOI Energy API',
    version: '1.0.0',
    description: 'Smart meter electricity reading and price plan comparison API',
    documentation: '/api-docs',
    endpoints: {
      'POST /readings/store': 'Store electricity readings for a smart meter',
      'GET /readings/read/:smartMeterId': 'Retrieve readings for a smart meter',
      'GET /price-plans/compare-all/:smartMeterId': 'Compare costs across all price plans',
      'GET /price-plans/recommend/:smartMeterId': 'Get price plan recommendations (use ?limit=N)',
      'GET /price-plans': 'Get all available price plans',
    },
  });
});

// Readings routes
app.post('/readings/store', readingsController.store);
app.get('/readings/read/:smartMeterId', readingsController.read);

// Price plans routes
app.get('/price-plans/compare-all/:smartMeterId', pricePlansController.compareAll);
app.get('/price-plans/recommend/:smartMeterId', pricePlansController.recommend);
app.get('/price-plans', pricePlansController.getAllPlans);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Export app for testing
export { app };

// Start server if running directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 JOI Energy API running on http://localhost:${PORT}`);
    console.log(`� API Docs: http://localhost:${PORT}/api-docs`);
    console.log(`�📊 Try: http://localhost:${PORT}/readings/read/smart-meter-0`);
  });
}
