import React from 'react';
import AlbumCover from 'Components/AlbumCover';
import { logOut } from 'fbase/functions/authFunctions';
import { useHistory } from 'react-router-dom';

const ProfilePresenter = ({ isLoading, user }) => {
	console.log(user);
	const history = useHistory();
	const onClickLogOut = () => {
		logOut();
		history.push('/login');
	};
	return isLoading ? (
		'Loading...'
	) : (
		<>
			<div>
				<img
					src={
						user.photoURL ||
						'https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png'
					}
					alt="Profile"
					title="Profile"
					width="100px"
					height="100px"
				/>
				<h1>{user.username}'s Home</h1>
				{user.description && <h4>{user.description}</h4>}
				<button onClick={onClickLogOut}>Log Out</button>
				<div>
					<h2>Best Moments</h2>
				</div>
			</div>
			<div>
				<h2>Albums</h2>
				{user.albums ? (
					user.albums.map((albumId, index) => (
						<AlbumCover key={index} uid={user.uid} albumId={albumId} />
					))
				) : (
					<h1>We can't find anything</h1>
				)}
			</div>
		</>
	);
};

export default ProfilePresenter;