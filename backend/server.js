/**
   30.10.

   Entry Point of the Applicaton

   Using ES Modules rather than JS Modules
 */

import express from 'express';
import products from './data/products.js';
// import dotenv from 'dotenv';
// dotenv.config(); // Call it before using any env variables

// const port = process.env.PORT || 5000;
const port = 5000;

const app = express();

app.get('/', (req, res) => {
	res.send('API is RUNNING...');
});

app.get('/api/products', (req, res) => {
	res.json(products);
});

app.get('/api/products/:id', (req, res) => {
	const product = products.find((p) => p._id === req.params.id);
	res.json(product);
});

// Starting the Server
app.listen(port, () => console.log(`Server running on port ${port}`));
