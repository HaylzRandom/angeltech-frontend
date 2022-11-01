import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { SyncLoader } from 'react-spinners';

// Selectors
import { selectTicketByID } from './redux/ticketsApiSlice';
import { selectAllUsers } from '../users/redux/usersApiSlice';

// Components
import EditTicketForm from './EditTicketForm';

const EditTicket = () => {
	const { id } = useParams();

	const ticket = useSelector((state) => selectTicketByID(state, id));
	const users = useSelector(selectAllUsers);

	return ticket && users ? (
		<EditTicketForm ticket={ticket} users={users} />
	) : (
		<SyncLoader />
	);
};
export default EditTicket;
