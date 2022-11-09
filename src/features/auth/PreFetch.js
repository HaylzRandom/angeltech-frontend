import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

// Redux
import { store } from '../../app/store';

// Slices
import { ticketsApiSlice } from '../tickets/redux/ticketsApiSlice';
import { usersApiSlice } from '../users/redux/usersApiSlice';

const PreFetch = () => {
	useEffect(() => {
		/* console.log('Subscribing'); */
		const tickets = store.dispatch(
			ticketsApiSlice.endpoints.getTickets.initiate()
		);
		const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());

		return () => {
			/* console.log('Unsubscribing'); */
			tickets.unsubscribe();
			users.unsubscribe();
		};
	}, []);

	return <Outlet />;
};
export default PreFetch;
