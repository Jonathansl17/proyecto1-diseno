import { Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Database } from '../repositories/database';
import { AuthRequest } from '../middlewares/auth';
import { Rating } from '../types';

/**
 * @swagger
 * /api/ratings:
 *   get:
 *     summary: Get all ratings
 *     tags: [Ratings]
 *     security:
 *       - bearerAuth: []
 */
export const getAllRatings = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const ratings = Database.getAllRatings();
    res.status(200).json({ status: 'success', results: ratings.length, data: { ratings } });
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /api/ratings:
 *   post:
 *     summary: Create a rating
 *     tags: [Ratings]
 *     security:
 *       - bearerAuth: []
 */
export const createRating = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const rating: Rating = {
      id: uuidv4(),
      userId: req.user!.userId,
      ...req.body,
      createdAt: new Date(),
    };
    Database.createRating(rating);
    
    // Update driver rating
    const driverRatings = Database.getRatingsByDriverId(rating.driverId);
    const avgRating = driverRatings.reduce((sum, r) => sum + r.score, 0) / driverRatings.length;
    Database.updateDriver(rating.driverId, { rating: avgRating });
    
    res.status(201).json({ status: 'success', data: { rating } });
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /api/ratings/driver/{driverId}:
 *   get:
 *     summary: Get ratings by driver
 *     tags: [Ratings]
 *     security:
 *       - bearerAuth: []
 */
export const getRatingsByDriver = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const ratings = Database.getRatingsByDriverId(req.params.driverId);
    res.status(200).json({ status: 'success', results: ratings.length, data: { ratings } });
  } catch (error) {
    next(error);
  }
};
