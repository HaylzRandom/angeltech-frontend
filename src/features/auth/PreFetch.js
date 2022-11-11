import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

// Redux
import { store } from '../../app/store';

// Slices
import { ticketsApiSlice } from '../tickets/redux/ticketsApiSlice';
import { usersApiSlice } from '../users/redux/usersApiSlice';

const PreFetch = () => {
	useEffect(() => {
		// Will prefetch tickets and users hooks using the inbuilt prefretch ability
		store.dispatch(
			ticketsApiSlice.util.prefetch('getTickets', 'ticketsList', {
				force: true,
			})
		);
		store.dispatch(
			usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true })
		);
	}, []);

	return <Outlet />;
};
export default PreFetch;
