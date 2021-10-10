import { useInput } from '../Hooks/Hooks';

const Login = () => {
	const { username, onUsernameChange } = useInput('');
	const { password, onPasswordChange } = useInput('');
	const onSubmitLogin = (event) => {
		event.preventDefault();
	};
	return (
		<form onSubmit={onSubmitLogin}>
			<input type="text" placeholder="Username" value={username} onChange={onUsernameChange} />
			<input type="password" placeholder="Password" value={password} onChange={onPasswordChange} />
			<input type="submit" value="Login" />
		</form>
	);
};

export default Login;