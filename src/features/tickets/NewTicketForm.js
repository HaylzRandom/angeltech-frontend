import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';

// Config
import { CATEGORIES } from '../../config/category';

// Hooks
import { useAddNewTicketMutation } from './redux/ticketsApiSlice';
import useAuth from '../../hooks/useAuth';

const NewTicketForm = ({ users }) => {
	const { username } = useAuth();

	let defaultCustomer = users.filter(
		(customer) => customer.username === username
	);
	/* console.log(defaultCustomer[0].username); */

	const [addNewTicket, { isLoading, isSuccess, isError, error }] =
		useAddNewTicketMutation();

	const navigate = useNavigate();

	const [title, setTitle] = useState('');
	const [text, setText] = useState('');
	const [customerID, setCustomerID] = useState(defaultCustomer[0].id); // TODO: Research if cleaner method to do this
	const [customerName, setCustomerName] = useState(defaultCustomer[0].username);
	const [category, setCategory] = useState('Laptop');

	useEffect(() => {
		if (isSuccess) {
			setTitle('');
			setText('');
			setCustomerID('');
			navigate('/dash/tickets');
		}
	}, [isSuccess, navigate]);

	// Handlers
	const onTitleChanged = (e) => setTitle(e.target.value);
	const onTextChanged = (e) => setText(e.target.value);
	const onCategoryChanged = (e) => setCategory(e.target.value);

	const canSave = [title, text].every(Boolean) && !isLoading;

	const onSaveTicketClicked = async (e) => {
		e.preventDefault();
		if (canSave) {
			await addNewTicket({
				customer: customerID,
				title,
				text,
				category,
				assigned: null,
			});
		}
	};

	const categoryOptions = Object.values(CATEGORIES).map((category) => {
		return (
			<option value={category} key={category}>
				{category}
			</option>
		);
	});

	// TODO: Implement ability to choose from all customers but default to logged in user
	/* const customerInput = users.map((customer) => {
		if (customer.username === username) {
			<input
				className={`form__input`}
				id='customer'
				name='customer'
				type='text'
				value={customer.id}
				placeholder={customer.username}
				readOnly
			/>;
		} else {
		}
	}); */

	// CSS Classes
	const errorClass = isError ? 'errorMsg' : 'offscreen';
	const validTitleClass = !title ? 'form__input--incomplete' : '';
	const validTextClass = !text ? 'form__input--incomplete' : '';

	return (
		<>
			<p className={errorClass}>{error?.data?.message}</p>

			<form className='form' onSubmit={onSaveTicketClicked}>
				<div className='form__title-row'>
					<h2>New Ticket</h2>
					<div className='form__action-buttons'>
						<button className='icon-button' title='Save' disabled={!canSave}>
							<FontAwesomeIcon icon={faSave} />
						</button>
					</div>
				</div>
				{/* Title */}
				<label className='form__label' htmlFor='title'>
					Title:
				</label>
				<input
					className={`form__input ${validTitleClass}`}
					id='title'
					name='title'
					type='text'
					autoComplete='off'
					value={title}
					onChange={onTitleChanged}
				/>
				{/* Category */}
				<label
					className='form__label form__checkbox-container'
					htmlFor='category'
				>
					CATEGORY:
				</label>
				<select
					id='category'
					name='category'
					className='form__select'
					value={category}
					onChange={onCategoryChanged}
				>
					{categoryOptions}
				</select>
				{/* Text */}
				<label className='form__label' htmlFor='text'>
					Text:
				</label>
				<textarea
					className={`form__input form__input--text ${validTextClass}`}
					id='text'
					name='text'
					value={text}
					onChange={onTextChanged}
				/>
				{/* Customer */}
				<label className='form__label' htmlFor='customer'>
					Customer:
				</label>
				<select
					name='customer'
					id='customer'
					className='form__select'
					value={customerID}
					readOnly
				>
					<option value={customerID}>{customerName}</option>
				</select>
			</form>
		</>
	);
};
export default NewTicketForm;
