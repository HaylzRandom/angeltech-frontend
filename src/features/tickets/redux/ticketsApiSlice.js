import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';

// Slices
import { apiSlice } from '../../../app/api/apiSlice';

const ticketsAdapter = createEntityAdapter({});

const initialState = ticketsAdapter.getInitialState();

export const ticketsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getTickets: builder.query({
			query: () => '/tickets',
			validateStatus: (response, result) => {
				return response.status === 200 && !result.isError;
			},
			keepUnusedDataFor: 5,
			transformResponse: (responseData) => {
				// Will map mongoDB ID to our ID
				const loadedTickets = responseData.map((ticket) => {
					ticket.id = ticket._id;
					return ticket;
				});

				return ticketsAdapter.setAll(initialState, loadedTickets);
			},
			providesTags: (result, error, arg) => {
				if (result?.ids) {
					return [
						{ type: 'Ticket', id: 'LIST' },
						...result.ids.map((id) => ({ type: 'Ticket', id })),
					];
				} else return [{ type: 'Ticket', id: 'LIST' }];
			},
		}),
	}),
});

// Hooks
export const { useGetTicketsQuery } = ticketsApiSlice;

// Selectors

// Returns query result object
export const selectTicketsResult = ticketsApiSlice.endpoints.getTickets.select();

// Creates memoized selector
const selectTicketsData = createSelector(
	selectTicketsResult,
	(ticketsResult) => ticketsResult.data // Normalised state object with IDs and Entities
);

// getSelectors create these selectors and we rename them with aliases using destructuring
export const {
	selectAll: selectAllTickets,
	selectById: selectTicketByID,
	selectIds: selectTicketIDs,
} = ticketsAdapter.getSelectors(
	(state) => selectTicketsData(state) ?? initialState
);
