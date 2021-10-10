import { HashRouter, Switch, Route } from 'react-router-dom';
import Join from '../routers/Join';
import Login from '../routers/Login';
import Intro from '../routers/Intro';
import AlbumHome from '../routers/AlbumHome';

const AppRouter = () => {
	const isLoggedIn = false;
	return (
		<HashRouter>
			<Switch>
				{isLoggedIn ? (
					<Route exact path="/">
						<AlbumHome />
					</Route>
				) : (
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
				)}
			</Switch>
		</HashRouter>
	);
};

export default AppRouter;