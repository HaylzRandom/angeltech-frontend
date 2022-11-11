import { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faRightFromBracket,
	faFileCirclePlus,
	faFilePen,
	faUserGear,
	faUserPlus,
} from '@fortawesome/free-solid-svg-icons';

// Hooks
import { useSendLogoutMutation } from '../../features/auth/redux/authApiSlice';
import useAuth from '../../hooks/useAuth';

const DASH_REGEX = /^\/dash(\/)?$/;
const TICKETS_REGEX = /^\/dash\/tickets(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;

const DashHeader = () => {
	const { isManager, isAdmin } = useAuth();

	const navigate = useNavigate();
	const { pathname } = useLocation();

	const [sendLogout, { isLoading, isSuccess, isError, error }] =
		useSendLogoutMutation();

	// Check if logout was successful
	useEffect(() => {
		if (isSuccess) navigate('/');
	}, [isSuccess, navigate]);

	// Handlers
	const onNewTicketClicked = () => navigate('/dash/tickets/new');
	const onNewUserClicked = () => navigate('/dash/users/new');
	const onTicketsClicked = () => navigate('/dash/tickets');
	const onUsersClicked = () => navigate('/dash/users');

	let dashClass = null;

	if (
		!DASH_REGEX.test(pathname) &&
		!TICKETS_REGEX.test(pathname) &&
		!USERS_REGEX.test(pathname)
	) {
		dashClass = 'dash-header__container--small';
	}

	// Buttons

	// New Ticket Button
	let newTicketButton = null;
	if (TICKETS_REGEX.test(pathname)) {
		newTicketButton = (
			<button
				className='icon-button'
				title='New Ticket'
				onClick={onNewTicketClicked}
			>
				<FontAwesomeIcon icon={faFileCirclePlus} />
			</button>
		);
	}

	// New User Button
	let newUserButton = null;
	if (USERS_REGEX.test(pathname)) {
		newUserButton = (
			<button
				className='icon-button'
				title='New User'
				onClick={onNewUserClicked}
			>
				<FontAwesomeIcon icon={faUserPlus} />
			</button>
		);
	}

	// Users Button
	let userButton = null;
	if (isManager || isAdmin) {
		if (!USERS_REGEX.test(pathname) && pathname.includes('/dash')) {
			userButton = (
				<button className='icon-button' title='Users' onClick={onUsersClicked}>
					<FontAwesomeIcon icon={faUserGear} />
				</button>
			);
		}
	}

	// Tickets Button
	let ticketsButton = null;
	if (!TICKETS_REGEX.test(pathname) && pathname.includes('/dash')) {
		ticketsButton = (
			<button
				className='icon-button'
				title='Tickets'
				onClick={onTicketsClicked}
			>
				<FontAwesomeIcon icon={faFilePen} />
			</button>
		);
	}

	// Logout Button
	const logOutButton = (
		<button className='icon-button' title='Logout' onClick={sendLogout}>
			<FontAwesomeIcon icon={faRightFromBracket} />
		</button>
	);

	const errorClass = isError ? 'errorMsg' : 'offscreen';

	let btnContent;

	if (isLoading) {
		btnContent = <p>Logging Out...</p>;
	} else {
		btnContent = (
			<>
				{newTicketButton}
				{newUserButton}
				{ticketsButton}
				{userButton}
				{logOutButton}
			</>
		);
	}

	return (
		<>
			<p className={errorClass}>{error?.data?.message}</p>

			<header className='dash-header'>
				<div className={`dash-header__container ${dashClass}`}>
					<Link to='/dash'>
						<h1 className='dash-header__title'>Angel Tech</h1>
					</Link>
					<nav className='dash-header__nav'>{btnContent}</nav>
				</div>
			</header>
		</>
	);
};
export default DashHeader;
