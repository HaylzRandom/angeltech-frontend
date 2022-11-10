import { useRef, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SyncLoader } from 'react-spinners';

// Actions
import { setCredentials } from './redux/authSlice';

// Hooks
import { useLoginMutation } from './redux/authApiSlice';

const LoginPage = () => {
	const userRef = useRef();
	const errorRef = useRef();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [errorMsg, setErrorMsg] = useState('');

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [login, { isLoading }] = useLoginMutation();

	useEffect(() => {
		userRef.current.focus();
	}, []);

	useEffect(() => {
		setErrorMsg('');
	}, [username, password]);

	// Handlers
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const { accessToken } = await login({ username, password }).unwrap();

			dispatch(setCredentials({ accessToken }));

			setUsername('');
			setPassword('');

			navigate('/dash');
		} catch (error) {
			if (!error.status) {
				setErrorMsg('No Server Response');
			} else if (error.status === 400) {
				setErrorMsg('Missing Username or Password');
			} else if (error.status === 401) {
				setErrorMsg('Unauthorised');
			} else {
				setErrorMsg(error.data?.message);
			}

			errorRef.current.focus();
		}
	};

	const handleUserInput = (e) => setUsername(e.target.value);
	const handlePwdInput = (e) => setPassword(e.target.value);

	const errorClass = errorMsg ? 'errorMsg' : 'offscreen';

	if (isLoading) return <SyncLoader />;

	return (
		<section className='public'>
			<header>
				<h1>Portal Login</h1>
			</header>
			<main className='login'>
				<p ref={errorRef} className={errorClass} aria-live='assertive'>
					{errorMsg}
				</p>

				<form className='form' onSubmit={handleSubmit}>
					{/* Username */}
					<label htmlFor='username'>Username:</label>
					<input
						type='text'
						className='form__input'
						id='username'
						ref={userRef}
						value={username}
						onChange={handleUserInput}
						autoComplete='off'
						required
					/>

					{/* Password */}
					<label htmlFor='password'>Password:</label>
					<input
						type='password'
						className='form__input'
						id='password'
						onChange={handlePwdInput}
						value={password}
						required
					/>

					{/* Sign In Button */}
					<button className='form__submit-button'>Sign In</button>
				</form>
			</main>
			<footer>
				<Link to='/'>Back to Home</Link>
			</footer>
		</section>
	);
};
export default LoginPage;
