import { SyncLoader } from 'react-spinners';

// Components
import Ticket from './Ticket';

// Hooks
import { useGetTicketsQuery } from './redux/ticketsApiSlice';
import useAuth from '../../hooks/useAuth';
import useTitle from '../../hooks/useTitle';

const TicketsList = () => {
	useTitle('Angel Tech: Tickets List');

	const { username, isManager, isAdmin, isEmployee } = useAuth();

	const {
		data: tickets,
		isLoading,
		isSuccess,
		isError,
		error,
	} = useGetTicketsQuery('ticketsList', {
		pollingInterval: 15000,
		refetchOnFocus: true,
		refetchOnMountOrArgChange: true,
	});

	if (isLoading) return <SyncLoader color='#6e36d6' />;

	if (isError) return <p className='errorMsg'>{error?.data?.message}</p>;

	if (isSuccess) {
		const { ids, entities } = tickets;

		let filteredIds;

		if (isManager || isAdmin) {
			// Manager and Admins will see all tickets
			filteredIds = [...ids];
		} else if (isEmployee) {
			// Employees will only see tickets assigned to them or are not assigned
			filteredIds = ids.filter(
				(ticketID) =>
					entities[ticketID].assignedName === username ||
					entities[ticketID].assignedName === undefined
			);
		} else {
			// Customers will only see tickets that they created or they are the customer
			filteredIds = ids.filter(
				(ticketID) => entities[ticketID].customerName === username
			);
		}

		// If there are no tickets to be shown
		if (!filteredIds.length) {
			return <p className='errorMsg'>No tickets found!</p>;
		}

		const tableContent =
			filteredIds?.length &&
			filteredIds.map((ticketID) => (
				<Ticket key={ticketID} ticketID={ticketID} />
			));

		return (
			<table className='table table--tickets'>
				<thead className='table__thead'>
					<tr>
						<th scope='col' className='table__th ticket__status'>
							Status
						</th>
						<th scope='col' className='table__th ticket__customer'>
							Customer
						</th>
						<th scope='col' className='table__th ticket__title'>
							Title
						</th>
						<th scope='col' className='table__th ticket__assigned'>
							Assigned
						</th>
						<th scope='col' className='table__th ticket__created'>
							Created
						</th>
						<th scope='col' className='table__th ticket__updated'>
							Updated
						</th>

						<th scope='col' className='table__th ticket__edit'>
							Edit
						</th>
					</tr>
				</thead>
				<tbody>{tableContent}</tbody>
			</table>
		);
	}
};
export default TicketsList;
