import { useEffect, useState } from 'react';
import AppRouter from 'Components/Router';
import { authService } from 'fbase/firebaseInstance';
import { getUserByIdFromFirebase } from 'fbase/firestoreFunctions';
import { onAuthStateChanged } from 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import { getAuthAsync, resetAuthAction } from 'Store/Actions/authAction';

const App = () => {
	/*const [currentUser, setCurrentUser] = useState(null);
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
	const refreshUser = async () => {
		const user = await getUserByIdFromFirebase(currentUser.uid)
		setCurrentUser(user);
	} */
	const { currentUser, loading } = useSelector((state) => state);
	const dispatch = useDispatch();
	useEffect(() => {
		onAuthStateChanged(authService, (authUser) => {
			if (authUser) {
				const { uid } = authUser;
				dispatch(getAuthAsync(uid));
			} else {
				dispatch(resetAuthAction());
			}
		});
	}, []);
	return loading ? (
		<p>Loading...</p>
	) : (
		<main>
			<AppRouter
				isLoggedIn={currentUser}
				currentUser={currentUser}
				setCurrentUser={() => {}}
				refreshUser={() => {}}
			/>
		</main>
	);
};

export default App;