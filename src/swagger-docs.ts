/**
 * @swagger
 * components:
 *   schemas:
 *     ElectricityReading:
 *       type: object
 *       required:
 *         - time
 *         - reading
 *       properties:
 *         time:
 *           type: number
 *           description: Unix timestamp of the reading
 *           example: 1504777098
 *         reading:
 *           type: number
 *           description: Energy reading in kWh
 *           example: 0.0503
 *     
 *     ReadingsRequest:
 *       type: object
 *       required:
 *         - smartMeterId
 *         - electricityReadings
 *       properties:
 *         smartMeterId:
 *           type: string
 *           description: The smart meter identifier
 *           example: smart-meter-0
 *         electricityReadings:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ElectricityReading'
 *     
 *     PricePlan:
 *       type: object
 *       properties:
 *         planId:
 *           type: string
 *           example: price-plan-0
 *         planName:
 *           type: string
 *           example: "Dr Evil's Dark Energy"
 *         energySupplier:
 *           type: string
 *           example: Dr Evil
 *         unitRate:
 *           type: number
 *           description: Cost per kWh in £
 *           example: 10
 *     
 *     PricePlanComparison:
 *       type: object
 *       properties:
 *         pricePlanId:
 *           type: string
 *           description: Current price plan for the meter
 *           example: price-plan-0
 *         pricePlanComparisons:
 *           type: object
 *           additionalProperties:
 *             type: number
 *           example:
 *             price-plan-0: 21.78
 *             price-plan-1: 4.36
 *             price-plan-2: 2.18
 *     
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: No readings found for smart meter
 */

/**
 * @swagger
 * /readings/store:
 *   post:
 *     summary: Store electricity readings
 *     description: Store new electricity readings for a smart meter
 *     tags: [Readings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReadingsRequest'
 *     responses:
 *       200:
 *         description: Readings stored successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Readings stored successfully
 *       400:
 *         description: Invalid request body
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /readings/read/{smartMeterId}:
 *   get:
 *     summary: Get readings for a smart meter
 *     description: Retrieve all electricity readings for a specific smart meter
 *     tags: [Readings]
 *     parameters:
 *       - in: path
 *         name: smartMeterId
 *         required: true
 *         schema:
 *           type: string
 *         description: The smart meter ID
 *         example: smart-meter-0
 *     responses:
 *       200:
 *         description: Array of electricity readings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ElectricityReading'
 *       404:
 *         description: No readings found for the smart meter
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /price-plans/compare-all/{smartMeterId}:
 *   get:
 *     summary: Compare all price plans
 *     description: Calculate and compare costs across all available price plans for a smart meter
 *     tags: [Price Plans]
 *     parameters:
 *       - in: path
 *         name: smartMeterId
 *         required: true
 *         schema:
 *           type: string
 *         description: The smart meter ID
 *         example: smart-meter-0
 *     responses:
 *       200:
 *         description: Price plan comparison
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PricePlanComparison'
 *       404:
 *         description: No readings found for the smart meter
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /price-plans/recommend/{smartMeterId}:
 *   get:
 *     summary: Get price plan recommendations
 *     description: Get price plans sorted by cost (cheapest first)
 *     tags: [Price Plans]
 *     parameters:
 *       - in: path
 *         name: smartMeterId
 *         required: true
 *         schema:
 *           type: string
 *         description: The smart meter ID
 *         example: smart-meter-0
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Maximum number of recommendations to return
 *         example: 2
 *     responses:
 *       200:
 *         description: Array of price plan recommendations sorted by cost
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 additionalProperties:
 *                   type: number
 *               example:
 *                 - price-plan-2: 2.18
 *                 - price-plan-1: 4.36
 *       404:
 *         description: No readings found for the smart meter
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /price-plans:
 *   get:
 *     summary: Get all price plans
 *     description: Retrieve all available price plans
 *     tags: [Price Plans]
 *     responses:
 *       200:
 *         description: Array of all price plans
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PricePlan'
 */

export {};
