import GlobalStyles from 'Styles/GlobalStyles';
import AppRouter from 'Components/Router';
import { useSubscribeAuth } from 'fbase/functions/authFunctions';

const App = () => {
	const init = useSubscribeAuth();
	return init ? (
		<>
			<GlobalStyles />
			<AppRouter />
		</>
	) : (
		<p>Initializing...</p>
	);
};

export default App;