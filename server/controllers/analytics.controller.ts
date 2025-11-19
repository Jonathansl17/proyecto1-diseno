import { Response, NextFunction } from 'express';
import { Database } from '../repositories/database';
import { AuthRequest } from '../middlewares/auth';

/**
 * @swagger
 * /api/analytics/overview:
 *   get:
 *     summary: Get analytics overview
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 */
export const getAnalyticsOverview = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const trips = Database.getAllTrips();
    const users = Database.getAllUsers();
    const drivers = Database.getAllDrivers();
    const payments = Database.getAllPayments();
    
    const totalRevenue = payments
      .filter(p => p.status === 'completed')
      .reduce((sum, p) => sum + p.amount, 0);
    
    const completedTrips = trips.filter(t => t.status === 'completed').length;
    const activeTrips = trips.filter(t => t.status === 'active').length;
    
    res.status(200).json({
      status: 'success',
      data: {
        totalTrips: trips.length,
        completedTrips,
        activeTrips,
        totalUsers: users.length,
        totalDrivers: drivers.length,
        totalRevenue,
        avgTripValue: completedTrips > 0 ? totalRevenue / completedTrips : 0,
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /api/analytics/revenue:
 *   get:
 *     summary: Get revenue analytics
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 */
export const getRevenueAnalytics = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const payments = Database.getAllPayments();
    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);
    
    const recentPayments = payments.filter(p => 
      p.status === 'completed' && new Date(p.createdAt) >= last30Days
    );
    
    const totalRevenue = recentPayments.reduce((sum, p) => sum + p.amount, 0);
    
    res.status(200).json({
      status: 'success',
      data: {
        totalRevenue,
        transactionCount: recentPayments.length,
        avgTransactionValue: recentPayments.length > 0 ? totalRevenue / recentPayments.length : 0,
        period: 'Last 30 days'
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /api/analytics/trips:
 *   get:
 *     summary: Get trips analytics
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 */
export const getTripsAnalytics = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const trips = Database.getAllTrips();
    
    const byStatus = {
      active: trips.filter(t => t.status === 'active').length,
      completed: trips.filter(t => t.status === 'completed').length,
      scheduled: trips.filter(t => t.status === 'scheduled').length,
      cancelled: trips.filter(t => t.status === 'cancelled').length,
    };
    
    const byCity = trips.reduce((acc: any, trip) => {
      acc[trip.city] = (acc[trip.city] || 0) + 1;
      return acc;
    }, {});
    
    res.status(200).json({
      status: 'success',
      data: {
        total: trips.length,
        byStatus,
        byCity,
      }
    });
  } catch (error) {
    next(error);
  }
};
