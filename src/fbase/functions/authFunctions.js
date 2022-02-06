import { authService } from 'fbase/firebaseInstance';
import {
	onAuthStateChanged,
	signOut,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from 'firebase/auth';
import { useSetRecoilState, useResetRecoilState } from 'recoil';
import { currentUserUidState } from 'atoms';
import { useState, useEffect } from 'react';

export const useSubscribeAuth = () => {
	const [init, setInit] = useState(false);
	const setUid = useSetRecoilState(currentUserUidState);
	const resetUid = useResetRecoilState(currentUserUidState);
	useEffect(() => {
		onAuthStateChanged(authService, (authUser) => {
			if (authUser) {
				const { uid } = authUser;
				setUid(uid);
			} else {
				resetUid();
			}
			setInit(true);
		});
	}, [resetUid, setInit, setUid]);
	return init;
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