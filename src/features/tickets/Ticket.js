import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { memo } from 'react';

// Hooks
import { useGetTicketsQuery } from './redux/ticketsApiSlice';

const Ticket = ({ ticketID }) => {
	// Fetch specific note
	const { ticket } = useGetTicketsQuery('ticketsList', {
		selectFromResult: ({ data }) => ({
			ticket: data?.entities[ticketID],
		}),
	});

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
				<td className='table__cell ticket__customer'>{ticket.customerName}</td>
				<td className='table__cell ticket__title'>{ticket.title}</td>
				<td className='table__cell ticket__assigned'>{ticket.assignedName}</td>
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

// Will only cause re-render if changes in data
const memoizedTicket = memo(Ticket);

export default memoizedTicket;
