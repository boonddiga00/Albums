import { authService } from 'fbase/firebaseInstance';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { getAuthAsync, resetAuthAction } from 'Store/Actions/authAction';

export const subscribeAuth = (dispatch) => {
	onAuthStateChanged(authService, (authUser) => {
		if (authUser) {
			const { uid } = authUser;
			dispatch(getAuthAsync(uid));
		} else {
			dispatch(resetAuthAction());
		}
	});
};

export const logOut = () => {
	signOut(authService);
};