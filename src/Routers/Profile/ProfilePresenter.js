import React from 'react';
import AlbumCover from 'Components/AlbumCover';
import { logOut } from 'fbase/functions/authFunctions';
import { useHistory } from 'react-router-dom';

const ProfilePresenter = ({ user }) => {
	const { photoURL, username, description, uid, albums } = user;
	const history = useHistory();
	const onClickLogOut = () => {
		logOut();
		history.push('/login');
	};
	return (
		user && (
			<>
				<div>
					<img
						src={
							photoURL || 'https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png'
						}
						alt="Profile"
						title="Profile"
						width="100px"
						height="100px"
					/>
					<h1>{username}'s Home</h1>
					{description && <h4>{description}</h4>}
					<button onClick={onClickLogOut}>Log Out</button>
					<div>
						<h2>Best Moments</h2>
					</div>
				</div>
				<div>
					<AlbumCover uid={uid} albums={albums} />
				</div>
			</>
		)
	);
};

export default ProfilePresenter;