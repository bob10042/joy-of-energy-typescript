import { Request, Response } from 'express';
import { PricePlanService } from '../services/PricePlanService';
import { validateSmartMeterId } from '../utils/validators';

export class PricePlansController {
  constructor(private pricePlanService: PricePlanService) {}

  /**
   * GET /price-plans/compare-all/:smartMeterId
   * Compare costs across all price plans for a smart meter
   */
  compareAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const smartMeterId = req.params.smartMeterId as string;

      const validation = validateSmartMeterId(smartMeterId);
      if (!validation.valid) {
        res.status(400).json({ error: validation.error });
        return;
      }

      const comparison = this.pricePlanService.compareAllPlans(smartMeterId);
      
      if (!comparison) {
        res.status(404).json({ 
          error: `No readings found for smart meter: ${smartMeterId}. Cannot compare price plans without usage data.` 
        });
        return;
      }

      res.status(200).json(comparison);
    } catch (error) {
      console.error('Error comparing price plans:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  /**
   * GET /price-plans/recommend/:smartMeterId
   * Recommend cheaper price plans, optionally limited
   */
  recommend = async (req: Request, res: Response): Promise<void> => {
    try {
      const smartMeterId = req.params.smartMeterId as string;
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : undefined;

      const validation = validateSmartMeterId(smartMeterId);
      if (!validation.valid) {
        res.status(400).json({ error: validation.error });
        return;
      }

      if (limit !== undefined && (isNaN(limit) || limit < 1)) {
        res.status(400).json({ error: 'Limit must be a positive integer' });
        return;
      }

      const recommendations = this.pricePlanService.recommendCheaperPlans(smartMeterId, limit);
      
      if (recommendations.length === 0) {
        res.status(404).json({ 
          error: `No readings found for smart meter: ${smartMeterId}. Cannot make recommendations without usage data.` 
        });
        return;
      }

      res.status(200).json(recommendations);
    } catch (error) {
      console.error('Error getting recommendations:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  /**
   * GET /price-plans
   * Get all available price plans
   */
  getAllPlans = async (req: Request, res: Response): Promise<void> => {
    try {
      const plans = this.pricePlanService.getAllPricePlans();
      res.status(200).json(plans);
    } catch (error) {
      console.error('Error getting price plans:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}
