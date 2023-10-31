/*
  31.10.

   User DataBase Model
*/

import mongoose from 'mongoose';

// Creating a Schema for Users
const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		isAdmin: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

// Creating the Model for Users named 'User' using 'userSchema'
const User = mongoose.model('User', userSchema);

export default User;
