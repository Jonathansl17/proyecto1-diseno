import { Router } from 'express';
import { authenticate } from '../middlewares/auth';
import { getAllTrips, getTripById, createTrip, updateTrip, deleteTrip } from '../controllers/trip.controller';

const router = Router();

// Public endpoints (no authentication required)
router.get('/', getAllTrips);
router.get('/:id', getTripById);

// Protected endpoints (authentication required)
router.post('/', authenticate, createTrip);
router.put('/:id', authenticate, updateTrip);
router.delete('/:id', authenticate, deleteTrip);

export default router;
