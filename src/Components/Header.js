import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
	const { currentUser } = useSelector((state) => state);
	return (
		<nav>
			<ul>
				<li>
					<Link to="/trending">Trending</Link>
				</li>
				{currentUser && (
					<>
						<li>
							<Link to={`/user/${currentUser.uid}`}>Profile</Link>
						</li>
						<li>
							<Link to={`/user/${currentUser.uid}/edit`}>Edit Profile</Link>
						</li>
						<li>
							<Link to="/upload">Upload Album</Link>
						</li>
						<li>
							<Link to="/search">Search</Link>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
};

export default Header;