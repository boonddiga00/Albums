import { Link } from 'react-router-dom';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { isLoggedInState, currentUserState } from 'atoms';
import styled from 'styled-components';

const NavBar = styled.nav`
	width: 100%;
	height: 60px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const Nav = styled.ul`
	display: flex;
	align-items: center;
	li {
		margin-right: 20px;
	}
`;

const Logo = styled.h1`
	font-size: 20px;
	font-weight: 600;
	margin-left: 20px;
`;

const ProfileImage = styled.img`
	width: 40px;
	height: 40px;
	border-radius: 50%;
`;

const Header = () => {
	const isLoggedIn = useRecoilValue(isLoggedInState);
	const currentUser = useRecoilValueLoadable(currentUserState);
	return (
		isLoggedIn && (
			<NavBar>
				<Logo>Albums</Logo>
				<Nav>
					<li>
						<Link to="/trending">Trending</Link>
					</li>
					<li>
						<Link to="/create/cover">Upload Album</Link>
					</li>
					{currentUser.state === 'hasValue' && (
						<>
							<li>
								<Link to={`/user/${currentUser.contents.uid}/edit`}>Edit Profile</Link>
							</li>
							<li>
								<Link to={`/user/${currentUser.contents.uid}`}>
									<ProfileImage src={currentUser.contents.photoURL} alt="Profile" />
								</Link>
							</li>
						</>
					)}
				</Nav>
			</NavBar>
		)
	);
};

export default Header;