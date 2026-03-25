import express from 'express';
import auth from '../middleware/auth.js';
import {
  getProfile,
  updateProfile,
  getAllUsers,
  getUserById,
  deleteUser
} from '../controllers/userController.js';

const router = express.Router();

// All routes require authentication
router.use(auth);

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.delete('/:id', deleteUser);

export default router;
