import React from 'react';
import Albums from 'Components/Albums';

const ProfilePresenter = ({ user }) => {
	return (
		user && (
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
					<div>
						<h2>Best Moments</h2>
					</div>
				</div>
				<div>
					<Albums user={user} />
				</div>
			</>
		)
	);
};

export default ProfilePresenter;