import { Link } from 'react-router-dom';

const Albums = ({ user: { albums } }) => {
	return albums ? (
		<div>
			<h2>Albums</h2>
			{albums.map(({ id, thumnail, albumImages, description, title }) => (
				<Link to={{ pathname: `/album/${id}`, state: { thumnail, albumImages, description, title } }}>
					<div style={{ border: '1px solid black', width: '200px' }}>
						<img src={thumnail} alt="Thumnail" title="Thumnail" width="200px" height="200px" />
						<h4>{title}</h4>
						<p>{description}</p>
					</div>
				</Link>
			))}
		</div>
	) : (
		<>
			<h1>Albums</h1>
			<h3>We can't Find anything...</h3>
		</>
	);
};

export default Albums;