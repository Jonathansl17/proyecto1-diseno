import { Router } from 'express';
import { authenticate, authorize } from '../middlewares/auth';
import { getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/user.controller';

const router = Router();

// Public endpoints (no authentication required for demo purposes)
router.get('/', getAllUsers);
router.get('/:id', getUserById);

// Protected endpoints (authentication required)
router.put('/:id', authenticate, updateUser);
router.delete('/:id', authenticate, authorize('admin'), deleteUser);

export default router;
