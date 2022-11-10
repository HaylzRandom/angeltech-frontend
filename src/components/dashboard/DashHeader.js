import { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

// Hooks
import { useSendLogoutMutation } from '../../features/auth/redux/authApiSlice';

const DASH_REGEX = /^\/dash(\/)?$/;
const TICKETS_REGEX = /^\/dash\/tickets(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;

const DashHeader = () => {
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const [sendLogout, { isLoading, isSuccess, isError, error }] =
		useSendLogoutMutation();

	// Check if logout was successful
	useEffect(() => {
		if (isSuccess) navigate('/');
	}, [isSuccess, navigate]);

	if (isLoading) return <p>Logging Out...</p>;

	if (isError) return <p>Error: {error.data?.message}</p>;

	let dashClass = null;

	if (
		!DASH_REGEX.test(pathname) &&
		!TICKETS_REGEX.test(pathname) &&
		!USERS_REGEX.test(pathname)
	) {
		dashClass = 'dash-header__container--small';
	}

	// Buttons
	const logOutButton = (
		<button className='icon-button' title='Logout' onClick={sendLogout}>
			<FontAwesomeIcon icon={faRightFromBracket} />
		</button>
	);

	return (
		<header className='dash-header'>
			<div className={`dash-header__container ${dashClass}`}>
				<Link to='/dash'>
					<h1 className='dash-header__title'>Angel Tech</h1>
				</Link>
				<nav className='dash-header__nav'>
					{/* add nav buttons later */}
					{logOutButton}
				</nav>
			</div>
		</header>
	);
};
export default DashHeader;
