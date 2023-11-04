/*
  04.11.

  Product Route Controller
*/

import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

// @desc    Fetching all Products
// @route   GET '/api/products'
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({});
	res.json(products);
});

// @desc    Fetching a Product
// @route   GET '/api/products/:id'
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		res.json(product);
	} else {
		res.status = 404;
		throw new Error(`Product Not Found`);
		// this error will be handled by the 'errorHandler' middleware
	}
});

export { getProducts, getProductById };
