import { Router } from 'express';
import { authenticate } from '../middlewares/auth';
import { getAllDrivers, getDriverById, createDriver, updateDriver } from '../controllers/driver.controller';

const router = Router();

// Public endpoints (no authentication required)
router.get('/', getAllDrivers);
router.get('/:id', getDriverById);

// Protected endpoints (authentication required)
router.post('/', authenticate, createDriver);
router.put('/:id', authenticate, updateDriver);

export default router;
