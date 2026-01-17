import express from 'express';
import { upload } from '../../middleware/uploadMiddleware.js';
import UploadController from '../controllers/UploadController.js';

const router = express.Router();
const uploadController = new UploadController();

// Upload image endpoint
router.post('/image', upload.single('image'), uploadController.uploadImage);

export default router;
