import { useInput } from 'Hooks';
import { useHistory } from 'react-router-dom';
import { authService } from 'fbase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
	const [email, onChangeEmail] = useInput('');
	const [password, onChangePassword] = useInput('');
	const history = useHistory();
	const onSubmitLogin = async (event) => {
		event.preventDefault();
		await signInWithEmailAndPassword(authService, email, password);
		history.push('/');
	};
	return (
		<form onSubmit={onSubmitLogin}>
			<input type="text" placeholder="Email" value={email} onChange={onChangeEmail} />
			<input type="password" placeholder="Password" value={password} onChange={onChangePassword} />
			<input type="submit" value="Login" />
		</form>
	);
};

export default Login;