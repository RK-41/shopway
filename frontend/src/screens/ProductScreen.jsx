/* eslint-disable no-unused-vars */
/**
   30.10.

   Product Screen

   06.11.
   React-Redux: State Management

   08.11.
   Add to Cart Implementation

   17.11.
   Product Review Implementation

   18.11.
   Meta Info Implementation for Specific Product Page

 */

import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
	Row,
	Col,
	Image,
	ListGroup,
	Card,
	Button,
	Form,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import {
	useGetProductDetailsQuery,
	useCreateProductReviewMutation,
} from '../slices/productsApiSlice';
import Message from '../components/Message';
import Meta from '../components/Meta';
import { addToCart } from '../slices/cartSlice';

const ProductScreen = () => {
	const { id: productId } = useParams();

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [qty, setQty] = useState(1);
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState('');

	// Fetching Product Data from the Server through Redux
	const {
		data: product,
		isLoading,
		refetch,
		error,
	} = useGetProductDetailsQuery(productId);

	const [createProductReview, { isLoading: loadingCreateProductReview }] =
		useCreateProductReviewMutation();

	const { userInfo } = useSelector((state) => state.auth);

	const addToCartHandler = () => {
		dispatch(addToCart({ ...product, qty }));
		navigate('/cart');
	};

	const submitHandler = async (e) => {
		e.preventDefault();

		try {
			await createProductReview({
				productId,
				rating,
				comment,
			}).unwrap();

			refetch();
			toast.success('Review Submitted');
			setRating(0);
			setComment('');
		} catch (error) {
			toast.error(error?.data?.message || error.error);
		}
	};

	return (
		<>
			<Link className='btn btn-light my-3' to='/'>
				Go Back
			</Link>

			{isLoading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>
					{error?.data?.message || error.error}
				</Message>
			) : (
				<>
					<Meta title={product.name} />
					<Row>
						<Col md={5}>
							<Image src={product.image} alt={product.name} fluid />
						</Col>

						<Col md={4}>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<h3>{product.name}</h3>
								</ListGroup.Item>

								<ListGroup.Item>
									<Rating
										value={product.rating}
										text={`${product.numReviews} reviews`}
									/>
								</ListGroup.Item>

								<ListGroup.Item>Price: ${product.price}</ListGroup.Item>

								<ListGroup.Item>{product.description}</ListGroup.Item>
							</ListGroup>
						</Col>

						<Col md={3}>
							<Card>
								<ListGroup variant='flush'>
									<ListGroup.Item>
										<Row>
											<Col>Price:</Col>
											<Col>${product.price}</Col>
										</Row>
									</ListGroup.Item>

									<ListGroup.Item>
										<Row>
											<Col>Status:</Col>
											<Col>
												{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
											</Col>
										</Row>
									</ListGroup.Item>

									{/* ADD TO CART */}
									{product.countInStock > 0 && (
										<ListGroup.Item>
											<Row>
												<Col>Qty</Col>
												<Col>
													<Form.Control
														as='select'
														value={qty}
														onChange={(e) => setQty(Number(e.target.value))}
													>
														{[...Array(product.countInStock).keys()].map(
															(x) => (
																<option key={x + 1} value={x + 1}>
																	{x + 1}
																</option>
															)
														)}
													</Form.Control>
												</Col>
											</Row>
										</ListGroup.Item>
									)}

									<ListGroup.Item>
										<Button
											className='btn-block'
											type='button'
											disabled={product.countInStock === 0}
											onClick={addToCartHandler}
										>
											Add to Cart
										</Button>
									</ListGroup.Item>
								</ListGroup>
							</Card>
						</Col>
					</Row>

					<Row className='review'>
						<Col md={6}>
							<h2>Reviews</h2>

							{product.reviews.length === 0 && (
								<Message>No Reviews Yet</Message>
							)}

							<ListGroup variant='flush'>
								{product.reviews.map((review) => (
									<ListGroup.Item key={review._id}>
										<strong>{review.name}</strong>
										<Rating value={review.rating} />
										<p>{review.createdAt.substring(0, 10)}</p>
										<p>{review.comment}</p>
									</ListGroup.Item>
								))}

								<ListGroup.Item>
									<h2>Review this Product</h2>

									{userInfo ? (
										<Form onSubmit={submitHandler}>
											<Form.Group controlId='rating' className='my-2'>
												<Form.Label>Rating</Form.Label>
												<Form.Control
													as='select'
													value={rating}
													required
													onChange={(e) => setRating(e.target.value)}
												>
													<option value=''>Select</option>
													<option value='1'>1 - Poor</option>
													<option value='2'>2 - Unsatisfactory</option>
													<option value='3'>3 - Good</option>
													<option value='4'>4 - Very Good</option>
													<option value='5'>5 - Loved It</option>
												</Form.Control>
											</Form.Group>

											<Form.Group controlId='comment' className='my-2'>
												<Form.Label>Comment</Form.Label>
												<Form.Control
													as='textarea'
													row='3'
													placeholder='Write a product review...'
													value={comment}
													onChange={(e) => setComment(e.target.value)}
												></Form.Control>
											</Form.Group>

											<Button
												disabled={loadingCreateProductReview}
												type='submit'
												variant='primary'
											>
												Submit
											</Button>
										</Form>
									) : (
										<Message>
											<Link to='/login'>Sign in</Link> to review this product{' '}
										</Message>
									)}
								</ListGroup.Item>
							</ListGroup>
							{loadingCreateProductReview && <Loader />}
						</Col>
					</Row>
				</>
			)}
		</>
	);
};

export default ProductScreen;
