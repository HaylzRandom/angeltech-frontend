// Hooks
import { useGetUsersQuery } from '../users/redux/usersApiSlice';
import useTitle from '../../hooks/useTitle';

// Components
import NewTicketForm from './NewTicketForm';
import Spinner from '../../components/Spinner';

const NewTicket = () => {
	useTitle('Angel Tech: New Ticket');

	const { users } = useGetUsersQuery('usersList', {
		selectFromResult: ({ data }) => ({
			users: data?.ids.map((id) => data?.entities[id]),
		}),
	});

	if (!users?.length) return <Spinner />;

	return <NewTicketForm users={users} />;
};
export default NewTicket;
