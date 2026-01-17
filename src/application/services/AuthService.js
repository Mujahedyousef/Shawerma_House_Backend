import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../../infrastructure/repositories/UserRepository.js';
import { config } from '../../config/env.js';

/**
 * Authentication Service
 * Handles login, token generation, and password verification
 */
export class AuthService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  /**
   * Login user with email/username and password
   * @param {string} emailOrUsername - Email or username
   * @param {string} password - Plain text password
   * @returns {Promise<{user: Object, token: string}>}
   */
  async login(emailOrUsername, password) {
    // Find user by email or username
    const userData = await this.userRepository.findByEmail(emailOrUsername) ||
                     await this.userRepository.findByUsername(emailOrUsername);

    if (!userData) {
      throw new Error('Invalid credentials');
    }

    // Get the raw user data from database (includes password)
    const rawUser = await this.userRepository.findRawByEmailOrUsername(emailOrUsername);
    
    if (!rawUser) {
      throw new Error('Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, rawUser.password);
    
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: rawUser.id, 
        email: rawUser.email,
        role: rawUser.role 
      },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );

    // Return user data (without password) and token
    const { password: _, ...userWithoutPassword } = rawUser;
    
    return {
      user: userWithoutPassword,
      token,
    };
  }

  /**
   * Verify JWT token
   * @param {string} token - JWT token
   * @returns {Promise<Object>} Decoded token payload
   */
  async verifyToken(token) {
    try {
      return jwt.verify(token, config.jwt.secret);
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }

  /**
   * Hash password
   * @param {string} password - Plain text password
   * @returns {Promise<string>} Hashed password
   */
  async hashPassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }
}
