import { Router } from 'express';
import { authenticate } from '../middlewares/auth';
import { getAllTrips, getTripById, createTrip, updateTrip, deleteTrip } from '../controllers/trip.controller';

const router = Router();

// All routes require authentication
router.use(authenticate);

router.get('/', getAllTrips);
router.get('/:id', getTripById);
router.post('/', createTrip);
router.put('/:id', updateTrip);
router.delete('/:id', deleteTrip);

export default router;
