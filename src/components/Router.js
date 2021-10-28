import { HashRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
import Join from 'routers/global/Join';
import Login from 'routers/global/Login';
import Intro from 'routers/Intro';
import UserHome from 'routers/user/UserHome';
import EditProfile from 'routers//user/EditProfile';
import UploadAlbum from 'routers/UploadAlbum';

const AppRouter = ({ isLoggedIn, currentUser, setCurrentUser }) => {
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
						<Route exact path="/user/:uid">
							<UserHome
								currentUser={currentUser}
							/>
						</Route>
						<Route exact path="/user/:uid/edit">
							<EditProfile
								currentUser={currentUser}
								setCurrentUser={setCurrentUser}
							/>
						</Route>
						<Route exact path="/album/upload">
							<UploadAlbum currentUser={currentUser} />
						</Route>
						<Redirect to={`/user/${currentUser.uid}`} />
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
						<Redirect to="/" />
					</>
				)}
			</Switch>
		</HashRouter>
	);
};

export default AppRouter;