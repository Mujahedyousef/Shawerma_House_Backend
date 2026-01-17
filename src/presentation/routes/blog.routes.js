import express from 'express';
import BlogController from '../controllers/BlogController.js';
import BlogService from '../../application/services/BlogService.js';
import BlogRepository from '../../infrastructure/repositories/BlogRepository.js';
import { upload } from '../../middleware/uploadMiddleware.js';

const router = express.Router();

// Initialize dependencies
const blogRepository = new BlogRepository();
const blogService = new BlogService(blogRepository);
const blogController = new BlogController(blogService);

// Public routes
router.get('/blogs', blogController.getActiveBlogs);
router.get('/blogs/:id', blogController.getBlogById);
router.get('/page-settings', blogController.getPageSettings);

// CMS routes (should be protected with authentication in production)
router.get('/all-blogs', blogController.getAllBlogs);
router.post('/blogs', upload.fields([{ name: 'image', maxCount: 1 }]), blogController.createBlog);
router.put('/blogs/:id', upload.fields([{ name: 'image', maxCount: 1 }]), blogController.updateBlog);
router.delete('/blogs/:id', blogController.deleteBlog);
router.put('/page-settings', upload.fields([{ name: 'heroImage', maxCount: 1 }]), blogController.updatePageSettings);

export default router;
