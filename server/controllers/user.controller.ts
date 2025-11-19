import { Response, NextFunction } from 'express';
import { Database } from '../repositories/database';
import { AppError } from '../middlewares/errorHandler';
import { AuthRequest } from '../middlewares/auth';

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 */
export const getAllUsers = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const users = Database.getAllUsers().map(({ password, ...user }) => user);
    res.status(200).json({ status: 'success', results: users.length, data: { users } });
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 */
export const getUserById = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user = Database.getUserById(req.params.id);
    if (!user) throw new AppError('User not found', 404);
    
    const { password, ...userWithoutPassword } = user;
    res.status(200).json({ status: 'success', data: { user: userWithoutPassword } });
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 */
export const updateUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user = Database.updateUser(req.params.id, req.body);
    if (!user) throw new AppError('User not found', 404);
    
    const { password, ...userWithoutPassword } = user;
    res.status(200).json({ status: 'success', data: { user: userWithoutPassword } });
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 */
export const deleteUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const deleted = Database.deleteUser(req.params.id);
    if (!deleted) throw new AppError('User not found', 404);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
