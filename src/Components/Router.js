import { HashRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
import Join from 'Routers/Join';
import Login from 'Routers/Login';
import Intro from 'Routers/Intro';
import Profile from 'Routers/Profile';
import EditProfile from 'Routers/EditProfile';
import UploadAlbum from 'Routers/UploadAlbum';

const AppRouter = ({ isLoggedIn, currentUser, refreshUser }) => {
	return (
		<HashRouter>
			<nav>
				<ul>
					{isLoggedIn && (
						<>
							<li>
								<Link to={`/user/${currentUser.uid}`}>Profile</Link>
							</li>
							<li>
								<Link to={`/user/${currentUser.uid}/edit`}>Edit Profile</Link>
							</li>
							<li>
								<Link to="/album/upload">Upload Album</Link>
							</li>
						</>
					)}
				</ul>
			</nav>
			<Switch>
				{isLoggedIn ? (
					<>
						<Route exact path="/">
							<Redirect to={'/user/' + currentUser.uid} />
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
						<Route exact path="/album/upload">
							<UploadAlbum currentUser={currentUser} refreshUser={refreshUser} />
						</Route>
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