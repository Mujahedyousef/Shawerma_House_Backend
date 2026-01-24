import express from 'express';
import MapSectionController from '../controllers/MapSectionController.js';
import { authenticate } from '../../middleware/authMiddleware.js';

const router = express.Router();
const mapSectionController = new MapSectionController();

// Public route
router.get('/', mapSectionController.getActiveMapSection); // Root GET returns active section
router.get('/active', mapSectionController.getActiveMapSection);

// Protected CMS routes
router.get('/:id', authenticate, mapSectionController.getMapSectionById);
router.post('/', authenticate, mapSectionController.createMapSection);
router.put('/:id', authenticate, mapSectionController.updateMapSection);
router.delete('/:id', authenticate, mapSectionController.deleteMapSection);

// Branch routes
router.get(
  '/:mapSectionId/branches',
  authenticate,
  mapSectionController.getBranches
);
router.get(
  '/branches/:id',
  authenticate,
  mapSectionController.getBranchById
);
router.post('/branches', authenticate, mapSectionController.createBranch);
router.put('/branches/:id', authenticate, mapSectionController.updateBranch);
router.delete(
  '/branches/:id',
  authenticate,
  mapSectionController.deleteBranch
);

export default router;

