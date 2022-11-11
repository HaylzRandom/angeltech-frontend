import { useParams } from 'react-router-dom';
import { SyncLoader } from 'react-spinners';

// Hooks
import { useGetTicketsQuery } from './redux/ticketsApiSlice';
import { useGetUsersQuery } from '../users/redux/usersApiSlice';
import useAuth from '../../hooks/useAuth';



// Components
import EditTicketForm from './EditTicketForm';

const EditTicket = () => {
	const { id } = useParams();

	const { username, isManager, isAdmin } = useAuth();

	// Get specific ticket
	const { ticket } = useGetTicketsQuery('ticketsList', {
		selectFromResult: ({ data }) => ({
			ticket: data?.entities[id],
		}),
	});

	// Get list of users
	const { users } = useGetUsersQuery('usersList', {
		selectFromResult: ({ data }) => ({
			users: data?.ids.map((id) => data?.entities[id]),
		}),
	});

	if (!ticket || !users?.length) return <SyncLoader />;

	return <EditTicketForm ticket={ticket} users={users} />;
};
export default EditTicket;
