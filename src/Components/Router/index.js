import { HashRouter, Switch, Route } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isLoggedInState } from 'atoms';
import Header from 'Components/Header';
import PublicRouter from 'Components/Router/PublicRouter';
import PrivateRouter from 'Components/Router/PrivateRouter';
import Trending from 'Routers/Trending';
import Search from 'Routers/Search';

const AppRouter = () => {
	const isLoggedIn = useRecoilValue(isLoggedInState);
	return (
		<HashRouter>
			<Header />
			<Switch>
				<Route exact path="/trending">
					<Trending />
				</Route>
				<Route exact path="/search">
					<Search />
				</Route>
				{isLoggedIn ? <PrivateRouter /> : <PublicRouter />}
			</Switch>
		</HashRouter>
	);
};

export default AppRouter;