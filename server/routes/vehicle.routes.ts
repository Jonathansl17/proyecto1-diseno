import { Router } from 'express';
import { authenticate } from '../middlewares/auth';
import { getAllVehicles, getVehicleById, createVehicle, updateVehicle } from '../controllers/vehicle.controller';

const router = Router();

router.use(authenticate);

router.get('/', getAllVehicles);
router.get('/:id', getVehicleById);
router.post('/', createVehicle);
router.put('/:id', updateVehicle);

export default router;
