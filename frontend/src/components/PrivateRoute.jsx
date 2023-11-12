/*
  12.11.

  Private Route Component

   Accessible to Logged-in Users only.
*/

import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
	const { userInfo } = useSelector((state) => state.auth);

	return userInfo ? <Outlet /> : <Navigate to='/login' replace />;
};

export default PrivateRoute;
