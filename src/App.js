import { Routes, Route } from 'react-router-dom';

// Components
import Layout from './components/Layout';

// Features
import LoginPage from './features/auth/LoginPage';
import UsersList from './features/users/UsersList';
import TicketsList from './features/tickets/TicketsList';
import EditTicket from './features/tickets/EditTicket';
import NewTicket from './features/tickets/NewTicket';
import EditUser from './features/users/EditUser';
import NewUserForm from './features/users/NewUserForm';
import PreFetch from './features/auth/PreFetch';
import PersistLogin from './features/auth/PersistLogin';

// Pages
import PublicPage from './pages/PublicPage';
import DashboardPage from './pages/DashboardPage';
import WelcomePage from './pages/WelcomePage';
import RequireAuth from './features/auth/RequireAuth';

// Config
import { ROLES } from './config/roles';

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				{/* Public Routes */}
				<Route index element={<PublicPage />} />
				<Route path='login' element={<LoginPage />} />
				{/* End of Public Routes */}

				{/* Protected Routes */}
				<Route element={<PersistLogin />}>
					<Route
						element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
					>
						<Route element={<PreFetch />}>
							{/* Dashboard */}
							<Route path='dash' element={<DashboardPage />}>
								{/* Welcome Page */}
								<Route index element={<WelcomePage />} />

								{/* Tickets Route */}
								<Route path='tickets'>
									<Route index element={<TicketsList />} />
									<Route path=':id' element={<EditTicket />} />
									<Route path='new' element={<NewTicket />} />
								</Route>

								{/* Users Route */}
								<Route
									element={
										<RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />
									}
								>
									<Route path='users'>
										<Route index element={<UsersList />} />
										<Route path=':id' element={<EditUser />} />
										<Route path='new' element={<NewUserForm />} />
									</Route>
								</Route>
							</Route>
						</Route>
					</Route>
				</Route>
				{/* End of Protected Routes */}
			</Route>
		</Routes>
	);
};
export default App;
