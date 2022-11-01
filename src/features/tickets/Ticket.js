import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';

// Selectors
import { selectTicketByID } from './redux/ticketsApiSlice';

const Ticket = ({ ticketID }) => {
	const ticket = useSelector((state) => selectTicketByID(state, ticketID));

	const navigate = useNavigate();

	if (ticket) {
		const created = new Date(ticket.createdAt).toLocaleString('en-gb', {
			day: 'numeric',
			month: 'long',
		});
		const updated = new Date(ticket.updatedAt).toLocaleString('en-gb', {
			day: 'numeric',
			month: 'long',
		});

		// Handlers
		const handleEdit = () => navigate(`/dash/tickets/${ticketID}`);

		return (
			<tr className='table__row'>
				<td className='table__cell ticket__status'>
					{ticket.completed ? (
						<span className='ticket__status--completed'>Completed</span>
					) : (
						<span className='ticket__status--open'>Open</span>
					)}
				</td>
				<td className='table__cell ticket__customer'>{ticket.customer}</td>
				<td className='table__cell ticket__title'>{ticket.title}</td>
				<td className='table__cell ticket__assigned'>{ticket.assigned}</td>
				<td className='table__cell ticket__created'>{created}</td>
				<td className='table__cell ticket__updated'>{updated}</td>
				<td className='table__cell'>
					<button className='icon-button table__button' onClick={handleEdit}>
						<FontAwesomeIcon icon={faPenToSquare} />
					</button>
				</td>
			</tr>
		);
	} else return null;
};
export default Ticket;
