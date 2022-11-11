import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { memo } from 'react';

// Hooks
import { useGetUsersQuery } from './redux/usersApiSlice';

const User = ({ userID }) => {
	// Fetch specific user
	const { user } = useGetUsersQuery('usersList', {
		selectFromResult: ({ data }) => ({
			user: data?.entities[userID],
		}),
	});

	const navigate = useNavigate();

	if (user) {
		const handleEdit = () => navigate(`/dash/users/${userID}`);

		const userRolesString = user.roles.toString().replaceAll(',', ', ');

		/* console.log(userRolesString); */

		const cellStatus = user.active ? '' : 'table__cell--inactive';

		return (
			<tr className='table__row user'>
				<td className={`table__cell ${cellStatus}`}>{user.username}</td>
				<td className={`table__cell ${cellStatus}`}>{userRolesString}</td>
				<td className={`table__cell ${cellStatus}`}>
					<button className='icon-button table__button' onClick={handleEdit}>
						<FontAwesomeIcon icon={faPenToSquare} />
					</button>
				</td>
			</tr>
		);
	} else return null;
};

// Will only cause re-render if changes in data;
const memoizedUser = memo(User);

export default memoizedUser;
