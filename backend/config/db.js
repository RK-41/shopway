/**
   31.10.23

   To Connect to the MongoDB DataBase using Mongoose
 */

import mongoose from 'mongoose';
import colors from 'colors';

// Function to Connect DB
const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI);
		console.log(`MongoDB Connected: ${conn.connection.host}`.yellow.inverse);
	} catch (error) {
		console.log(`Error: ${error.message}`);
		process.exit(1);
	}
};

export default connectDB;
