import { useEffect, useState } from 'react';
import AppRouter from 'components/Router';
import { authService, db } from 'fbase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const App = () => {
	const [currentUser, setCurrentUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const getUserDataFromFirestore = async (uid) => {
		const userRef = doc(db, 'users', uid);
		const userSnap = await getDoc(userRef);
		const user = userSnap.data();
		return user;
	};
	console.log(currentUser)
	useEffect(() => {
		onAuthStateChanged(authService, async (authUser) => {
			if (authUser) {
				const { uid } = authUser;
				const user = await getUserDataFromFirestore(uid);
				setCurrentUser(user);
			} else {
				setCurrentUser(null);
			}
			setIsLoading(false);
		});
	}, []);
	return isLoading ? (
		<p>Loading...</p>
	) : (
		<main>
			<AppRouter
				isLoggedIn={currentUser}
				currentUser={currentUser}
				getUserDataFromFirestore={getUserDataFromFirestore}
			/>
		</main>
	);
};

export default App;