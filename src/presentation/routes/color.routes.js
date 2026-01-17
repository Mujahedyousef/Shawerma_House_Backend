import express from 'express';
import ColorController from '../controllers/ColorController.js';
import ColorService from '../../application/services/ColorService.js';
import ColorRepository from '../../infrastructure/repositories/ColorRepository.js';

const router = express.Router();

// Initialize dependencies
const colorRepository = new ColorRepository();
const colorService = new ColorService(colorRepository);
const colorController = new ColorController(colorService);

// Public routes
router.get('/active', colorController.getActive);

// CMS routes (should be protected with authentication in production)
router.get('/', colorController.getAll);
router.get('/:id', colorController.getById);
router.post('/', colorController.create);
router.put('/:id', colorController.update);
router.delete('/:id', colorController.delete);

export default router;
