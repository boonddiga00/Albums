import { Route, Redirect } from 'react-router-dom';
import Profile from 'Routers/Profile';
import EditProfile from 'Routers/EditProfile';
import AlbumDetail from 'Routers/AlbumDetail';
import CreateAlbum from 'Routers/CreateAlbum';

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
			<Route path="/create">
				<CreateAlbum />
			</Route>
			<Route
				exact
				path="/album/:id"
				render={(props) => <AlbumDetail key={props.match.params.id} />}
			/>
		</>
	);
};

export default PrivateRouter;