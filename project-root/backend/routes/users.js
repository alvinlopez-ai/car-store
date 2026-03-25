import express from 'express';
import auth from '../middleware/auth.js';
import {
  createUser,
  getProfile,
  updateProfile,
  getAllUsers,
  getUserById,
  deleteUser
} from '../controllers/userController.js';

const router = express.Router();

// All routes require authentication except user creation
router.post('/', createUser);
router.use(auth);

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.delete('/:id', deleteUser);

export default router;
