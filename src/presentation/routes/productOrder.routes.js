import express from 'express';
import ProductOrderController from '../controllers/ProductOrderController.js';
import ProductOrderService from '../../application/services/ProductOrderService.js';
import ProductOrderRepository from '../../infrastructure/repositories/ProductOrderRepository.js';

const router = express.Router();

// Initialize dependencies
const productOrderRepository = new ProductOrderRepository();
const productOrderService = new ProductOrderService(productOrderRepository);
const productOrderController = new ProductOrderController(productOrderService);

// Public route (for frontend form submission)
router.post('/', productOrderController.create);

// CMS routes (should be protected with authentication in production)
router.get('/', productOrderController.getAll);
router.get('/:id', productOrderController.getById);
router.put('/:id', productOrderController.update);
router.delete('/:id', productOrderController.delete);

export default router;
