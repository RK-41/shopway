/*
  11.11.

  Users API Slice
   For the server.

  14.11.
   Endpoint Added for Profile Update:
      profile
   
  16.11.
   Endpoints Added:
      getUsers
      deleteUsers
      getUserDetails
      updateUser
*/

import { USERS_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const usersApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/auth`,
				method: 'POST',
				body: data,
			}),
		}),

		register: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}`,
				method: 'POST',
				body: data,
			}),
		}),

		logout: builder.mutation({
			query: () => ({
				url: `${USERS_URL}/logout`,
				method: 'POST',
			}),
		}),

		profile: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/profile`,
				method: 'PUT',
				body: data,
			}),
		}),

		getUsers: builder.query({
			query: () => ({
				url: USERS_URL,
			}),
			providesTags: ['Users'],
			keepUnusedDataFor: 5,
		}),

		deleteUser: builder.mutation({
			query: (userId) => ({
				url: `${USERS_URL}/${userId}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Users'],
		}),

		getUserDetails: builder.query({
			query: (userId) => ({
				url: `${USERS_URL}/${userId}`,
			}),
			keepUnusedDataFor: 5,
		}),

		updateUser: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/${data.userId}`,
				method: 'PUT',
				body: data,
			}),
			invalidatesTags: ['Users'],
		}),
	}),
});

export const {
	useLoginMutation,
	useRegisterMutation,
	useLogoutMutation,
	useProfileMutation,
	useGetUsersQuery,
	useDeleteUserMutation,
	useGetUserDetailsQuery,
	useUpdateUserMutation,
} = usersApiSlice;
