import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

// Hooks
import useAuth from '../../hooks/useAuth';

const DashFooter = () => {
	const { username, status, isCustomer, lastLogin } = useAuth();

	const date = new Date(lastLogin);
	const loginDate = new Intl.DateTimeFormat('en-gb', {
		dateStyle: 'medium',
		timeStyle: 'medium',
	}).format(date);

	const navigate = useNavigate();

	const { pathname } = useLocation();

	const onGoHomeClicked = () => navigate('/dash');

	let goHomeButton = null;

	if (pathname !== '/dash') {
		goHomeButton = (
			<button
				className='dash-footer__button icon-button'
				title='Home'
				onClick={onGoHomeClicked}>
				<FontAwesomeIcon icon={faHouse} />
			</button>
		);
	}

	let content;

	if (isCustomer) {
		content = (
			<footer className='dash-footer'>
				<div className='dash-footer__stats'>
					{goHomeButton}
					<p>Current User: {username}</p>
				</div>
				<div className='dash-footer__login'>
					<p>Last Login: {loginDate}</p>
				</div>
			</footer>
		);
	} else {
		content = (
			<footer className='dash-footer'>
				<div className='dash-footer__stats'>
					{goHomeButton}
					<p>Current User: {username}</p>
					<p>Status: {status}</p>
				</div>
				<div className='dash-footer__login'>
					<p>Last Login: {loginDate}</p>
				</div>
			</footer>
		);
	}

	return content;
};
export default DashFooter;
