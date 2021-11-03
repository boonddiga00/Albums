import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getPopulatedUserById } from 'fbase/firestoreFunctions';
import ProfilePresenter from 'Routers/Profile/ProfilePresenter';

const useUser = () => {
	const { uid } = useParams();
	const location = useLocation();
	const [populatedUser, setPopulatedUser] = useState(null);

	useEffect(() => {
		const getUserByParamAndSetUser = async () => {
			const userData = await getPopulatedUserById(uid);
			setPopulatedUser(userData);
		};
		getUserByParamAndSetUser();
	}, [location, uid]);

	return populatedUser;
};

const ProfileContainer = ({ currentUser }) => {
	const user = useUser();
	return <ProfilePresenter user={user} />;
};

export default ProfileContainer;