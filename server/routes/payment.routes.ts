import { Router } from 'express';
import { authenticate } from '../middlewares/auth';
import { getAllPayments, getPaymentById, createPayment, updatePayment } from '../controllers/payment.controller';

const router = Router();

// Public endpoints (no authentication required)
router.get('/', getAllPayments);
router.get('/:id', getPaymentById);

// Protected endpoints (authentication required)
router.post('/', authenticate, createPayment);
router.put('/:id', authenticate, updatePayment);

export default router;
