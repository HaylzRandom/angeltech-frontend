import { SyncLoader } from 'react-spinners';

// Hooks
import { useGetUsersQuery } from '../users/redux/usersApiSlice';

// Components
import NewTicketForm from './NewTicketForm';

const NewTicket = () => {
	const { users } = useGetUsersQuery('usersList', {
		selectFromResult: ({ data }) => ({
			users: data?.ids.map((id) => data?.entities[id]),
		}),
	});

	if (!users?.length) return <SyncLoader />;

	return <NewTicketForm users={users} />;
};
export default NewTicket;
