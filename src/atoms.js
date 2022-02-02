import { atom, selectorFamily, selector } from 'recoil';
import { getUserById } from 'fbase/functions/userFunctions';
import { getAlbums } from 'fbase/functions/albumFunctions';

export const currentUserUidState = atom({ key: 'userState', default: null });

export const isLoggedInState = selector({
	key: 'isLoggedInState',
	get: ({ get }) => {
		if (get(currentUserUidState)) {
			return true;
		} else {
			return false;
		}
	},
});

export const currentUserState = selector({
	key: 'currentUserState',
	get: async ({ get }) => {
		const uid = get(currentUserUidState);
		if (uid) {
			const currentUserObj = await getUserById(uid);
			return currentUserObj;
		} else {
			return null;
		}
	},
});

export const userState = selectorFamily({
	key: 'userSelector',
	get: (uid) => async ({ get }) => {
		const currentUserUid = get(currentUserUidState);
		if (uid === currentUserUid) {
			const { currentUser } = get(currentUserState);
			return currentUser;
		} else {
			const user = await getUserById(uid);
			return user;
		}
	},
});

export const albumState = selector({
	key: 'albumState',
	get: async ({ get }) => {
		const { uid, albumUrls } = get(userState);
		const currentUserUid = get(currentUserUidState);
		return await getAlbums(albumUrls);
	},
});