import GlobalStyles from 'Styles/GlobalStyles';
import { useEffect } from 'react';
import AppRouter from 'Components/Router';
import { subscribeAuth } from 'fbase/functions/authFunctions';
import { useSelector, useDispatch } from 'react-redux';

const App = () => {
	const { loading } = useSelector((state) => state);
	const dispatch = useDispatch();
	useEffect(() => {
		subscribeAuth(dispatch);
	}, [dispatch]);
	return loading ? (
		<p>Loading...</p>
	) : (
		<>
			<GlobalStyles />
			<AppRouter />
		</>
	);
};

export default App;