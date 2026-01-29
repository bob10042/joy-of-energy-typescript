import { Request, Response } from 'express';
import { MeterReadingService } from '../services/MeterReadingService';
import { validateReadingsRequest, validateSmartMeterId } from '../utils/validators';

export class ReadingsController {
  constructor(private meterReadingService: MeterReadingService) {}

  /**
   * POST /readings/store
   * Store electricity readings for a smart meter
   */
  store = async (req: Request, res: Response): Promise<void> => {
    try {
      const validation = validateReadingsRequest(req.body);
      if (!validation.valid) {
        res.status(400).json({ error: validation.error });
        return;
      }

      this.meterReadingService.storeReadings(req.body);
      res.status(200).json({ success: true, message: 'Readings stored successfully' });
    } catch (error) {
      console.error('Error storing readings:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  /**
   * GET /readings/read/:smartMeterId
   * Retrieve electricity readings for a smart meter
   */
  read = async (req: Request, res: Response): Promise<void> => {
    try {
      const smartMeterId = req.params.smartMeterId as string;

      const validation = validateSmartMeterId(smartMeterId);
      if (!validation.valid) {
        res.status(400).json({ error: validation.error });
        return;
      }

      const readings = this.meterReadingService.getReadings(smartMeterId);
      
      if (!readings) {
        res.status(404).json({ error: `No readings found for smart meter: ${smartMeterId}` });
        return;
      }

      res.status(200).json(readings);
    } catch (error) {
      console.error('Error reading meter data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}
