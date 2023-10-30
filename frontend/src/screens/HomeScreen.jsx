/**
   29.10.

   Home Screen
 */

import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Product from '../components/Product';

const HomeScreen = () => {
	const [products, setProducts] = useState([]);

	// Fetching the Products Data from the Server
	useEffect(() => {
		const fetchProducts = async () => {
			const { data } = await axios.get('/api/products');
			setProducts(data);
		};

		fetchProducts();
	}, []);
	/**
      Putting empty array as the dependency as we want to run 'useEffect()' only once when the page loads.
    */

	return (
		<>
			<h1>Latest Products</h1>

			<Row>
				{products.map((product) => (
					<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
						<Product product={product} />
					</Col>
				))}
			</Row>
		</>
	);
};

export default HomeScreen;
