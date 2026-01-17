import express from 'express';
import AboutUsController from '../controllers/AboutUsController.js';
import AboutUsService from '../../application/services/AboutUsService.js';
import AboutUsRepository from '../../infrastructure/repositories/AboutUsRepository.js';
import { upload } from '../../middleware/uploadMiddleware.js';

const router = express.Router();

// Initialize dependencies
const aboutUsRepository = new AboutUsRepository();
const aboutUsService = new AboutUsService(aboutUsRepository);
const aboutUsController = new AboutUsController(aboutUsService);

// Public routes
router.get('/page-settings', aboutUsController.getPageSettings);

// CMS routes (should be protected with authentication in production)
router.put(
  '/page-settings',
  upload.fields([
    { name: 'heroImage', maxCount: 1 },
    { name: 'visionImage', maxCount: 1 },
    { name: 'visionQuoteAuthorImage', maxCount: 1 },
    { name: 'messageImage', maxCount: 1 },
  ]),
  aboutUsController.updatePageSettings
);

// Metrics routes
router.post('/metrics', aboutUsController.createMetric);
router.put('/metrics/:id', aboutUsController.updateMetric);
router.delete('/metrics/:id', aboutUsController.deleteMetric);

// Navigation buttons routes
router.post('/navigation-buttons', aboutUsController.createNavigationButton);
router.put('/navigation-buttons/:id', aboutUsController.updateNavigationButton);
router.delete('/navigation-buttons/:id', aboutUsController.deleteNavigationButton);

// Story items routes
router.post('/story-items', aboutUsController.createStoryItem);
router.put('/story-items/:id', aboutUsController.updateStoryItem);
router.delete('/story-items/:id', aboutUsController.deleteStoryItem);

// Core values routes
router.post(
  '/core-values',
  upload.fields([{ name: 'image', maxCount: 1 }]),
  aboutUsController.createCoreValue
);
router.put(
  '/core-values/:id',
  upload.fields([{ name: 'image', maxCount: 1 }]),
  aboutUsController.updateCoreValue
);
router.delete('/core-values/:id', aboutUsController.deleteCoreValue);

// Team members routes
router.post(
  '/team-members',
  upload.fields([{ name: 'image', maxCount: 1 }]),
  aboutUsController.createTeamMember
);
router.put(
  '/team-members/:id',
  upload.fields([{ name: 'image', maxCount: 1 }]),
  aboutUsController.updateTeamMember
);
router.delete('/team-members/:id', aboutUsController.deleteTeamMember);

// Awards routes
router.post(
  '/awards',
  upload.fields([{ name: 'logo', maxCount: 1 }]),
  aboutUsController.createAward
);
router.put(
  '/awards/:id',
  upload.fields([{ name: 'logo', maxCount: 1 }]),
  aboutUsController.updateAward
);
router.delete('/awards/:id', aboutUsController.deleteAward);

export default router;
