/*
  29.10.23

  Index: Entry Point of React

  08.11
   Cart Route Setup

  11.11.
   Login Route Setup
   Register Route Setup

  12.11.
   Shipping Route Setup as Private Route

  13.11.
   Payment Route Setup as Private Route
   Place Order Route Setup as Private Route
   Order Route Setup as Private Route

  14.11.23.
   PayPalScriptProvider Setup
   Profile Route Setup as Private Route

  15.11.
   Admin Route Setup
   Order List Route Setup as Admin Route
   Product List Route Setup as Admin Route
   Product Edit Route Setup as Admin Route

  16.11.
   User List Route Setup as Admin Route
   User Edit Route Setup as Admin Route

  17.11.
   Pagination Implementation for the User and the Admin
   Product Search Functionality Implementation

  18.11.
   Helmet Provider Impelementation
*/

import React from 'react';
import ReactDOM from 'react-dom/client';
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import store from './store';

// import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrderListScreen from './screens/admin/OrderListScreen';
import ProductListScreen from './screens/admin/ProductListScreen';
import ProductEditScreen from './screens/admin/ProductEditScreen';
import UserListScreen from './screens/admin/UserListScreen';
import UserEditScreen from './screens/admin/UserEditScreen';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/' element={<App />}>
			<Route index={true} path='/' element={<HomeScreen />} />
			<Route path='/search/:keyword' element={<HomeScreen />} />
			<Route path='/page/:pageNumber' element={<HomeScreen />} />
			<Route
				path='/search/:keyword/page/:pageNumber'
				element={<HomeScreen />}
			/>
			<Route path='/product/:id' element={<ProductScreen />} />
			<Route path='/cart' element={<CartScreen />} />
			<Route path='/login' element={<LoginScreen />} />
			<Route path='/register' element={<RegisterScreen />} />

			<Route path='' element={<PrivateRoute />}>
				<Route path='/shipping' element={<ShippingScreen />} />
				<Route path='/paymentmethod' element={<PaymentMethodScreen />} />
				<Route path='/placeorder' element={<PlaceOrderScreen />} />
				<Route path='/order/:id' element={<OrderScreen />} />
				<Route path='/profile' element={<ProfileScreen />} />
			</Route>

			<Route path='' element={<AdminRoute />}>
				<Route path='/admin/orderlist' element={<OrderListScreen />} />
				<Route path='/admin/productlist' element={<ProductListScreen />} />
				<Route
					path='/admin/productlist/:pageNumber'
					element={<ProductListScreen />}
				/>
				<Route path='/admin/product/:id/edit' element={<ProductEditScreen />} />
				<Route path='/admin/userlist' element={<UserListScreen />} />
				<Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
			</Route>
		</Route>
	)
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<HelmetProvider>
			<Provider store={store}>
				<PayPalScriptProvider deferLoading={true}>
					<RouterProvider router={router} />
				</PayPalScriptProvider>
			</Provider>
		</HelmetProvider>
	</React.StrictMode>
);

reportWebVitals();
