/*
  08.11.23

  Cart Slice

  12.11.23
   Save Shipping Address Reducer
   Save Payment Method Reducer

  13.11.
   Clear Cart Items Reducer
*/

import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';

// Fetching Initial State from Local Storage
const initialState = localStorage.getItem('cart')
	? JSON.parse(localStorage.getItem('cart'))
	: { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' };

// Creating Cart Slice
const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action) => {
			const item = action.payload;

			const existItem = state.cartItems.find((x) => x._id === item._id);

			if (existItem) {
				state.cartItems = state.cartItems.map((x) =>
					x._id === existItem._id ? item : x
				);
			} else {
				state.cartItems = [...state.cartItems, item];
			}

			return updateCart(state);
		},

		removeFromCart: (state, action) => {
			state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);

			return updateCart(state);
		},

		saveShippingAddress: (state, action) => {
			state.shippingAddress = action.payload;
			return updateCart(state);
		},

		savePaymentMethod: (state, action) => {
			state.paymentMethod = action.payload;
			return updateCart(state);
		},

		clearCartItems: (state, action) => {
			state.cartItems = [];
			return updateCart(state);
		},
	},
});

// Exporting 'addtoCart' and 'removeFromCart Action
export const {
	addToCart,
	removeFromCart,
	saveShippingAddress,
	savePaymentMethod,
	clearCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;
