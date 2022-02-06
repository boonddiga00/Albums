import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getUserById } from 'fbase/functions/userFunctions';
import ProfilePresenter from 'Routers/Profile/ProfilePresenter';

const ProfileContainer = () => {
	const { uid } = useParams();
	const { isLoading, data } = useQuery(['userProfile', uid], () => getUserById(uid));
	return <ProfilePresenter isLoading={isLoading} user={data}/>;
};

export default ProfileContainer;