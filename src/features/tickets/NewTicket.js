import { useSelector } from 'react-redux';
import { SyncLoader } from 'react-spinners';

// Selectors
import { selectAllUsers } from '../users/redux/usersApiSlice';

// Components
import NewTicketForm from './NewTicketForm';

const NewTicket = () => {
	const users = useSelector(selectAllUsers);

	if (!users?.length) return <p>Not Currently Available</p>;

	return <NewTicketForm users={users} />;
};
export default NewTicket;
