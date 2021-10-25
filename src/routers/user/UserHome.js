import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Albums from 'components/Albums';

const UserHome = ({ currentUser, getUserDataFromFirestore }) => {
	const { uid } = useParams();
	const location = useLocation();
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
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
				<img src={user.photoURL} alt="Profile" title="Profile" width="100px" height="100px" />
				<h1>{user.username}'s Home</h1>
				{user.description && <h4>{user.description}</h4>}
				<div>
					<h2>Best Moments</h2>
				</div>
			</div>
			<div>
				<Albums user={user} currentUser={currentUser} location={location} />
			</div>
		</>
	);
};

export default UserHome;