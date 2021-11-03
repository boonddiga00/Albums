import { useHistory } from 'react-router-dom';
import { useInput } from 'Hooks';
import { setUserByIdOnFirebase } from 'fbase/firestoreFunctions';
import { authService } from 'fbase/firebaseInstance';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Join = () => {
	const [inputEmail, onChangeInputEmail] = useInput('');
	const [username, onChangeUsername] = useInput('');
	const [password, onChangePassword] = useInput('');
	const history = useHistory();
	const onSubmitJoin = async (event) => {
		event.preventDefault();
		const {
			user: { uid, email, photoURL },
		} = await createUserWithEmailAndPassword(authService, inputEmail, password);
		try {
			await setUserByIdOnFirebase(uid, {
				uid,
				username,
				email,
				photoURL,
			});
		} catch (error) {
			console.error('Error adding document: ', error);
		}
		history.push(`/user/${uid}`);
	};
	return (
		<form onSubmit={onSubmitJoin}>
			<input type="email" placeholder="Email" value={inputEmail} onChange={onChangeInputEmail} />
			<input type="text" placeholder="Username" value={username} onChange={onChangeUsername} />
			<input type="password" placeholder="Password" value={password} onChange={onChangePassword} />
			<input type="submit" value="Create an Account" />
		</form>
	);
};
export default Join;