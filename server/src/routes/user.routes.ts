import express, { RequestHandler } from 'express';
import { 
  getLeaderboard,
  getProfile,
  updateUserProfile
} from '../controllers/user.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = express.Router();

// Get leaderboard
router.get('/leaderboard', getLeaderboard as RequestHandler);

// Get user profile
router.get('/profile', authenticateToken as RequestHandler, getProfile as RequestHandler);

// Update user profile
router.put('/profile', authenticateToken as RequestHandler, updateUserProfile as RequestHandler);

export default router; 