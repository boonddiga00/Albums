import GlobalStyles from 'Styles/GlobalStyles';
import { useState, useEffect } from 'react';
import AppRouter from 'Components/Router';
import { authService } from 'fbase/firebaseInstance';
import { onAuthStateChanged } from 'firebase/auth';
import { useSetRecoilState, useResetRecoilState } from 'recoil';
import { currentUserUidState } from 'atoms';

const App = () => {
	const [init, setInit] = useState(false);
	const setUid = useSetRecoilState(currentUserUidState);
	const refreshUid = useResetRecoilState(currentUserUidState);
	useEffect(() => {
		onAuthStateChanged(authService, (authUser) => {
			if (authUser) {
				const { uid } = authUser;
				setUid(uid);
				setInit(true);
			} else {
				refreshUid();
				setInit(true);
			}
		});
	}, [refreshUid, setInit, setUid]);
	return init ? (
		<>
			<GlobalStyles />
			<AppRouter />
		</>
	) : (
		<p>Loading...</p>
	);
};

export default App;