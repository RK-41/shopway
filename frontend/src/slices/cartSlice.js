/*
  08.11.23

  Cart Slice
*/

import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';

// Fetching Initial State from Local Storage
const initialState = localStorage.getItem('cart')
	? JSON.parse(localStorage.getItem('cart'))
	: { cartItems: [] };

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
	},
});

// Exporting 'addtoCart' and 'removeFromCart Action
export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;