import { Router } from 'express';
import { authenticate } from '../middlewares/auth';
import { getAllDrivers, getDriverById, createDriver, updateDriver } from '../controllers/driver.controller';

const router = Router();

router.use(authenticate);

router.get('/', getAllDrivers);
router.get('/:id', getDriverById);
router.post('/', createDriver);
router.put('/:id', updateDriver);

export default router;
