import { Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Database } from '../repositories/database';
import { AppError } from '../middlewares/errorHandler';
import { AuthRequest } from '../middlewares/auth';
import { Payment } from '../types';

/**
 * @swagger
 * /api/payments:
 *   get:
 *     summary: Get all payments
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 */
export const getAllPayments = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const payments = Database.getAllPayments();
    res.status(200).json({ status: 'success', results: payments.length, data: { payments } });
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /api/payments/{id}:
 *   get:
 *     summary: Get payment by ID
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 */
export const getPaymentById = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const payment = Database.getPaymentById(req.params.id);
    if (!payment) throw new AppError('Payment not found', 404);
    res.status(200).json({ status: 'success', data: { payment } });
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /api/payments:
 *   post:
 *     summary: Create payment
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 */
export const createPayment = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const payment: Payment = {
      id: uuidv4(),
      userId: req.user!.userId,
      transactionId: `TXN-${Date.now()}`,
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    Database.createPayment(payment);
    res.status(201).json({ status: 'success', data: { payment } });
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /api/payments/{id}:
 *   put:
 *     summary: Update payment status
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 */
export const updatePayment = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const payment = Database.updatePayment(req.params.id, req.body);
    if (!payment) throw new AppError('Payment not found', 404);
    res.status(200).json({ status: 'success', data: { payment } });
  } catch (error) {
    next(error);
  }
};
