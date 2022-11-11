import { SyncLoader } from 'react-spinners';

// Hooks
import { useGetUsersQuery } from '../users/redux/usersApiSlice';
import useTitle from '../../hooks/useTitle';

// Components
import NewTicketForm from './NewTicketForm';

const NewTicket = () => {
	useTitle('Angel Tech: New Ticket');

	const { users } = useGetUsersQuery('usersList', {
		selectFromResult: ({ data }) => ({
			users: data?.ids.map((id) => data?.entities[id]),
		}),
	});

	if (!users?.length) return <SyncLoader />;

	return <NewTicketForm users={users} />;
};
export default NewTicket;
