import { Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Database } from '../repositories/database';
import { AppError } from '../middlewares/errorHandler';
import { AuthRequest } from '../middlewares/auth';
import { Trip } from '../types';

/**
 * @swagger
 * /api/trips:
 *   get:
 *     summary: Get all trips
 *     tags: [Trips]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [active, completed, scheduled, cancelled]
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of trips
 */
export const getAllTrips = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    let trips = Database.getAllTrips();
    
    // Filter by status
    if (req.query.status) {
      trips = trips.filter(t => t.status === req.query.status);
    }
    
    // Filter by userId if not admin
    if (req.user?.role !== 'admin' && req.query.userId) {
      trips = trips.filter(t => t.userId === req.query.userId);
    }

    res.status(200).json({
      status: 'success',
      results: trips.length,
      data: { trips },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /api/trips/{id}:
 *   get:
 *     summary: Get trip by ID
 *     tags: [Trips]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Trip found
 *       404:
 *         description: Trip not found
 */
export const getTripById = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const trip = Database.getTripById(req.params.id);
    
    if (!trip) {
      throw new AppError('Trip not found', 404);
    }

    res.status(200).json({
      status: 'success',
      data: { trip },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /api/trips:
 *   post:
 *     summary: Create a new trip
 *     tags: [Trips]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Trip created
 */
export const createTrip = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const trip: Trip = {
      id: uuidv4(),
      userId: req.user!.userId,
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    Database.createTrip(trip);

    res.status(201).json({
      status: 'success',
      data: { trip },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /api/trips/{id}:
 *   put:
 *     summary: Update trip
 *     tags: [Trips]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Trip updated
 */
export const updateTrip = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const trip = Database.updateTrip(req.params.id, req.body);
    
    if (!trip) {
      throw new AppError('Trip not found', 404);
    }

    res.status(200).json({
      status: 'success',
      data: { trip },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /api/trips/{id}:
 *   delete:
 *     summary: Delete trip
 *     tags: [Trips]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       204:
 *         description: Trip deleted
 */
export const deleteTrip = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const deleted = Database.deleteTrip(req.params.id);
    
    if (!deleted) {
      throw new AppError('Trip not found', 404);
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
