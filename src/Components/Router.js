import { HashRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
import Join from 'Routers/Join';
import Login from 'Routers/Login';
import Intro from 'Routers/Intro';
import Profile from 'Routers/Profile';
import EditProfile from 'Routers/EditProfile';
import Album from 'Routers/Album';
import UploadAlbum from 'Routers/UploadAlbum';
import Trending from 'Routers/Trending';
import Search from 'Routers/Search';

const AppRouter = ({ isLoggedIn, currentUser, refreshUser }) => {
	return (
		<HashRouter>
			<nav>
				<ul>
					<li>
						<Link to="/">Trending</Link>
					</li>
					{isLoggedIn && (
						<>
							<li>
								<Link to={`/user/${currentUser.uid}`}>Profile</Link>
							</li>
							<li>
								<Link to={`/user/${currentUser.uid}/edit`}>Edit Profile</Link>
							</li>
							<li>
								<Link to="/upload">Upload Album</Link>
							</li>
							<li>
								<Link to="/search">Search</Link>
							</li>
						</>
					)}
				</ul>
			</nav>
			<Switch>
				<Route exact path="/search">
					<Search />
				</Route>
				{isLoggedIn ? (
					<>
						<Route exact path="/">
							<Trending />
						</Route>
						<Route
							exact
							path="/user/:uid"
							render={({
								match: {
									params: { uid },
								},
							}) => <Profile key={uid} currentUser={currentUser} />}
						/>
						<Route exact path="/user/:uid/edit">
							<EditProfile currentUser={currentUser} refreshUser={refreshUser} />
						</Route>
						<Route exact path="/upload">
							<UploadAlbum currentUser={currentUser} refreshUser={refreshUser} />
						</Route>
						<Route
							exact
							path="/album/:id"
							render={(props) => <Album key={props.match.params.id} />}
						/>
					</>
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