import { Router } from 'express';
import { authenticate } from '../middlewares/auth';
import { getAnalyticsOverview, getRevenueAnalytics, getTripsAnalytics } from '../controllers/analytics.controller';

const router = Router();

router.use(authenticate);

router.get('/overview', getAnalyticsOverview);
router.get('/revenue', getRevenueAnalytics);
router.get('/trips', getTripsAnalytics);

export default router;
