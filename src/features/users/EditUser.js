import { useParams } from 'react-router-dom';
import { SyncLoader } from 'react-spinners';

// Hooks
import { useGetUsersQuery } from './redux/usersApiSlice';
import useTitle from '../../hooks/useTitle';

// Components
import EditUserForm from './EditUserForm';

const EditUser = () => {
	useTitle('Angel Tech: Edit User');

	const { id } = useParams();

	const { user } = useGetUsersQuery('usersList', {
		selectFromResult: ({ data }) => ({
			user: data?.entities[id],
		}),
	});

	return user ? <EditUserForm user={user} /> : <SyncLoader />;
};
export default EditUser;
