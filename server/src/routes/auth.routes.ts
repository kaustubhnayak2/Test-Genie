import express, { RequestHandler } from 'express';
import { register, login, getCurrentUser, forgotPassword, resetPassword } from '../controllers/auth.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = express.Router();

// Register user
router.post('/register', register as RequestHandler);

// Login user
router.post('/login', login as RequestHandler);

// Get current user
router.get('/me', authenticateToken as RequestHandler, getCurrentUser as RequestHandler);

// Forgot password
router.post('/forgot-password', forgotPassword as RequestHandler);

// Reset password
router.post('/reset-password', resetPassword as RequestHandler);

export default router; 