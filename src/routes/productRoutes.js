import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getDashboardStats
} from '../controllers/productController.js';

const router = express.Router();

// Define stats route before general parameter bindings
router.get('/stats', getDashboardStats);

router.route('/')
  .get(getProducts)
  .post(createProduct);

router.route('/:id')
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

export default router;
