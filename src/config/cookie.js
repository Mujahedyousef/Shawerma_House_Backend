import { config } from './env.js';

/**
 * HttpOnly cookie configuration for secure authentication.
 * Token is never exposed to client-side JavaScript (XSS protection).
 */
export const cookieConfig = {
  name: 'auth_token',
  options: {
    httpOnly: true,
    secure: config.env === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: getCookieMaxAge(),
  },
};

/**
 * Convert JWT expiresIn (e.g. '7d', '24h') to milliseconds for cookie maxAge.
 */
function getCookieMaxAge() {
  const expiresIn = config.jwt.expiresIn || '7d';
  const match = expiresIn.match(/^(\d+)([smhd])$/);
  if (!match) return 7 * 24 * 60 * 60 * 1000; // default 7 days in ms

  const value = parseInt(match[1], 10);
  const unit = match[2];

  const multipliers = {
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
  };

  return value * (multipliers[unit] || multipliers.d);
}
