import { Router } from 'express';
import { authenticate } from '../middlewares/auth';
import { getAllPayments, getPaymentById, createPayment, updatePayment } from '../controllers/payment.controller';

const router = Router();

router.use(authenticate);

router.get('/', getAllPayments);
router.get('/:id', getPaymentById);
router.post('/', createPayment);
router.put('/:id', updatePayment);

export default router;
