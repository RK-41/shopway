/**
   30.10.

   Entry Point of the Applicaton

   Using ES Modules rather than JS Modules
 */

import express from 'express';
import dotenv from 'dotenv';
dotenv.config(); // Call it before using any env variables
import connectDB from './config/db.js';
import products from './data/products.js';
import productRoutes from './routes/productRoutes.js';

const port = process.env.PORT || 5000;

// Connecting to MongoDB
connectDB();

const app = express();

app.get('/', (req, res) => {
	res.send('API is RUNNING...');
});

// Linking '/api/products' to 'productsRoutes'
app.use('/api/products', productRoutes);

// Starting the Server
app.listen(port, () => console.log(`Server running on port ${port}`));
