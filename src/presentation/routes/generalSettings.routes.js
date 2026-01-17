import express from 'express';
import GeneralSettingsController from '../controllers/GeneralSettingsController.js';
import GeneralSettingsService from '../../application/services/GeneralSettingsService.js';
import GeneralSettingsRepository from '../../infrastructure/repositories/GeneralSettingsRepository.js';

const router = express.Router();

// Initialize dependencies
const generalSettingsRepository = new GeneralSettingsRepository();
const generalSettingsService = new GeneralSettingsService(generalSettingsRepository);
const generalSettingsController = new GeneralSettingsController(generalSettingsService);

// Public routes
router.get('/settings', generalSettingsController.getSettings);

// CMS routes (should be protected with authentication in production)
router.put('/settings', generalSettingsController.updateSettings);

export default router;
