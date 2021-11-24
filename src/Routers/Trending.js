import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { dbService } from 'fbase/firebaseInstance';
import { collection, getDocs } from 'firebase/firestore';

const useTrending = () => {
	const [recentAlbums, setRecentAlbums] = useState([]);

	useEffect(() => {
		const getAlbums = async () => {
			const ref = collection(dbService, 'albums');
			const dataSnap = await getDocs(ref);
			const albums = dataSnap.docs.map((doc) => {
				return { id: doc.id, album: doc.data() };
			});
			setRecentAlbums(albums);
		};
		getAlbums();
	}, []);

	return recentAlbums;
};

const Trending = () => {
	const recentAlbums = useTrending();
	return (
		<ul>
			{recentAlbums.map(({ id, album }, index) => (
				<li key={index}>
					<Link to={`/album/${id}`}>
						<img
							src={album.thumnail}
							title="Thumnail"
							alt="Thumnail"
							width="150px"
							height="150px"
						/>
						<h2>{album.title}</h2>
						<h3>{album.description}</h3>
						<p>{album.owner}</p>
					</Link>
				</li>
			))}
		</ul>
	);
};

export default Trending;