import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

const UserHome = ({ currentUser, getUserDataFromFirestore }) => {
	const { uid } = useParams();
	const location = useLocation();
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		console.log('rendering...');
		if (currentUser.uid === uid) {
			setUser(currentUser);
			setIsLoading(false);
		} else {
			const getUserByParamAndSetUser = async () => {
				const userData = await getUserDataFromFirestore(uid);
				setUser(userData);
				setIsLoading(false);
			};
			getUserByParamAndSetUser();
		}
	}, [location, currentUser, getUserDataFromFirestore, uid]);
	return isLoading ? (
		<p>Loading...</p>
	) : (
		<>
			<div>
				<h1>{user.username}'s Home</h1>
				<div>
					<h2>Best Moments</h2>
				</div>
			</div>
			<div></div>
		</>
	);
};

export default UserHome;