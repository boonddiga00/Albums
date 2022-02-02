import { authService } from 'fbase/firebaseInstance';
import {
	onAuthStateChanged,
	signOut,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from 'firebase/auth';
import { useSetRecoilState, useResetRecoilState } from 'recoil';
import { currentUserUidState, initState } from 'atoms';
import { getUserById } from 'fbase/functions/userFunctions';

/* export const subscribeAuth = (dispatch) => {
	onAuthStateChanged(authService, (authUser) => {
		if (authUser) {
			const { uid } = authUser;
			dispatch(getAuthAsync(uid));
		} else {
			dispatch(resetAuthAction());
		}
	});
}; */

export const subscribeAuth = () => {

};

export const logOut = () => {
	signOut(authService);
};

export const createUserAuth = async (email, password) => {
	const { user } = await createUserWithEmailAndPassword(authService, email, password);
	return user;
};

export const signInAuth = async (email, password) => {
	await signInWithEmailAndPassword(authService, email, password);
};