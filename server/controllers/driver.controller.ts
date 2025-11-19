import { Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Database } from '../repositories/database';
import { AppError } from '../middlewares/errorHandler';
import { AuthRequest } from '../middlewares/auth';
import { Driver } from '../types';

/**
 * @swagger
 * /api/drivers:
 *   get:
 *     summary: Get all drivers
 *     tags: [Drivers]
 *     security:
 *       - bearerAuth: []
 */
export const getAllDrivers = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const drivers = Database.getAllDrivers();
    res.status(200).json({ status: 'success', results: drivers.length, data: { drivers } });
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /api/drivers/{id}:
 *   get:
 *     summary: Get driver by ID
 *     tags: [Drivers]
 *     security:
 *       - bearerAuth: []
 */
export const getDriverById = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const driver = Database.getDriverById(req.params.id);
    if (!driver) throw new AppError('Driver not found', 404);
    res.status(200).json({ status: 'success', data: { driver } });
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /api/drivers:
 *   post:
 *     summary: Create new driver
 *     tags: [Drivers]
 *     security:
 *       - bearerAuth: []
 */
export const createDriver = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const driver: Driver = {
      id: uuidv4(),
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    Database.createDriver(driver);
    res.status(201).json({ status: 'success', data: { driver } });
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /api/drivers/{id}:
 *   put:
 *     summary: Update driver
 *     tags: [Drivers]
 *     security:
 *       - bearerAuth: []
 */
export const updateDriver = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const driver = Database.updateDriver(req.params.id, req.body);
    if (!driver) throw new AppError('Driver not found', 404);
    res.status(200).json({ status: 'success', data: { driver } });
  } catch (error) {
    next(error);
  }
};
