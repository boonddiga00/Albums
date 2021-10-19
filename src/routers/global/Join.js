import { useHistory } from 'react-router-dom';
import { useInput } from 'Hooks';
import { authService, db } from 'fbase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const Join = () => {
	const { value: inputEmail, onChange: onChangeInputEmail } = useInput('');
	const { value: username, onChange: onChangeUsername } = useInput('');
	const { value: password, onChange: onChangePassword } = useInput('');
	const history = useHistory();
	const onSubmitJoin = async (event) => {
		event.preventDefault();
		const {
			user: { uid, email, photoURL },
		} = await createUserWithEmailAndPassword(authService, inputEmail, password);
		try {
			await setDoc(doc(db, 'users', uid), {
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