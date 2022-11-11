import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrashCan } from '@fortawesome/free-solid-svg-icons';

// Hooks
import {
	useDeleteTicketMutation,
	useUpdateTicketMutation,
} from './redux/ticketsApiSlice';
import useAuth from '../../hooks/useAuth';

// Config
import { CATEGORIES } from '../../config/category';

const EditTicketForm = ({ ticket, users }) => {
	const { isEmployee, isAdmin, isManager, isCustomer } = useAuth();

	const [updateTicket, { isLoading, isSuccess, isError, error }] =
		useUpdateTicketMutation();

	const [
		deleteTicket,
		{ isSuccess: isDeleteSuccess, isError: isDeleteError, error: deleteError },
	] = useDeleteTicketMutation();

	const navigate = useNavigate();

	const [title, setTitle] = useState(ticket.title);
	const [text, setText] = useState(ticket.text);
	const [completed, setCompleted] = useState(ticket.completed);
	const [customer, setCustomer] = useState(ticket.customer);
	const [assigned, setAssigned] = useState(ticket.assigned);
	const [category, setCategory] = useState(ticket.category);

	useEffect(() => {
		if (isSuccess || isDeleteSuccess) {
			setTitle('');
			setText('');
			setCustomer('');
			navigate('/dash/tickets');
		}
	}, [isSuccess, isDeleteSuccess, navigate]);

	// Handlers
	const onTitleChanged = (e) => setTitle(e.target.value);
	const onTextChanged = (e) => setText(e.target.value);
	const onCompletedChanged = (e) => setCompleted((prev) => !prev);
	const onCustomerChanged = (e) => setCustomer(e.target.value);
	const onAssignedChanged = (e) => setAssigned(e.target.value);
	const onCategoryChanged = (e) => setCategory(e.target.value);

	const canSave = [title, text, category].every(Boolean) && !isLoading;

	const onSaveTicketClicked = async (e) => {
		if (canSave) {
			console.table([ticket.id, customer, title, text, completed, assigned]);
			await updateTicket({
				id: ticket.id,
				category,
				customer,
				title,
				text,
				completed,
				assigned,
			});
		}
	};

	const onDeleteTicketClicked = async () => {
		await deleteTicket({ id: ticket.id });
	};

	const created = new Date(ticket.createdAt).toLocaleString('en-gb', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric',
	});

	const updated = new Date(ticket.updatedAt).toLocaleString('en-gb', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric',
	});

	const customerOptions = users.map((customer) => {
		if (customer.roles.includes('Customer')) {
			return (
				<option key={customer.id} value={customer.id}>
					{customer.username}
				</option>
			);
		}
	});

	const employeeOptions = users.map((employee) => {
		if (!employee.roles.includes('Customer')) {
			return (
				<option key={employee.id} value={employee.id}>
					{employee.username}
				</option>
			);
		} else {
			return null;
		}
	});

	const categoryOptions = Object.values(CATEGORIES).map((category) => {
		return (
			<option value={category} key={category}>
				{category}
			</option>
		);
	});

	// CSS Classes
	const errorClass = isError || isDeleteError ? 'errorMsg' : 'offscreen';
	const validTitleClass = !title ? 'form__input--incomplete' : '';
	const validTextClass = !text ? 'form__input--incomplete' : '';
	const validCustomerClass = !customer ? 'form__input--incomplete' : '';

	// Error Content
	const errorContent =
		(error?.data?.message || deleteError?.data?.message) ?? '';

	return (
		<>
			<p className={errorClass}>{errorContent}</p>

			<form className='form' onSubmit={(e) => e.preventDefault()}>
				<div className='form__title-row'>
					<h2>Edit Ticket #{ticket.ticket}</h2>
					<div className='form__action-buttons'>
						<button
							className='icon-button'
							title='Save'
							onClick={onSaveTicketClicked}
							disabled={!canSave}
						>
							<FontAwesomeIcon icon={faSave} />
						</button>
						{(isManager || isAdmin) && (
							<button
								className='icon-button'
								title='Delete'
								onClick={onDeleteTicketClicked}
							>
								<FontAwesomeIcon icon={faTrashCan} />
							</button>
						)}
					</div>
				</div>
				{/* Title */}
				<label htmlFor='ticket-title' className='form__label'>
					Title:
				</label>
				<input
					type='text'
					id='ticket-title'
					name='title'
					autoComplete='off'
					value={title}
					onChange={onTitleChanged}
					className={`form__input ${validTitleClass}`}
				/>
				{/* Category */}
				<label className='form__label' htmlFor='ticket-category'>
					CATEGORY:
				</label>
				<select
					id='ticket-category'
					name='username'
					className='form__select'
					value={category}
					onChange={onCategoryChanged}
				>
					{categoryOptions}
				</select>
				{/* Text */}
				<label htmlFor='ticket-text' className='form__label'>
					Text:
				</label>
				<input
					type='text'
					id='ticket-text'
					name='text'
					autoComplete='off'
					value={text}
					onChange={onTextChanged}
					className={`form__input ${validTextClass}`}
				/>

				<div className='form__row'>
					{!isCustomer && (
						<>
							<div className='form__divider'>
								{/* Completed Status */}
								<label
									htmlFor='ticket-completed'
									className='form__label form__checkbox-container'
								>
									WORK COMPLETE:
									<input
										type='checkbox'
										id='ticket-completed'
										name='completed'
										checked={completed}
										onChange={onCompletedChanged}
										className='form__checkbox'
									/>
								</label>

								{/* Assigned */}
								<label
									htmlFor='ticket-assigned'
									className='form__label form__check--container'
								>
									ASSIGNED TO:
								</label>
								<select
									name='assigned'
									id='ticket-assigned'
									className='form__select'
									value={assigned}
									onChange={onAssignedChanged}
								>
									<option value=''></option>
									{employeeOptions}
								</select>
								{/* Customer */}
								<label
									htmlFor='ticket-assigned'
									className='form__label form__check--container'
								>
									CUSTOMER:
								</label>
								<select
									name='customer'
									id='ticket-customer'
									className='form__select'
									value={customer}
									onChange={onCustomerChanged}
								>
									{customerOptions}
								</select>
							</div>
							<div className='form__divider'>
								<p className='form__created'>
									Created:
									<br />
									{created}
								</p>
								<p className='form__updated'>
									Updated:
									<br />
									{updated}
								</p>
							</div>
						</>
					)}
				</div>
			</form>
		</>
	);
};
export default EditTicketForm;
