import { AuthService } from '../../application/services/AuthService.js';
import { UserRepository } from '../../infrastructure/repositories/UserRepository.js';
import { cookieConfig } from '../../config/cookie.js';

/**
 * Authentication Controller
 * Handles login and authentication-related requests.
 * Uses HttpOnly cookies for secure token storage (XSS protection).
 */
export class AuthController {
  constructor() {
    this.authService = new AuthService();
    this.userRepository = new UserRepository();
  }

  /**
   * Login handler
   * POST /api/auth/login
   * Sets HttpOnly cookie - token is never exposed to client JS.
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

      // Set HttpOnly cookie instead of returning token in response body
      res.cookie(cookieConfig.name, result.token, cookieConfig.options);

      // Return user data only - token is in cookie, never exposed to JS
      return res.status(200).json({
        success: true,
        message: 'Login successful',
        data: { user: result.user },
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
   * Returns full user (excluding password) for UI display.
   */
  async getCurrentUser(req, res, next) {
    try {
      const rawUser = await this.userRepository.findRawByEmailOrUsername(req.user.email);
      if (!rawUser) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }
      const { password: _, ...userWithoutPassword } = rawUser;
      return res.status(200).json({
        success: true,
        data: { user: userWithoutPassword },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Failed to get user info',
      });
    }
  }

  /**
   * Logout handler
   * POST /api/auth/logout
   * Clears the auth cookie. Public route - works even with expired token.
   */
  async logout(req, res, next) {
    try {
      res.clearCookie(cookieConfig.name, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
      });
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
