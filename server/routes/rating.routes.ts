import { Router } from 'express';
import { authenticate } from '../middlewares/auth';
import { getAllRatings, createRating, getRatingsByDriver } from '../controllers/rating.controller';

const router = Router();

router.use(authenticate);

router.get('/', getAllRatings);
router.post('/', createRating);
router.get('/driver/:driverId', getRatingsByDriver);

export default router;
