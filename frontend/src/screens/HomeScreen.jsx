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

   18.11.
   Product Carousel Implementation
   Meta Info Implementation using 'Meta' Component

   20.11.
   Added Search Result Range and Count Info. Message
 */

import { Link, useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';
import { useGetProductsQuery } from '../slices/productsApiSlice';

const HomeScreen = () => {
   const { keyword, pageNumber } = useParams();

   // Fetching the Products Data from the Server through Redux
   const { data, isLoading, error } = useGetProductsQuery({
      keyword,
      pageNumber,
   });

   const results = {
      from: (data?.page - 1) * (data?.pageSize) + 1,
      to: Math.min(Math.ceil(data?.count / data?.pages) * (data?.page), data?.count)
   }

   return (
      <>
         {/* ISSUE: 'Go Back' BUTTON TAKES TO HOME RATHER THAN TAKING TO THE PREVIOUS PAGE */}

         {isLoading ? (
            <Loader />
         ) : error ? (
            <Message variant='danger'>
               {error?.data?.message || error.error}
            </Message>
         ) : (
            <>
               <Meta />
               {!keyword ? (
                  <>
                     <ProductCarousel />
                     <h1>Latest Products</h1>
                  </>
               ) : (
                  <>
                     <Link to='/' className='btn btn-light my-3'>
                        Go Back
                     </Link>
                     {data?.count ? (
                        <Message>Showing {results.from} - {results.to} of {data.count} results for '{keyword}'</Message>
                     ) : <Message variant='danger'>Sorry, no results for '{keyword}'</Message>}
                  </>
               )}

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
