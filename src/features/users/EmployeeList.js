// Hooks
import Spinner from '../../components/Spinner';
import { useGetUsersQuery } from './redux/usersApiSlice';

// Components
import User from './User';

const EmployeeList = () => {
	const {
		data: users,
		isLoading,
		isSuccess,
		isError,
		error,
	} = useGetUsersQuery('usersList', {
		pollingInterval: 60000,
		refetchOnFocus: true,
		refetchOnMountOrArgChange: true,
	});

	if (isLoading) return <Spinner />;

	if (isError) return <p className='errorMsg'>{error?.data.message}</p>;

	if (isSuccess) {
		const { ids, entities } = users;

		let filteredIds;

		filteredIds = ids.filter((employeeID) => {
			return !entities[employeeID].roles.includes('Customer');
		});

		const tableContent =
			filteredIds?.length &&
			filteredIds.map((userID) => <User key={userID} userID={userID} />);

		return (
			<>
				<h2>Employees</h2>
				<table className='table table--employees'>
					<thead className='table__thead'>
						<tr>
							<th className='table__th user__username' scope='col'>
								Username
							</th>
							<th className='table__th user__roles' scope='col'>
								Roles
							</th>
							<th className='table__th user__edit' scope='col'>
								Edit
							</th>
						</tr>
					</thead>
					<tbody>{tableContent}</tbody>
				</table>
			</>
		);
	}
};
export default EmployeeList;
