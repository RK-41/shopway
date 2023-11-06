/*
  06.11.

  Products API Slice
   To inject endpoints into the main API Slice 'apiSlice'
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
		}),

		getProductDetails: builder.query({
			query: (productId) => ({
				url: `${PRODUCTS_URL}/${productId}`,
			}),
			keepUnusedDataFro: 5,
		}),
	}),
});

export const { useGetProductsQuery, useGetProductDetailsQuery } =
	productsApiSlice;
/*
  By convention, 'getProducts' query is exported as 'useGetProductsQuery' prefixed with 'use' and suffixed with 'Query'
*/
