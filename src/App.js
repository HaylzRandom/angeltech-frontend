import { Routes, Route } from 'react-router-dom';

// Components
import Layout from './components/Layout';

// Features
import LoginPage from './features/auth/LoginPage';
import UsersList from './features/users/UsersList';
import TicketsList from './features/tickets/TicketsList';
import EditTicket from './features/tickets/EditTicket';
import NewTicketForm from './features/tickets/NewTicketForm';
import EditUser from './features/users/EditUser';
import NewUserForm from './features/users/NewUserForm';

// Pages
import PublicPage from './pages/PublicPage';
import DashboardPage from './pages/DashboardPage';
import WelcomePage from './pages/WelcomePage';

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route index element={<PublicPage />} />
				<Route path='login' element={<LoginPage />} />
				{/* Protected Routes */}
				<Route path='dash' element={<DashboardPage />}>
					<Route index element={<WelcomePage />} />

					{/* Tickets Route */}
					<Route path='tickets'>
						<Route index element={<TicketsList />} />
						<Route path=':id' element={<EditTicket />} />
						<Route path='new' element={<NewTicketForm />} />
					</Route>

					{/* Users Route */}
					<Route path='users'>
						<Route index element={<UsersList />} />
						<Route path=':id' element={<EditUser />} />
						<Route path='new' element={<NewUserForm />} />
					</Route>
				</Route>
				{/* End of Protected Routes */}
			</Route>
		</Routes>
	);
};
export default App;
