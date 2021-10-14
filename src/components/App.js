import { useEffect, useState } from 'react';
import AppRouter from './Router';
import { authService } from '../fbase';
import { onAuthStateChanged } from 'firebase/auth';

const App = () => {
	const [userObj, setUserObj] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		onAuthStateChanged(authService, (user) => {
			if (user) {
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