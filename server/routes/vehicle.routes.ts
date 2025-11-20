import { Router } from 'express';
import { authenticate } from '../middlewares/auth';
import { getAllVehicles, getVehicleById, createVehicle, updateVehicle } from '../controllers/vehicle.controller';

const router = Router();

// Public endpoints (no authentication required)
router.get('/', getAllVehicles);
router.get('/:id', getVehicleById);

// Protected endpoints (authentication required)
router.post('/', authenticate, createVehicle);
router.put('/:id', authenticate, updateVehicle);

export default router;
