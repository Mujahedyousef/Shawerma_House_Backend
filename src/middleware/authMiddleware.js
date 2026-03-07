import { AuthService } from '../application/services/AuthService.js';
import { cookieConfig } from '../config/cookie.js';

/**
 * Authentication Middleware
 * Reads token from HttpOnly cookie (or Authorization header for backward compatibility).
 * Verifies JWT and attaches user info to request.
 */
export const authenticate = async (req, res, next) => {
  try {
    // Prefer cookie over Authorization header (cookie is primary for browser clients)
    let token = req.cookies?.[cookieConfig.name];

    if (!token) {
      const authHeader = req.headers.authorization;
      if (authHeader?.startsWith('Bearer ')) {
        token = authHeader.substring(7);
      }
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided',
      });
    }

    const authService = new AuthService();
    const decoded = await authService.verifyToken(token);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message || 'Invalid or expired token',
    });
  }
};
