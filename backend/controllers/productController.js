/*
  04.11.

  Product Route Controller

  15.11.
  Controllers Added:
   createProduct
   updateProduct
   
  16.11.
  Controller Added:
   deleteProduct

  17.11.23
  Controller Added:
   createProductReview

  Controller Modified:
   getProducts: Pagination Implementation

  18.11.23
  Controller Added:
   getTopProducts
*/

import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

// @desc    Fetching all Products
// @route   GET '/api/products'
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
	const pageSize = process.env.PAGINATION_LIMIT || 8;
	const page = Number(req.query.pageNumber) || 1;
	const keyword = req.query.keyword
		? { name: { $regex: req.query.keyword, $options: 'i' } }
		: {};
	const count = await Product.countDocuments({ ...keyword });

	const products = await Product.find({ ...keyword })
		.limit(pageSize)
		.skip(pageSize * (page - 1));

	res.json({ products, page, pages: Math.ceil(count / pageSize), pageSize, count });
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

// @desc    Create a Product
// @route   POST '/admin/products'
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
	const product = new Product({
		name: 'Sample name',
		price: 0,
		user: req.user._id,
		image: '/images/sample.jpg',
		brand: 'Sample brand',
		category: 'Sample category',
		countInStock: 0,
		description: 'Sample description',
	});

	const createdProduct = await product.save();
	res.status(201).json(createdProduct);
});

// @desc    Update a Product
// @route   PUT 'admin/product/:id'
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
	const { name, price, description, image, brand, category, countInStock } =
		req.body;

	const product = await Product.findById(req.params.id);

	if (product) {
		product.name = name;
		product.price = price;
		product.description = description;
		product.image = image;
		product.brand = brand;
		product.category = category;
		product.countInStock = countInStock;

		const updatedProduct = await product.save();
		res.json(updatedProduct);
	} else {
		res.status(404);
		throw new Error('Resource not found');
	}
});

// @desc    Delete a Product
// @route   DELETE '/api/products/:id'
// @access  Product/Admin
const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		await Product.deleteOne({ _id: product._id });
		res.status(200).json({
			message: 'Product Deleted',
		});
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});

// @desc    Crea a Product Review
// @route   POST '/api/products/:id/reivews'
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
	const { rating, comment } = req.body;
	const product = await Product.findById(req.params.id);

	if (product) {
		// const notACustomer = product.customers.find(
		// 	(customer) => customer.user.toString() !== req.user._id.toString()
		// );

		// if (notACustomer) {
		// 	res.status(400);
		// 	throw new Error('You Have Not Purchased This Product Yet');
		// }

		const alreadyReviewed = product.reviews.find(
			(review) => review.user.toString() === req.user._id.toString()
		);

		if (alreadyReviewed) {
			res.status(400);
			throw new Error('Product Already Reviewed');
		}

		const review = {
			name: req.user.name,
			rating: Number(rating),
			comment,
			user: req.user._id,
		};

		product.reviews.push(review);

		product.numReviews = product.reviews.length;

		product.rating =
			product.reviews.reduce((acc, review) => acc + review.rating, 0) /
			product.reviews.length;

		await product.save();
		res.status(201).json({
			message: 'Review added',
		});
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});

// @desc    Get Top Rated Products
// @route   GET '/api/products/top'
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({}).sort({ rating: -1 }).limit(3);

	res.status(200).json(products);
});

export {
	getProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
	createProductReview,
	getTopProducts,
};
