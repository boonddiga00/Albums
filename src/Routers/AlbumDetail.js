import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getAlbumById } from 'fbase/functions/albumFunctions';

const useAlbum = () => {
	const { id } = useParams();
	const location = useLocation();
	const [album, setAlbum] = useState(location.state || null);
	useEffect(() => {
		if (!album) {
			const getAlbumAndSetState = async () => {
				const albumData = await getAlbumById(id);
				setAlbum(albumData);
			};
			getAlbumAndSetState();
		}
	}, [location, id, album]);

	return album;
};

const Album = () => {
	const album = useAlbum();
	const { thumnail, title, description, albumImages } = album ? album : {};
	return (
		album && (
			<>
				<img src={thumnail} title="Album Cover" alt="Album Cover" width="350px" height="350px" />
				<h1>{title}</h1>
				<p>{description}</p>
				<div>
					{albumImages.map((albumImage, index) => (
						<img
							key={index}
							src={albumImage}
							title="Album"
							alt="Album"
							width="300px"
							height="300px"
						/>
					))}
				</div>
			</>
		)
	);
};

export default Album;