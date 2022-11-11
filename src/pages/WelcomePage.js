import { Link } from 'react-router-dom';

// Hooks
import useAuth from '../hooks/useAuth';

const WelcomePage = () => {
	const { username, isCustomer, isEmployee, isManager, isAdmin } = useAuth();

	const date = new Date();
	const today = new Intl.DateTimeFormat('en-gb', {
		dateStyle: 'full',
		timeStyle: 'long',
	}).format(date);

	let content;

	if (isCustomer) {
		content = (
			<section className='welcome'>
				<p>{today}</p>

				<h1>Welcome {username}!</h1>

				<p>
					<Link to='/dash/tickets/new'>Raise a new Issue</Link>
				</p>

				<p>
					<Link to='/dash/tickets'>View Raised Tickets</Link>
				</p>
			</section>
		);
	}

	if (isEmployee) {
		content = (
			<section className='welcome'>
				<p>{today}</p>

				<h1>Welcome {username}!</h1>

				<p>
					<Link to='/dash/tickets'>View Tickets</Link>
				</p>

				<p>
					<Link to='/dash/tickets/new'>Raise a new Ticket</Link>
				</p>
			</section>
		);
	}

	if (isManager || isAdmin) {
		content = (
			<section className='welcome'>
				<p>{today}</p>

				<h1>Welcome {username}!</h1>

				<p>
					<Link to='/dash/tickets'>View Tickets</Link>
				</p>

				<p>
					<Link to='/dash/tickets/new'>Create a new Ticket</Link>
				</p>
				<p>
					<Link to='/dash/users'>View User Settings</Link>
				</p>

				<p>
					<Link to='/dash/users/new'>Create a new User</Link>
				</p>
			</section>
		);
	}

	return content;
};
export default WelcomePage;
