import express from 'express';
import BlogCategoryController from '../controllers/BlogCategoryController.js';
import BlogCategoryService from '../../application/services/BlogCategoryService.js';
import BlogCategoryRepository from '../../infrastructure/repositories/BlogCategoryRepository.js';

const router = express.Router();

// Initialize dependencies
const blogCategoryRepository = new BlogCategoryRepository();
const blogCategoryService = new BlogCategoryService(blogCategoryRepository);
const blogCategoryController = new BlogCategoryController(blogCategoryService);

// Public routes
router.get('/active', blogCategoryController.getActive);

// CMS routes (should be protected with authentication in production)
router.get('/', blogCategoryController.getAll);
router.get('/:id', blogCategoryController.getById);
router.post('/', blogCategoryController.create);
router.put('/:id', blogCategoryController.update);
router.delete('/:id', blogCategoryController.delete);

export default router;
