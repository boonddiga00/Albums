import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { createUserAuth } from 'fbase/functions/authFunctions';
import { setUserById } from 'fbase/functions/userFunctions';
import JoinPresenter from 'Routers/Join/JoinPresenter';

const makeUserObj = ({ uid, email, username }) => {
	console.log(email, username);
	return { uid, username, email, photoURL: null, albums: [] };
};

const addUserOnDb = async ({ uid, email, username }) => {
	await setUserById(uid, makeUserObj({ uid, email, username }));
};

const Join = () => {
	const {
		register,
		handleSubmit,
		formState: { erorrs },
		setError,
	} = useForm();
	const history = useHistory();
	const onSubmit = async (data) => {
		const { email, username, password, password1 } = data;
		if (password !== password1) {
			setError('password1', { message: 'Passwords do not match.' }, { shouldFocus: true });
			return;
		}
		try {
			const { uid } = await createUserAuth(email, password);
			await addUserOnDb({ uid, email, username });
			history.push(`/user/${uid}`);
		} catch (error) {
			console.log(error);
		}
	};
	return <JoinPresenter onSubmit={handleSubmit(onSubmit)} register={register} erorrs={erorrs} />;
};
export default Join;