import { Router } from 'express';
import { authenticate } from '../middlewares/auth';
import { getAllRatings, createRating, getRatingsByDriver } from '../controllers/rating.controller';

const router = Router();

// Public endpoints (no authentication required)
router.get('/', getAllRatings);
router.get('/driver/:driverId', getRatingsByDriver);

// Protected endpoints (authentication required)
router.post('/', authenticate, createRating);

export default router;
