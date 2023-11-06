/**
   29.10.

   Home Screen

   Fetching Data from the Database through the Server using 'axios'

   06.11.
   React-Redux
      Using 'useGetProductsQuery()' to get/fetch the products
 */

import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Message from '../components/Message';

const HomeScreen = () => {
	// Fetching the Products Data from the Server through Redux
	const { data: products, isLoading, error } = useGetProductsQuery();

	return (
		<>
			{isLoading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>
					{error?.data?.message || error.error}
				</Message>
			) : (
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
			)}
		</>
	);
};

export default HomeScreen;
