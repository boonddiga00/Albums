import { useEffect, useState } from 'react';
import AppRouter from 'components/Router';
import { authService } from 'fbase/firebaseInstance';
import { getUserByIdFromFirebase } from 'fbase/firestoreFunctions';
import { onAuthStateChanged } from 'firebase/auth';

const App = () => {
	const [currentUser, setCurrentUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		onAuthStateChanged(authService, async (authUser) => {
			if (authUser) {
				const { uid } = authUser;
				const user = await getUserByIdFromFirebase(uid);
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
				setCurrentUser={setCurrentUser}
			/>
		</main>
	);
};

export default App;