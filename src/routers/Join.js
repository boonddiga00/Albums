import { useHistory } from 'react-router-dom';
import { useInput } from '../Hooks/Hooks';
import { authService, db } from '../fbase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const Join = () => {
	const { value: email, onChange: onChangeEmail } = useInput('');
	const { value: username, onChange: onChangeUsername } = useInput('');
	const { value: password, onChange: onChangePassword } = useInput('');
	const history = useHistory();
	const onSubmitJoin = async (event) => {
		event.preventDefault();
		const {
			user: { uid },
		} = await createUserWithEmailAndPassword(authService, email, password);
		try {
			await setDoc(doc(db, 'users', uid), {
				username,
			});
		} catch (error) {
			console.error('Error adding document: ', error);
		}
		history.push('/');
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