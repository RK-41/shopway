/**
   30.10.

   Entry Point of the Applicaton

   Using ES Modules rather than JS Modules

   03.11.
      Implemented Product Routes

   04.11.
      Implemented Error Handler Middleware

   09.11.
      Body Parser Middleware

   10.11.
      Cookie Parse Middleware

   13.11.
      Implemented Order Routes
      Implemented PayPal Routes

   16.11.
      Implemented Upload Routes
      Made the File Path '/uploads' Static
 */

import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

// 'dotenv.config()' should be called before using any env variables
dotenv.config();

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

// Linking respective routes to 'productsRoutes', 'userRoutes', 'orderRoutes', 'uploadRoutes'
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/uploads', uploadRoutes);

// PayPal Route
app.get('/api/config/paypal', (req, res) =>
	res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

// Saving Current Directory Path
const __dirname = path.resolve();
// Making the File Path '/uploads' Static
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Using Error Handler Middleware
app.use(notFound);
app.use(errorHandler);

// Starting the Server
app.listen(port, () => console.log(`Server running on port ${port}`));
