/*
  06.11.

  Products API Slice
   To inject endpoints into the main API Slice 'apiSlice'

  15.11.
   Endpoints Added:
      createProduct
      updateProduct
*/

import { PRODUCTS_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const productsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getProducts: builder.query({
			query: () => ({
				url: PRODUCTS_URL,
			}),
			keepUnusedDataFor: 5,
			providesTags: ['Products'],
		}),

		getProductDetails: builder.query({
			query: (productId) => ({
				url: `${PRODUCTS_URL}/${productId}`,
			}),
			keepUnusedDataFro: 5,
		}),

		createProduct: builder.mutation({
			query: () => ({
				url: PRODUCTS_URL,
				method: 'POST',
			}),
			invalidateTags: ['Product'],
		}),

		updateProduct: builder.mutation({
			query: (data) => ({
				url: `${PRODUCTS_URL}/${data.productId}`,
				method: 'PUT',
				body: data,
			}),
			invalidatesTags: ['Products'],
		}),
	}),
});

export const {
	useGetProductsQuery,
	useGetProductDetailsQuery,
	useCreateProductMutation,
	useUpdateProductMutation,
} = productsApiSlice;
/*
  By convention, 'getProducts' query is exported as 'useGetProductsQuery' prefixed with 'use' and suffixed with 'Query'
*/
