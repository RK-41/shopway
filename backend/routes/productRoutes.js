/*
  03.11.23.
  
  Product Router

  04.11.23
   Async Handler Implementation

  15.11.
   Methods Added:
      POST: createProduct
      PUT: updateProduct

  16.11.
   Method Added:
      DELETE: deleteProduct

  17.11.
   Method Added:
      POST: createProductReview
*/

import express from 'express';
import {
	getProductById,
	getProducts,
	createProduct,
	updateProduct,
	deleteProduct,
	createProductReview,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// Creating a Router
const router = express.Router();

// Handling Routes and Requests
router.route('/').get(getProducts).post(protect, admin, createProduct);
router
	.route('/:id')
	.get(getProductById)
	.put(protect, admin, updateProduct)
	.delete(protect, admin, deleteProduct)
	.post(protect, createProductReview);

export default router;
