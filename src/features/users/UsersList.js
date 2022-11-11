// Hooks
import useTitle from '../../hooks/useTitle';

// Components
import CustomerList from './CustomerList';
import EmployeeList from './EmployeeList';

const UsersList = () => {
	useTitle('Angel Tech: Users List');

	return (
		<section className='table-container'>
			<EmployeeList />
			<CustomerList />
		</section>
	);
};
export default UsersList;
