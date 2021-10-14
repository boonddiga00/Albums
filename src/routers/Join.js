import { useInput } from '../Hooks/Hooks';
import { authService } from '../fbase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Join = () => {
	const { value: email, onChange: onChangeEmail } = useInput('');
	const { value: username, onChange: onChangeUsername } = useInput('');
	const { value: password, onChange: onChangePassword } = useInput('');
	const onSubmitJoin = async (event) => {
		event.preventDefault();
		await createUserWithEmailAndPassword(authService, email, password);
	};
	return (
		<form onSubmit={onSubmitJoin}>
			<input type="email" placeholder="Email" value={email} onChange={onChangeEmail} />
			<input type="text" placeholder="Username" value={username} onChange={onChangeUsername} />
			<input type="password" placeholder="Password" value={password} onChange={onChangePassword} />
			<input type="submit" value="Create an Account" />
		</form>
	);
};
export default Join;