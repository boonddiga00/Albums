import { useEffect, useState } from 'react';
import AppRouter from './Router';
import { authService, db } from '../fbase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const App = () => {
	const [userObj, setUserObj] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const getUserDataFromFirestore = async (uid) => {
		const userRef = doc(db, 'users', uid);
		const userSnap = await getDoc(userRef);
		const user = userSnap.data();
		return user;
	};
	useEffect(() => {
		onAuthStateChanged(authService, (authUser) => {
			if (authUser) {
				const { uid } = authUser;
				const user = getUserDataFromFirestore(uid);
				setUserObj(user);
			} else {
				setUserObj(null);
			}
			setIsLoading(true);
		});
	}, []);
	return isLoading ? (
		<main>
			<AppRouter isLoggedIn={userObj} userObj={userObj} />
		</main>
	) : (
		<p>Loading...</p>
	);
};

export default App;