import { Route, Redirect } from 'react-router-dom';
import Profile from 'Routers/Profile';
import EditProfile from 'Routers/EditProfile';
import Album from 'Routers/Album';
import UploadAlbum from 'Routers/UploadAlbum';

const PrivateRouter = () => {
	return (
		<>
			<Route exact path="/">
				<Redirect to="/trending" />
			</Route>
			<Route
				exact
				path="/user/:uid"
				render={({
					match: {
						params: { uid },
					},
				}) => <Profile key={uid} />}
			/>
			<Route exact path="/user/:uid/edit">
				<EditProfile />
			</Route>
			<Route exact path="/upload">
				<UploadAlbum />
			</Route>
			<Route exact path="/album/:id" render={(props) => <Album key={props.match.params.id} />} />
		</>
	);
};

export default PrivateRouter;