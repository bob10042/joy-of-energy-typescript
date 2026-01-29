import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'JOI Energy API',
      version: '1.0.0',
      description: `
Smart meter electricity reading and price plan comparison API.

Built as part of Thoughtworks' Joy of Energy technical challenge.

## Overview
JOI Energy is a startup that uses smart meter data to help customers find the best electricity pricing plans.

## Test Data
The API comes pre-loaded with 5 test smart meters:
- **smart-meter-0** (Sarah) - Dr Evil's Dark Energy - £10/kWh
- **smart-meter-1** (Peter) - The Green Eco - £2/kWh
- **smart-meter-2** (Charlie) - Dr Evil's Dark Energy - £10/kWh
- **smart-meter-3** (Andrea) - Power for Everyone - £1/kWh
- **smart-meter-4** (Alex) - The Green Eco - £2/kWh
      `,
      contact: {
        name: 'API Support',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/swagger-docs.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
