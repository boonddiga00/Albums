const initState = { currentUser: null, loading: true };
const authReducer = (state = initState, action) => {
	if (action.type === 'GET_AUTH') {
		return { ...action.auth };
	}
	if (action.type === 'RESET_AUTH') {
		return { ...action.auth };
	}
	return state;
};

export default authReducer;