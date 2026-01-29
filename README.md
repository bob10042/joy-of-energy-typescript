# ⚡ JOI Energy - Smart Meter API

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.x-green)](https://expressjs.com/)
[![Jest](https://img.shields.io/badge/Tests-55%20passing-brightgreen)](https://jestjs.io/)
[![Coverage](https://img.shields.io/badge/Coverage-88%25-yellow)](https://jestjs.io/)

A modern REST API for smart meter electricity readings and price plan comparisons. Built with TypeScript and Express.js as part of the **Thoughtworks Joy of Energy** technical challenge.

## 🌐 Live Demo

👉 **[Try the Interactive Demo](https://joy-of-energy-typescript.vercel.app)**

Explore the API with our interactive demo interface featuring:
- Real-time meter reading retrieval
- Price plan comparisons
- Cost optimization recommendations
- Live API testing

## 📚 API Documentation

Full Swagger/OpenAPI documentation available at:
- **Production**: [/api-docs](https://joy-of-energy-typescript.vercel.app/api-docs)
- **Local**: http://localhost:3000/api-docs

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/bob10042/joy-of-energy-typescript.git
cd joy-of-energy-typescript

# Install dependencies
npm install

# Run in development mode (with hot reload)
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Start production server
npm start
```

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| TypeScript | 5.x | Type-safe JavaScript |
| Express.js | 5.x | Web framework |
| Jest | 30.x | Testing framework |
| Supertest | 7.x | HTTP testing |
| Swagger | 6.x | API documentation |

## 📊 Features

- ✅ **Store Readings** - Capture electricity usage from smart meters
- ✅ **Retrieve History** - View historical consumption data
- ✅ **Compare Plans** - Calculate costs across all price plans
- ✅ **Get Recommendations** - Find the cheapest plan for your usage
- ✅ **Interactive Demo** - Beautiful web UI for API exploration
- ✅ **Full Test Coverage** - 55 tests with 88% code coverage
- ✅ **Input Validation** - Comprehensive request validation
- ✅ **OpenAPI Docs** - Swagger documentation

## 📐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/readings/store` | Store electricity readings |
| `GET` | `/readings/read/:smartMeterId` | Retrieve readings for a meter |
| `GET` | `/price-plans/compare-all/:smartMeterId` | Compare costs across all plans |
| `GET` | `/price-plans/recommend/:smartMeterId` | Get cheapest plan recommendations |
| `GET` | `/price-plans` | List all available price plans |
| `GET` | `/api` | API information |
| `GET` | `/api-docs` | Swagger documentation |

### Example: Store Readings

```bash
curl -X POST https://joy-of-energy-typescript.vercel.app/readings/store \
  -H "Content-Type: application/json" \
  -d '{
    "smartMeterId": "smart-meter-0",
    "electricityReadings": [
      { "time": 1704067200000, "reading": 0.0503 },
      { "time": 1704070800000, "reading": 0.0621 }
    ]
  }'
```

### Example: Get Recommendations

```bash
curl "https://joy-of-energy-typescript.vercel.app/price-plans/recommend/smart-meter-0?limit=2"
```

## 💡 Price Plans

| Plan | Rate (£/kWh) | Description |
|------|--------------|-------------|
| 🌱 The Green Eco | £0.083 | Eco-friendly energy |
| 👥 Power for Everyone | £0.099 | Balanced pricing |
| 😈 Dr Evil's Dark Energy | £0.299 | Premium power |

## 🧪 Test Smart Meters

Pre-configured meters for testing:

| Meter ID | Owner | Current Plan |
|----------|-------|--------------|
| `smart-meter-0` | Sarah | Dr Evil's Dark Energy |
| `smart-meter-1` | Peter | The Green Eco |
| `smart-meter-2` | Charlie | Dr Evil's Dark Energy |
| `smart-meter-3` | Andrea | Power for Everyone |
| `smart-meter-4` | Alex | The Green Eco |

## 🏗️ Architecture

```
src/
├── app.ts                 # Express app setup
├── controllers/           # HTTP request handlers
│   ├── ReadingsController.ts
│   └── PricePlansController.ts
├── services/              # Business logic
│   ├── MeterReadingService.ts
│   └── PricePlanService.ts
├── repositories/          # Data access layer
│   └── ReadingsRepository.ts
├── models/                # Type definitions
│   ├── ElectricityReading.ts
│   └── PricePlan.ts
├── data/                  # Sample data
│   └── sampleData.ts
├── utils/                 # Utility functions
│   └── validators.ts
└── swagger.ts             # OpenAPI configuration

tests/
├── integration/           # API integration tests
│   └── api.test.ts
└── unit/                  # Unit tests
    ├── services/
    └── utils/
```

## 📈 Test Coverage

```
--------------------------|---------|----------|---------|---------|
File                      | % Stmts | % Branch | % Funcs | % Lines |
--------------------------|---------|----------|---------|---------|
All files                 |   88.23 |    88.88 |   93.33 |    88.0 |
--------------------------|---------|----------|---------|---------|

Test Suites: 4 passed, 4 total
Tests:       55 passed, 55 total
```

## 🚢 Deployment

Deployed on [Vercel](https://vercel.com) with automatic builds from the main branch.

### Deploy Your Own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/bob10042/joy-of-energy-typescript)

## 🤝 Contributing

Contributions welcome! Please feel free to submit a Pull Request.

## 📄 License

ISC License - feel free to use this project for learning and development.

---

Built with ⚡ for [Thoughtworks](https://www.thoughtworks.com) Joy of Energy Challenge
