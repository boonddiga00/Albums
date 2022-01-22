import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { signInAuth } from 'fbase/functions/authFunctions';
import LoginPresenter from 'Routers/Login/LoginPresenter';

const LoginContainer = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
		setValue,
	} = useForm();
	const history = useHistory();
	const onSubmit = async (data) => {
		const { email, password } = data;
		try {
			await signInAuth(email, password);
			history.push('/');
		} catch (error) {
			switch (error.code) {
				case 'auth/wrong-password':
					setError('password', { message: 'Wrong Password.' });
					setValue('password', '');
					break;
				case 'auth/invalid-email':
					setError('email', { message: 'Invalid Email.' });
					break;
				case 'auth/user-not-found':
					setError('email', { message: "We can't find your email." });
					break;
				case 'auth/too-many-requests':
					setError('extraError', {
						message: 'Access to this account has been temporarily disabled',
					});
					break;
				default:
					setError('extraError', { message: 'Something went wrong, please try again.' });
			}
		}
	};
	return <LoginPresenter onSubmit={handleSubmit(onSubmit)} register={register} errors={errors} />;
};

export default LoginContainer;