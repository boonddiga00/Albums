import { useEffect } from 'react';
import AppRouter from 'Components/Router';
import { authService } from 'fbase/firebaseInstance';
import { onAuthStateChanged } from 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import { getAuthAsync, resetAuthAction } from 'Store/Actions/authAction';

const App = () => {
	const { loading } = useSelector((state) => state);
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
	}, [dispatch]);
	return loading ? <p>Loading...</p> : <AppRouter />;
};

export default App;