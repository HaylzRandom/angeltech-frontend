import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
	// Think like axios connect
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500' }),
	// Used for cache data
	tagTypes: ['Ticket', 'User'],
	endpoints: (builder) => ({}),
});
