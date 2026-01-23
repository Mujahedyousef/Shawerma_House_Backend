import express from 'express';
import DownloadAppSectionController from '../controllers/DownloadAppSectionController.js';
import DownloadAppSectionService from '../../application/services/DownloadAppSectionService.js';
import DownloadAppSectionRepository from '../../infrastructure/repositories/DownloadAppSectionRepository.js';
import { upload } from '../../middleware/uploadMiddleware.js';

const router = express.Router();

// Initialize dependencies
const downloadAppSectionRepository = new DownloadAppSectionRepository();
const downloadAppSectionService = new DownloadAppSectionService(downloadAppSectionRepository);
const downloadAppSectionController = new DownloadAppSectionController(downloadAppSectionService);

// Public routes
router.get('/active', downloadAppSectionController.getActive);

// CMS routes (should be protected with authentication in production)
router.get('/:id', downloadAppSectionController.getById);
router.post('/', downloadAppSectionController.create);
router.put('/:id', downloadAppSectionController.update);
router.delete('/:id', downloadAppSectionController.delete);
router.post('/:id/upload-image', upload.single('image'), downloadAppSectionController.uploadImage);

export default router;

