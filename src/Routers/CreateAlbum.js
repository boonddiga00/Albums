import { Switch, Route, Link } from 'react-router-dom';
import CreateCover from 'Components/CreateAlbum/CreateCover';
import CreateContent from 'Components/CreateAlbum/CreateContent';

const CreateAlbum = () => {
	return (
		<Switch>
			<Route path="/create/cover">
				<CreateCover />
			</Route>
			<Route path="/create/content">
				<CreateContent />
			</Route>
		</Switch>
	);
};

export default CreateAlbum;