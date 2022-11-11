import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';

// Slices
import { apiSlice } from '../../../app/api/apiSlice';

const usersAdapter = createEntityAdapter({});

const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getUsers: builder.query({
			query: () => ({
				url: '/users',
				validateStatus: (response, result) => {
					return response.status === 200 && !result.isError;
				},
			}),

			transformResponse: (responseData) => {
				// Will map mongoDB ID to our ID
				const loadedUsers = responseData.map((user) => {
					user.id = user._id;
					return user;
				});
				/* console.log('loadedUsers', loadedUsers); */

				return usersAdapter.setAll(initialState, loadedUsers);
			},
			providesTags: (result, error, arg) => {
				if (result?.ids) {
					return [
						{ type: 'User', id: 'LIST' },
						...result.ids.map((id) => ({ type: 'User', id })),
					];
				} else return [{ type: 'User', id: 'LIST' }];
			},
		}),
		addNewUser: builder.mutation({
			query: (initialUserData) => ({
				url: '/users',
				method: 'POST',
				body: {
					...initialUserData,
				},
			}),
			invalidatesTags: [{ type: 'User', id: 'LIST' }],
		}),
		updateUser: builder.mutation({
			query: (initialUserData) => ({
				url: '/users',
				method: 'PATCH',
				body: {
					...initialUserData,
				},
			}),
			invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg.id }],
		}),
		deleteUser: builder.mutation({
			query: ({ id }) => ({
				url: '/users',
				method: 'DELETE',
				body: {
					id,
				},
			}),
			invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg.id }],
		}),
	}),
});

// Hooks
export const {
	useGetUsersQuery,
	useAddNewUserMutation,
	useUpdateUserMutation,
	useDeleteUserMutation,
} = usersApiSlice;

// Selectors

// Returns query result object
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();

// Creates memoized selector
const selectUsersData = createSelector(
	selectUsersResult,
	(usersResult) => usersResult.data // Normalised state object with IDs and Entities
);

// getSelectors create these selectors and we rename them with aliases using destructuring
export const {
	selectAll: selectAllUsers,
	selectById: selectUserByID,
	selectIds: selectUserIDs,
} = usersAdapter.getSelectors(
	(state) => selectUsersData(state) ?? initialState
);
