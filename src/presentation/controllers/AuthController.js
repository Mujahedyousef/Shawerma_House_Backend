import { AuthService } from '../../application/services/AuthService.js';

/**
 * Authentication Controller
 * Handles login and authentication-related requests
 */
export class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  /**
   * Login handler
   * POST /api/auth/login
   */
  async login(req, res, next) {
    try {
      const { emailOrUsername, password } = req.body;

      if (!emailOrUsername || !password) {
        return res.status(400).json({
          success: false,
          message: 'Email/username and password are required',
        });
      }

      const result = await this.authService.login(emailOrUsername, password);

      return res.status(200).json({
        success: true,
        message: 'Login successful',
        data: result,
      });
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: error.message || 'Login failed',
      });
    }
  }

  /**
   * Get current user info
   * GET /api/auth/me
   */
  async getCurrentUser(req, res, next) {
    try {
      // User info is attached by authMiddleware
      return res.status(200).json({
        success: true,
        data: {
          userId: req.user.userId,
          email: req.user.email,
          role: req.user.role,
        },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Failed to get user info',
      });
    }
  }

  /**
   * Logout handler (client-side token removal, but we can invalidate if needed)
   * POST /api/auth/logout
   */
  async logout(req, res, next) {
    try {
      // For JWT, logout is handled client-side by removing the token
      // If you want server-side invalidation, you'd need a token blacklist
      return res.status(200).json({
        success: true,
        message: 'Logout successful',
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Logout failed',
      });
    }
  }
}
