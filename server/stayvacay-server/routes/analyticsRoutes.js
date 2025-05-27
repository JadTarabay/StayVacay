import express from 'express';
import { getMostViewedProperties, getDailyVisits } from '../controllers/analyticsController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/properties', protect, getMostViewedProperties);
router.get('/traffic', protect, getDailyVisits);

export default router;
