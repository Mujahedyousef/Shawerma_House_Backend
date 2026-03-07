import { AuthService } from '../application/services/AuthService.js';
import { cookieConfig } from '../config/cookie.js';

/**
 * Server-side auth utility for SSR.
 * Extracts and verifies user from request cookies.
 * Use during SSR when window/document are undefined.
 *
 * @param {Object} req - Express request object (or object with cookies)
 * @returns {Promise<{userId: string, email: string, role: string}|null>} User payload or null if unauthenticated
 */
export async function getUserFromRequest(req) {
  try {
    const token = req?.cookies?.[cookieConfig.name];
    if (!token) return null;

    const authService = new AuthService();
    const decoded = await authService.verifyToken(token);
    return decoded;
  } catch {
    return null;
  }
}
