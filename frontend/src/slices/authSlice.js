/*
  11.11.23

  Auth Slice
   To set the user credentials to the Local Storage and use them.
*/

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	userInfo: localStorage.getItem('userInfo')
		? JSON.parse(localStorage.getItem('userInfo'))
		: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setCredentials: (state, action) => {
			state.userInfo = action.payload;

			localStorage.setItem('userInfo', JSON.stringify(action.payload));
		},

		logout: (state, action) => {
			state.userInfo = null;
			localStorage.removeItem('userInfo');
		},
	},
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
