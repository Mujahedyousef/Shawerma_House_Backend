import express from 'express';
import { AuthController } from '../controllers/AuthController.js';
import { authenticate } from '../../middleware/authMiddleware.js';

const router = express.Router();
const authController = new AuthController();

// Login route (public)
router.post('/login', authController.login.bind(authController));

// Get current user (protected)
router.get('/me', authenticate, authController.getCurrentUser.bind(authController));

// Logout route (public - clears cookie even with expired token)
router.post('/logout', authController.logout.bind(authController));

export default router;
