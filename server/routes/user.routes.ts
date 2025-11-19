import { Router } from 'express';
import { authenticate, authorize } from '../middlewares/auth';
import { getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/user.controller';

const router = Router();

router.use(authenticate);

router.get('/', authorize('admin'), getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', authorize('admin'), deleteUser);

export default router;
