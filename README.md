# JOI Energy - Smart Meter API

## 🎯 Project Overview

REST API for smart meter electricity readings and price plan comparisons.
Built as part of Thoughtworks' Joy of Energy technical challenge.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Run production build
npm start
```

## 📊 Features

- ✅ Store electricity readings from smart meters
- ✅ Retrieve historical readings
- ✅ Compare costs across all price plans
- ✅ Recommend cheaper alternatives
- ✅ TypeScript for type safety
- ✅ Comprehensive test coverage
- ✅ Input validation and error handling

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Testing**: Jest + Supertest
- **Architecture**: Clean layered architecture (Controllers → Services → Repositories)

## 📐 API Endpoints

### Store Electricity Readings
```
POST /readings/store
Content-Type: application/json

{
  "smartMeterId": "smart-meter-0",
  "electricityReadings": [
    { "time": 1504777098, "reading": 0.0503 },
    { "time": 1504777158, "reading": 0.0621 }
  ]
}

Response: 200 OK
```

### Retrieve Readings
```
GET /readings/read/{smartMeterId}

Response: Array of readings
```

### Compare All Price Plans
```
GET /price-plans/compare-all/{smartMeterId}

Response:
{
  "pricePlanId": "price-plan-0",
  "pricePlanComparisons": {
    "price-plan-0": 21.78,
    "price-plan-1": 43.56,
    "price-plan-2": 10.89
  }
}
```

### Recommend Cheaper Plans
```
GET /price-plans/recommend/{smartMeterId}?limit=2

Response: Array of plan recommendations sorted by cost
```

### Get All Price Plans
```
GET /price-plans

Response: Array of all available price plans
```

## 🧪 Test Data

The API comes pre-loaded with 5 test smart meters:

| Customer | Meter ID | Supplier | Rate |
|----------|----------|----------|------|
| Sarah | smart-meter-0 | Dr Evil's Dark Energy | £10/kWh |
| Peter | smart-meter-1 | The Green Eco | £2/kWh |
| Charlie | smart-meter-2 | Dr Evil's Dark Energy | £10/kWh |
| Andrea | smart-meter-3 | Power for Everyone | £1/kWh |
| Alex | smart-meter-4 | The Green Eco | £2/kWh |

## 📁 Project Structure

```
joy-of-energy-typescript/
├── src/
│   ├── models/          # TypeScript interfaces
│   ├── services/        # Business logic
│   ├── controllers/     # API route handlers
│   ├── repositories/    # Data access layer
│   ├── utils/           # Validators and helpers
│   ├── data/            # Seed data
│   └── app.ts           # Express application
├── tests/
│   ├── unit/            # Unit tests
│   └── integration/     # API integration tests
├── package.json
├── tsconfig.json
└── jest.config.js
```

## 🎓 Design Decisions

- **Why TypeScript**: Type safety catches bugs at compile time
- **Why in-memory storage**: Simplicity for demo, easy to swap for database
- **Why service layer**: Separation of concerns, testability
- **Why repository pattern**: Abstracts data access, enables easy testing with mocks

## 📝 Running Tests

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

## 🚀 Deployment

This project can be deployed to any Node.js hosting platform:

```bash
# Build the project
npm run build

# The compiled output will be in /dist
# Start with: node dist/app.js
```

---

Built with ❤️ as part of learning journey with Thoughtworks' technical challenges.
