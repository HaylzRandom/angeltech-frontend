import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Roles
import { ROLES } from '../../config/roles';

// Hooks
import { useAddNewUserMutation } from './redux/usersApiSlice';
import useTitle from '../../hooks/useTitle';

// Regex
const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const NewUserForm = () => {
	useTitle('Angel Tech: New User');

	const [addNewUser, { isLoading, isSuccess, isError, error }] =
		useAddNewUserMutation();

	const navigate = useNavigate();

	const [username, setUsername] = useState('');
	const [validUsername, setValidUsername] = useState(false);
	const [password, setPassword] = useState('');
	const [validPassword, setValidPassword] = useState(false);
	const [email, setEmail] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [roles, setRoles] = useState(['Customer']);

	// Validate Username
	useEffect(() => {
		setValidUsername(USER_REGEX.test(username));
	}, [username]);

	// Validate Password
	useEffect(() => {
		setValidPassword(PWD_REGEX.test(password));
	}, [password]);

	useEffect(() => {
		/* console.log(isSuccess); */

		if (isSuccess) {
			setUsername('');
			setPassword('');
			setEmail('');
			setFirstName('');
			setLastName('');
			setRoles('');
			navigate('/dash/users');
		}
	}, [isSuccess, navigate]);

	// Handlers
	const onUsernameChanged = (e) => setUsername(e.target.value);
	const onPasswordChanged = (e) => setPassword(e.target.value);
	const onEmailChanged = (e) => setEmail(e.target.value);
	const onFirstNameChanged = (e) => setFirstName(e.target.value);
	const onLastNameChanged = (e) => setLastName(e.target.value);

	const onRolesChanged = (e) => {
		const values = Array.from(
			e.target.selectedOptions,
			(option) => option.value
		);
		setRoles(values);
	};

	const canSave =
		[
			roles.length,
			validUsername,
			validPassword,
			email,
			firstName,
			lastName,
		].every(Boolean) && !isLoading;

	const onSaveUserClicked = async (e) => {
		e.preventDefault();
		if (canSave) {
			await addNewUser({
				username,
				password,
				email,
				firstName,
				lastName,
				roles,
			});
		}
	};

	const options = Object.values(ROLES).map((role) => {
		return (
			<option value={role} key={role}>
				{role}
			</option>
		);
	});

	// CSS Classes
	const errorClass = isError ? 'errorMsg' : 'offscreen';
	const validUserClass = !validUsername ? 'form__input--incomplete' : '';
	const validPasswordClass =
		password && !validPassword ? 'form__input--incomplete' : '';
	const validEmailClass = !email ? 'form__input--incomplete' : '';
	const validFirstNameClass = !firstName ? 'form__input--incomplete' : '';
	const validLastNameClass = !lastName ? 'form__input--incomplete' : '';
	const validRolesClass = !Boolean(roles.length)
		? 'form__input--incomplete'
		: '';

	return (
		<>
			<p className={errorClass}>{error?.data?.message}</p>

			<form className='form' onSubmit={onSaveUserClicked}>
				<div className='form__title-row'>
					<h2>New User</h2>
					<div className='form__action-buttons'>
						<button className='icon-button' title='Save' disabled={!canSave}>
							<FontAwesomeIcon icon={faSave} />
						</button>
					</div>
				</div>
				{/* Username */}
				<label htmlFor='username' className='form__label'>
					Username: <span className='nowrap'>[3-20 letters]</span>
				</label>
				<input
					className={`form__input ${validUserClass}`}
					type='text'
					id='username'
					name='username'
					autoComplete='off'
					value={username}
					onChange={onUsernameChanged}
				/>
				{/* Password */}
				<label htmlFor='password' className='form__label'>
					Password: <span className='nowrap'>[4-12 chars incl. !@#$%]</span>
				</label>
				<input
					className={`form__input ${validPasswordClass}`}
					type='password'
					id='password'
					name='password'
					value={password}
					onChange={onPasswordChanged}
				/>
				{/* Email */}
				<label htmlFor='email' className='form__label'>
					Email:
				</label>
				<input
					className={`form__input ${validEmailClass}`}
					type='email'
					id='email'
					name='email'
					value={email}
					onChange={onEmailChanged}
				/>
				{/* First Name */}
				<label htmlFor='firstName' className='form__label'>
					First Name:
				</label>
				<input
					className={`form__input ${validFirstNameClass}`}
					type='text'
					id='firstName'
					name='firstName'
					value={firstName}
					onChange={onFirstNameChanged}
				/>
				{/* Last Name */}
				<label htmlFor='lastName' className='form__label'>
					Last Name:
				</label>
				<input
					className={`form__input ${validLastNameClass}`}
					type='text'
					id='lastName'
					name='lastName'
					value={lastName}
					onChange={onLastNameChanged}
				/>
				{/* Roles */}
				<label htmlFor='roles' className='form__label'>
					ASSIGNED ROLES:
				</label>
				<select
					name='roles'
					id='roles'
					multiple={true}
					size='4'
					value={roles}
					onChange={onRolesChanged}
					className={`form__select ${validRolesClass}`}
				>
					{options}
				</select>
			</form>
		</>
	);
};
export default NewUserForm;
