import { getUserById } from 'fbase/functions/userFunctions';

const getAuthAction = (user) => {
	return {
		type: 'GET_AUTH',
		auth: {
			currentUser: user,
			loading: false,
		},
	};
};

export const getAuthAsync = (uid) => {
	return async (dispatch) => {
		const user = await getUserById(uid);
		dispatch(getAuthAction(user));
	};
};

export const resetAuthAction = () => {
	return {
		type: 'RESET_AUTH',
		auth: {
			currentUser: null,
			loading: false,
		},
	};
};