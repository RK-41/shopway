/*
  15.11.

  Product List Screen

  16.11.
   Implemented Delete Product Functionality

  17.11.
   Implemented Pagination
*/

import { LinkContainer } from 'react-router-bootstrap';
import { Table, Row, Col, Button } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import Paginate from '../../components/Paginate';
import {
	useGetProductsQuery,
	useCreateProductMutation,
	useDeleteProductMutation,
} from '../../slices/productsApiSlice';
import { toast } from 'react-toastify';

const ProductListScreen = () => {
	const { pageNumber } = useParams();

	const { data, isLoading, error, refetch } = useGetProductsQuery({
		pageNumber,
	});

	const [createProduct, { isLoading: loadingCreateProduct }] =
		useCreateProductMutation();

	const [deleteProduct, { isLoading: loadingDeleteProduct }] =
		useDeleteProductMutation();

	const createProductHandler = async () => {
		if (window.confirm('Are you sure you want to create a new product?')) {
			try {
				await createProduct();
				toast.success('Product Created Successfully');
				refetch();
			} catch (error) {
				toast.error(error?.data?.message || error.message);
			}
		}
	};

	const deleteHandler = async (productId) => {
		if (window.confirm('Are you sure you want to delete this product?')) {
			try {
				await deleteProduct(productId);
				toast.success('Product Deleted Successfully');
				refetch();
			} catch (error) {
				toast.error(error?.data?.message || error.error);
			}
		}
	};

	return (
		<>
			<Row className='align-items-center'>
				<Col>
					<h1>Products</h1>
				</Col>
				<Col className='text-end'>
					<Button className='btn-sm m-3' onClick={createProductHandler}>
						<FaEdit />
						Create a new Product
					</Button>
				</Col>
			</Row>

			{isLoading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<>
					<Table striped hover responsive className='table-sm'>
						<thead>
							<tr>
								<th>ID</th>
								<th>NAME</th>
								<th>PRICE</th>
								<th>CATEGROY</th>
								<th>BRAND</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{data.products.map((product) => (
								<tr key={product._id}>
									<td>{product._id}</td>
									<td>{product.name}</td>
									<td>${product.price}</td>
									<td>{product.category}</td>
									<td>{product.brand}</td>
									<td>
										<LinkContainer to={`/admin/product/${product._id}/edit`}>
											<Button variant='light' className='btn-sm mx-2'>
												<FaEdit />
											</Button>
										</LinkContainer>
										<Button
											variant='danger'
											className='btn-sm'
											onClick={() => deleteHandler(product._id)}
										>
											<FaTrash style={{ color: 'white' }} />
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>

					<Paginate pages={data.pages} page={data.page} isAdmin={true} />
				</>
			)}

			{loadingCreateProduct && <Loader />}
			{loadingDeleteProduct && <Loader />}
		</>
	);
};

export default ProductListScreen;
