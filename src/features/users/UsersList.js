import CustomerList from './CustomerList';
import EmployeeList from './EmployeeList';

const UsersList = () => {
	return (
		<section className='table-container'>
			<EmployeeList />
			<CustomerList />
		</section>
	);
};
export default UsersList;
