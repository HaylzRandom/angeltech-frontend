import { SyncLoader } from 'react-spinners';

// Components
import Ticket from './Ticket';

// Hooks
import { useGetTicketsQuery } from './redux/ticketsApiSlice';

const TicketsList = () => {
	const {
		data: tickets,
		isLoading,
		isSuccess,
		isError,
		error,
	} = useGetTicketsQuery(undefined, {
		pollingInterval: 15000,
		refetchOnFocus: true,
		refetchOnMountOrArgChange: true,
	});

	if (isLoading) return <SyncLoader color='#6e36d6' />;

	if (isError) return <p className='errorMsg'>{error?.data.message}</p>;

	if (isSuccess) {
		const { ids } = tickets;

		const tableContent = ids?.length
			? ids.map((ticketID) => <Ticket key={ticketID} ticketID={ticketID} />)
			: null;

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
