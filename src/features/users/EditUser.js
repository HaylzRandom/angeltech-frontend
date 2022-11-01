import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { SyncLoader } from 'react-spinners';

// Selectors
import { selectUserByID } from './redux/usersApiSlice';

// Components
import EditUserForm from './EditUserForm';

const EditUser = () => {
	const { id } = useParams();

	const user = useSelector((state) => selectUserByID(state, id));

	return user ? <EditUserForm user={user} /> : <SyncLoader />;
};
export default EditUser;
