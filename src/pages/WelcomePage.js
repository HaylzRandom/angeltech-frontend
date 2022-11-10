import { Link } from 'react-router-dom';

const WelcomePage = () => {
	const date = new Date();
	const today = new Intl.DateTimeFormat('en-gb', {
		dateStyle: 'full',
		timeStyle: 'long',
	}).format(date);

	return (
		<section className='welcome'>
			<p>{today}</p>

			<h1>Welcome!</h1>

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
};
export default WelcomePage;
