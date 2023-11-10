/*
  31.10.

   User DataBase Model

   09.11.
      Auth using 'bcryptjs'

   10.11.
      Replacing the password of the new user with a hashed password before the user is saved/registered using 'userSchema.pre()'
         The password is contained in the request body.

*/

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

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

// Matching the entered password with the existing password
userSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

// Hashing the password for the new use before the registration
userSchema.pre('save', async function (next) {
	// If we're not dealing with the password then, move on
	//    'this' means current user
	if (!this.isModified('password')) {
		next();
	}

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

// Creating the Model for Users named 'User' using 'userSchema'
const User = mongoose.model('User', userSchema);

export default User;
