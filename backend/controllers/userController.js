/*
  09.11.23

  User Controller

  10.11.23
   User Auth Setup
   User Logout Setup
   User Registration Setup

*/

import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc    Auth User & Get token
// @route   POST '/api/users/login'
// @acess   Public
const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (user && (await user.matchPassword(password))) {
		generateToken(res, user._id);

		res.status(200).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		});
	} else {
		console.log('💥ERROR');
		res.status(401); // 401: Unauthorized
		throw new Error(`Invalid email or password`);
	}
	// res.send('failed');
});

// @desc    Register User
// @route   POST '/api/users'
// @acess   Public
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	const userExist = await User.findOne({ email });

	if (userExist) {
		res.status(400); // Client Error (User already exixts)
		throw new Error('User already exists');
	}

	// Creating a new document in the DB for the new user
	const user = await User.create({
		name,
		email,
		password,
	});

	// When the user doc is created successfully
	if (user) {
		generateToken(res, user._id);

		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		});
	} else {
		res.status(400);
		throw new Error('Invalid user data');
	}
});

// @desc    Logout User and Clear Cookie
// @route   POST '/api/users/logout'
// @acess   Private
const logoutUser = asyncHandler(async (req, res) => {
	// Clearing the Cookie
	res.cookie('jwt', '', {
		httpOnly: true,
		expires: new Date(0),
	});

	res.status(200).json({
		message: 'Logged Out Successfully',
	});
});

// @desc    Get User Profile
// @route   GET '/api/users/profile'
// @acess   Private
const getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findOne(req.user._id);

	if (user) {
		res.status(200).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

// @desc    Update User Profile
// @route   PUT '/api/users/profile'
// @acess   Private
const updateUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findOne(req.user._id);

	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;

		if (req.body.password) {
			user.password = req.body.password;
		}

		// Saving and fetching the updated user doc
		const updatedUser = await user.save();

		res.status(200).json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

// @desc    Get Users
// @route   GET '/api/users'
// @acess   Private/Admin
const getUsers = asyncHandler(async (req, res) => {
	res.send('get users');
});

// @desc    Get User by Id
// @route   GET '/api/users/:id'
// @acess   Private/Admin
const getUserById = asyncHandler(async (req, res) => {
	res.send('get user by id');
});

// @desc    Delete User
// @route   DELETE '/api/users/:id'
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
	res.send('delete user');
});

// @desc    Update User
// @route   PUT '/api/users/:id'
// @acess   Private/Admin
const updateUser = asyncHandler(async (req, res) => {
	res.send('update user');
});

export {
	authUser,
	registerUser,
	logoutUser,
	getUserProfile,
	updateUserProfile,
	getUsers,
	getUserById,
	deleteUser,
	updateUser,
};
