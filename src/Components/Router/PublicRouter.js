import { Route } from 'react-router-dom';
import Join from 'Routers/Join';
import Login from 'Routers/Login';
import Intro from 'Routers/Intro';

const PublicRouter = () => {
	return (
		<>
			<Route exact path="/">
				<Intro />
			</Route>
			<Route exact path="/join">
				<Join />
			</Route>
			<Route exact path="/login">
				<Login />
			</Route>
		</>
	);
};

export default PublicRouter;