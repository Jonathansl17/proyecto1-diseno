import { Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Database } from '../repositories/database';
import { AppError } from '../middlewares/errorHandler';
import { AuthRequest } from '../middlewares/auth';
import { Vehicle } from '../types';

/**
 * @swagger
 * /api/vehicles:
 *   get:
 *     summary: Get all vehicles
 *     tags: [Vehicles]
 *     security:
 *       - bearerAuth: []
 */
export const getAllVehicles = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const vehicles = Database.getAllVehicles();
    res.status(200).json({ status: 'success', results: vehicles.length, data: { vehicles } });
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /api/vehicles/{id}:
 *   get:
 *     summary: Get vehicle by ID
 *     tags: [Vehicles]
 *     security:
 *       - bearerAuth: []
 */
export const getVehicleById = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const vehicle = Database.getVehicleById(req.params.id);
    if (!vehicle) throw new AppError('Vehicle not found', 404);
    res.status(200).json({ status: 'success', data: { vehicle } });
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /api/vehicles:
 *   post:
 *     summary: Create vehicle
 *     tags: [Vehicles]
 *     security:
 *       - bearerAuth: []
 */
export const createVehicle = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const vehicle: Vehicle = {
      id: uuidv4(),
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    Database.createVehicle(vehicle);
    res.status(201).json({ status: 'success', data: { vehicle } });
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /api/vehicles/{id}:
 *   put:
 *     summary: Update vehicle
 *     tags: [Vehicles]
 *     security:
 *       - bearerAuth: []
 */
export const updateVehicle = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const vehicle = Database.updateVehicle(req.params.id, req.body);
    if (!vehicle) throw new AppError('Vehicle not found', 404);
    res.status(200).json({ status: 'success', data: { vehicle } });
  } catch (error) {
    next(error);
  }
};
