import { useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';

// Selectors
import { selectCurrentToken } from '../features/auth/redux/authSlice';

const useAuth = () => {
	const token = useSelector(selectCurrentToken);

	let isCustomer = false;
	let isEmployee = false;
	let isManager = false;
	let isAdmin = false;
	let status = 'Customer';

	if (token) {
		const decoded = jwtDecode(token);
		const { username, roles } = decoded.UserInfo;

		isCustomer = roles.includes('Customer');
		isEmployee = roles.includes('Employee');
		isManager = roles.includes('Manager');
		isAdmin = roles.includes('Admin');

		if (isCustomer) status = 'Customer';
		if (isEmployee) status = 'Employee';
		if (isManager) status = 'Manager';
		if (isAdmin) status = 'Admin';

		return {
			username,
			roles,
			status,
			isCustomer,
			isEmployee,
			isManager,
			isAdmin,
		};
	}
	return {
		username: '',
		roles: [],
		isCustomer,
		isEmployee,
		isManager,
		isAdmin,
		status,
	};
};
export default useAuth;
