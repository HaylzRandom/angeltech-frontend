import { SyncLoader } from 'react-spinners';

// Hooks
import { useGetUsersQuery } from './redux/usersApiSlice';

import User from './User';

const EmployeeList = () => {
	const {
		data: users,
		isLoading,
		isSuccess,
		isError,
		error,
	} = useGetUsersQuery(undefined, {
		pollingInterval: 60000,
		refetchOnFocus: true,
		refetchOnMountOrArgChange: true,
	});

	if (isLoading) return <SyncLoader color='#6e36d6' />;

	if (isError) return <p className='errorMsg'>{error?.data.message}</p>;

	if (isSuccess) {
		const { ids } = users;

		const tableContent = ids?.length
			? ids.map((userID) => <User key={userID} userID={userID} />)
			: null;

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
