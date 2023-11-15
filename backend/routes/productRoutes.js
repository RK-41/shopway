/*
  03.11.23.
  
  Product Router

  04.11.23
   Async Handler Implementation

  15.11.
   Methods Added:
      POST: createProduct
      PUT: updateProduct
*/

import express from 'express';
import {
	getProductById,
	getProducts,
	createProduct,
	updateProduct,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// Creating a Router
const router = express.Router();

// Handling Routes and Requests
router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/:id').get(getProductById).put(protect, admin, updateProduct);

export default router;
