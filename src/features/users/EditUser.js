import { useParams } from 'react-router-dom';
import { SyncLoader } from 'react-spinners';

// Hooks
import { useGetUsersQuery } from './redux/usersApiSlice';

// Components
import EditUserForm from './EditUserForm';

const EditUser = () => {
	const { id } = useParams();

	const { user } = useGetUsersQuery('usersList', {
		selectFromResult: ({ data }) => ({
			user: data?.entities[id],
		}),
	});

	return user ? <EditUserForm user={user} /> : <SyncLoader />;
};
export default EditUser;
