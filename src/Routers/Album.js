import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getDocFromFirebase } from 'fbase/firestoreFunctions';

const useAlbum = () => {
	const { id } = useParams();
	const location = useLocation();
	const [album, setAlbum] = useState(location.state || null);

	useEffect(() => {
		const { state } = location;
		if (!state) {
			const getAlbum = async () => {
				const albumData = await getDocFromFirebase("albums/" + id);
				setAlbum(albumData);
			};
			getAlbum();
		}
	}, [location, id]);

	return album;
};

const Album = () => {
	const album = useAlbum();
	return (
		album && (
			<>
				<img src={album.thumnail} title="Album Cover" alt="Album Cover" width="350px" height="350px" />
				<h1>{album.title}</h1>
				<p>{album.description}</p>
				{album.albumImages.map((albumImage, index) => (
					<img
						key={index}
						src={albumImage}
						title="Album"
						alt="Album"
						width="300px"
						height="300px"
					/>
				))}
			</>
		)
	);
};

export default Album;