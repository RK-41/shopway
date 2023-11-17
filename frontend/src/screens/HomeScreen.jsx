/**
   29.10.

   Home Screen

   Fetching Data from the Database through the Server using 'axios'

   06.11.
   React-Redux
      Using 'useGetProductsQuery()' to get/fetch the products

   17.11.
   Pagination Implementation
   Search Functionality Implementation
 */

import { Link, useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import { useGetProductsQuery } from '../slices/productsApiSlice';

const HomeScreen = () => {
	const { keyword, pageNumber } = useParams();

	// Fetching the Products Data from the Server through Redux
	const { data, isLoading, error } = useGetProductsQuery({
		keyword,
		pageNumber,
	});

	return (
		<>
			{/* GO BACK BUTTON TAKES TO HOME RATHER THAN TAKING TO THE PREVIOUS PAGE */}
			{keyword && (
				<Link to='/' className='btn btn-light my-3'>
					Go Back
				</Link>
			)}
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
						{data.products.map((product) => (
							<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
								<Product product={product} />
							</Col>
						))}
					</Row>

					<Paginate
						pages={data.pages}
						page={data.page}
						keyword={keyword ? keyword : ''}
					/>
				</>
			)}
		</>
	);
};

export default HomeScreen;
