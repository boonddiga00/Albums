import { useEffect, useState } from 'react';
import { getDocFromFirebase } from 'fbase/firestoreFunctions';

const Albums = ({ user, currentUser, location }) => {
	const { albums } = user;
	const [albumData, setAlbumData] = useState([]);
	const getAlbums = async () => {
		const getAlbumDataFromFirebase = async () => {
			let albumDataArray = [];
			for (let i = 0; i < albums.length; i++) {
				const albumData = await getDocFromFirebase(albums[i]);
				albumDataArray.push(albumData);
			}
			return albumDataArray;
		};
		const albumDataArray = await getAlbumDataFromFirebase();
		setAlbumData(albumDataArray);
	};
	useEffect(() => {
		if (!albums) {
			setAlbumData([]);
		} else {
			getAlbums();
		}
	}, [location, albums]);
	return (
		albumData && (
			<div>
				<h1>Albums</h1>
				{albumData.map(({ thumnail, albumImages, description, title }) => (
					<div>
						<img src={thumnail} alt="Thumnail" title="Thumnail" width="200px" height="200px" />
						<div>
							{albumImages.map((albumImage) => (
								<img src={albumImage} alt="Album" title="Album" width="200px" height="200px" />
							))}
						</div>
						<h1>{title}</h1>
						<h2>{description}</h2>
					</div>
				))}
			</div>
		)
	);
};

export default Albums;