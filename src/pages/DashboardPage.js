import { Outlet } from 'react-router-dom';
import DashFooter from '../components/dashboard/DashFooter';

// Components
import DashHeader from '../components/dashboard/DashHeader';

const DashboardPage = () => {
	return (
		<>
			<DashHeader />
			<div className='dash-container'>
				<Outlet />
			</div>
			<DashFooter />
		</>
	);
};
export default DashboardPage;
