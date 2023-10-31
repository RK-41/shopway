/*
  31.10.

  Users' Seeding Data
*/

import bcrypt from 'bcryptjs';

// Creating Users
const users = [
	{
		name: 'Admin User',
		email: 'admin@email.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: true,
	},
	{
		name: 'John Watson',
		email: 'john@email.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: false,
	},
	{
		name: 'Sherlock',
		email: 'sherlock@email.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: false,
	},
];

export default users;
