/**
   30.10.

   Entry Point of the Applicaton

   Using ES Modules rather than JS Modules

   03.11.
      Implementing Product Routes

   04.11.
      Implementing Error Handler Middleware

   09.11.
      Body Parser Middleware

   10.11.
      Cookie Parse Middleware
 */

import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config(); // Call it before using any env variables
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';

const port = process.env.PORT || 5000;

// Connecting to MongoDB
connectDB();

// Creating an Express App
const app = express();

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie Parser Middleware
app.use(cookieParser());

app.get('/', (req, res) => {
	res.send('API is RUNNING...');
});

// Linking '/api/products' to 'productsRoutes' and 'userRoutes'
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

// Using Error Handler Middleware
app.use(notFound);
app.use(errorHandler);

// Starting the Server
app.listen(port, () => console.log(`Server running on port ${port}`));
