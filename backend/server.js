/**
   30.10.

   Entry Point of the Applicaton

   Using ES Modules rather than JS Modules

   03.11.
      Implementing Product Routes

   04.11.
      Implementing Error Handler Middleware
 */

import express from 'express';
import dotenv from 'dotenv';
dotenv.config(); // Call it before using any env variables
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js';

const port = process.env.PORT || 5000;

// Connecting to MongoDB
connectDB();

// Creating an Express App
const app = express();

app.get('/', (req, res) => {
	res.send('API is RUNNING...');
});

// Linking '/api/products' to 'productsRoutes'
app.use('/api/products', productRoutes);

// Using Error Handler Middleware
app.use(notFound);
app.use(errorHandler);

// Starting the Server
app.listen(port, () => console.log(`Server running on port ${port}`));
