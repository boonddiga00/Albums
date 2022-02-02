import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { createUserAuth } from 'fbase/functions/authFunctions';
import { setUserById } from 'fbase/functions/userFunctions';
import JoinPresenter from 'Routers/Join/JoinPresenter';

const makeUserObj = ({ uid, email, username }) => {
	return { uid, username, email, photoURL: null, albums: [] };
};

const addUserOnDb = async ({ uid, email, username }) => {
	await setUserById(uid, makeUserObj({ uid, email, username }));
};

const Join = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
		setValue,
	} = useForm();
	const history = useHistory();
	const setPasswordNotEqualError = () => {
		setError('password1', { message: 'Passwords do not match.' }, { shouldFocus: true });
		setValue('password1', '');
	};
	const setFirebaseError = {
		passwordToShort: () => {
			setError('extraError', { message: 'Password is to Short.' });
		},
		serverError: () => {
			setError('extraError', { message: 'Something went wrong, please try again.' });
		},
	};
	const onSubmit = async ({ email, username, password, password1 }) => {
		if (password !== password1) {
			setPasswordNotEqualError();
			return;
		}
		try {
			const { uid } = await createUserAuth(email, password);
			await addUserOnDb({ uid, email, username });
			const makeUserProfilePath = (uid) => `/user/${uid}`;
			history.push(makeUserProfilePath(uid));
		} catch (error) {
			if (error.code === 'auth/weak-password') {
				setFirebaseError.passwordToShort();
			} else {
				setFirebaseError.serverError();
			}
		}
	};
	return <JoinPresenter onSubmit={handleSubmit(onSubmit)} register={register} errors={errors} />;
};
export default Join;