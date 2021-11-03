import React from 'react';
import Albums from 'Components/Albums';

const ProfilePresenter = ({ user }) => {
	return (
		user && (
			<>
				<div>
					<img src={user.photoURL} alt="Profile" title="Profile" width="100px" height="100px" />
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