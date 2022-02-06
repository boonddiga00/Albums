import { atom, selectorFamily, selector, useSetRecoilState } from 'recoil';
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

const currentUserRequest = atom({ key: 'currentUserRequest', default: 0 });

export const currentUserState = atom({
	key: 'currentUserState',
	default: selector({
		key: 'currentUserState/Defalut',
		get: async ({ get }) => {
			get(currentUserRequest);
			return await getUserById(get(currentUserUidState));
		},
	}),
});

export const useRefreshCurrentUser = () => {
	const setCurrentUserRequest = useSetRecoilState(currentUserRequest);
	return () => setCurrentUserRequest((prev) => prev + 1);
};