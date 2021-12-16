import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { getPopulatedUserById } from 'fbase/firestoreFunctions';
import ProfilePresenter from 'Routers/Profile/ProfilePresenter';

const usePopulatedUser = () => {
	const {
		currentUser: { albums },
	} = useSelector((state) => state);
	const { uid } = useParams();
	const location = useLocation();
	const [populatedUser, setPopulatedUser] = useState(null);

	useEffect(() => {
		const getUserByParamAndSetUser = async () => {
			const userData = await getPopulatedUserById(uid);
			setPopulatedUser(userData);
		};
		getUserByParamAndSetUser();
	}, [location, uid, albums]);

	return populatedUser;
};

const ProfileContainer = () => {
	const user = usePopulatedUser();
	return <ProfilePresenter user={user || {}} />;
};

export default ProfileContainer;