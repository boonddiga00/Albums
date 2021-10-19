import { HashRouter, Switch, Route, Link } from 'react-router-dom';
import Join from 'routers/global/Join';
import Login from 'routers/global/Login';
import Intro from 'routers/Intro';
import UserHome from 'routers/user/UserHome';
import EditProfile from 'routers//user/EditProfile';
import UploadAlbum from 'routers/UploadAlbum';

const AppRouter = ({ isLoggedIn, currentUser, getUserDataFromFirestore }) => {
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
								getUserDataFromFirestore={getUserDataFromFirestore}
							/>
						</Route>
						<Route exact path="/user/:uid/edit">
							<EditProfile currentUser={currentUser} />
						</Route>
						<Route exact path="/album/upload">
							<UploadAlbum />
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