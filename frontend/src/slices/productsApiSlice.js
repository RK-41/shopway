/*
  06.11.

  Products API Slice
   To inject endpoints into the main API Slice 'apiSlice'

  15.11.
   Endpoints Added:
      createProduct
      updateProduct

  16.11.
   Endpoints Added:
      uploadProductImage
      deleteProduct
*/

import { PRODUCTS_URL, UPLOAD_URL } from '../constants';
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

		uploadProductImage: builder.mutation({
			query: (data) => ({
				url: `${UPLOAD_URL}`,
				method: 'POST',
				body: data,
			}),
		}),

		deleteProduct: builder.mutation({
			query: (productId) => ({
				url: `${PRODUCTS_URL}/${productId}`,
				method: 'DELETE',
			}),
		}),
	}),
});

export const {
	useGetProductsQuery,
	useGetProductDetailsQuery,
	useCreateProductMutation,
	useUpdateProductMutation,
	useUploadProductImageMutation,
	useDeleteProductMutation,
} = productsApiSlice;
/*
  By convention, 'getProducts' query is exported as 'useGetProductsQuery' prefixed with 'use' and suffixed with 'Query'
*/
