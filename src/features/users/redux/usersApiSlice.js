import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';

// Slices
import { apiSlice } from '../../../app/api/apiSlice';

const usersAdapter = createEntityAdapter({});

const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getUsers: builder.query({
			query: () => '/users',
			validateStatus: (response, result) => {
				return response.status === 200 && !result.isError;
			},
			keepUnusedDataFor: 5,
			transformResponse: (responseData) => {
				// Will map mongoDB ID to our ID
				const loadedUsers = responseData.map((user) => {
					user.id = user._id;
					return user;
				});

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
	}),
});

// Hooks
export const { useGetUsersQuery } = usersApiSlice;

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
