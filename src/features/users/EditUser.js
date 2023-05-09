import { useParams } from 'react-router-dom';

// Hooks
import { useGetUsersQuery } from './redux/usersApiSlice';
import useTitle from '../../hooks/useTitle';

// Components
import EditUserForm from './EditUserForm';
import Spinner from '../../components/Spinner';

const EditUser = () => {
	useTitle('Angel Tech: Edit User');

	const { id } = useParams();

	const { user } = useGetUsersQuery('usersList', {
		selectFromResult: ({ data }) => ({
			user: data?.entities[id],
		}),
	});

	return user ? <EditUserForm user={user} /> : <Spinner />;
};
export default EditUser;
