import { useParams } from 'react-router-dom';

// Hooks
import { useGetTicketsQuery } from './redux/ticketsApiSlice';
import { useGetUsersQuery } from '../users/redux/usersApiSlice';
import useTitle from '../../hooks/useTitle';

// Components
import EditTicketForm from './EditTicketForm';
import Spinner from '../../components/Spinner';

const EditTicket = () => {
	useTitle('Angel Tech: Edit Ticket');

	const { id } = useParams();

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

	if (!ticket || !users?.length) return <Spinner />;

	return <EditTicketForm ticket={ticket} users={users} />;
};
export default EditTicket;
