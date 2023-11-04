/*
  03.11.23.
  
  Product Router

  04.11.23
   Async Handler Implementation
*/

import express from 'express';
import {
	getProductById,
	getProducts,
} from '../controllers/productController.js';

// Creating a Router
const router = express.Router();

// Handling Routes and Requests
router.route('/').get(getProducts);
router.route('/:id').get(getProductById);

export default router;
