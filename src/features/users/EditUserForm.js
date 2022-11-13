import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Roles
import { ROLES } from '../../config/roles';

// Hooks
import {
	useDeleteUserMutation,
	useUpdateUserMutation,
} from './redux/usersApiSlice';

// Regex
const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const EditUserForm = ({ user }) => {
	const [updateUser, { isLoading, isSuccess, isError, error }] =
		useUpdateUserMutation();

	const [
		deleteUser,
		{ isSuccess: isDeleteSuccess, isError: isDeleteError, error: deleteError },
	] = useDeleteUserMutation();

	const navigate = useNavigate();

	const [username, setUsername] = useState(user.username);
	const [validUsername, setValidUsername] = useState(false);
	const [password, setPassword] = useState('');
	const [validPassword, setValidPassword] = useState(false);
	const [email, setEmail] = useState(user.email);
	const [firstName, setFirstName] = useState(user.firstName);
	const [lastName, setLastName] = useState(user.lastName);
	const [roles, setRoles] = useState(user.roles);
	const [active, setActive] = useState(user.active);

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

		if (isSuccess || isDeleteSuccess) {
			setUsername('');
			setPassword('');
			setEmail('');
			setFirstName('');
			setLastName('');
			setRoles('');
			navigate('/dash/users');
		}
	}, [isSuccess, isDeleteSuccess, navigate]);

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

	const onActiveChanged = () => setActive((prev) => !prev);

	const onSaveUserClicked = async (e) => {
		if (password) {
			await updateUser({
				id: user.id,
				username,
				password,
				email,
				firstName,
				lastName,
				roles,
				active,
			});
		} else {
			await updateUser({
				id: user.id,
				username,
				email,
				firstName,
				lastName,
				roles,
				active,
			});
		}
	};

	const onDeleteUserClicked = async () => {
		await deleteUser({ id: user.id });
	};

	const options = Object.values(ROLES).map((role) => {
		return (
			<option value={role} key={role}>
				{role}
			</option>
		);
	});

	let canSave = false;
	if (password) {
		canSave =
			[
				roles.length,
				validUsername,
				validPassword,
				email,
				firstName,
				lastName,
			].every(Boolean) && !isLoading;
	} else {
		canSave =
			[roles.length, validUsername, email, firstName, lastName].every(
				Boolean
			) && !isLoading;
	}

	// CSS Classes
	const errorClass = isError || isDeleteError ? 'errorMsg' : 'offscreen';
	const validUserClass = !validUsername ? 'form__input--incomplete' : '';
	const validPasswordClass =
		password && !validPassword ? 'form__input--incomplete' : '';
	const validEmailClass = !email ? 'form__input--incomplete' : '';
	const validFirstNameClass = !firstName ? 'form__input--incomplete' : '';
	const validLastNameClass = !lastName ? 'form__input--incomplete' : '';
	const validRolesClass = !Boolean(roles.length)
		? 'form__input--incomplete'
		: '';

	// Error Content
	const errorContent =
		(error?.data?.message || deleteError?.data?.message) ?? '';

	return (
		<>
			<p className={errorClass}>{errorContent}</p>

			<form className='form' onSubmit={(e) => e.preventDefault()}>
				<div className='form__title-row'>
					<h2>Edit User</h2>
					<div className='form__action-buttons'>
						<button
							className='icon-button'
							title='Save'
							onClick={onSaveUserClicked}
							disabled={!canSave}
						>
							<FontAwesomeIcon icon={faSave} />
						</button>
						<button
							className='icon-button'
							title='Delete'
							onClick={onDeleteUserClicked}
						>
							<FontAwesomeIcon icon={faTrashCan} />
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
					Password: <span className='nowrap'>[empty = no change]</span>
					<span className='nowrap'>[4-12 chars incl. !@#$%]</span>
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
				{/* Active Status */}
				<label
					htmlFor='user-active'
					className='form__label form__checkbox-container'
				>
					ACTIVE:
					<input
						type='checkbox'
						className='form__checkbox'
						id='user-active'
						name='user-active'
						checked={active}
						onChange={onActiveChanged}
					/>
				</label>
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
export default EditUserForm;
