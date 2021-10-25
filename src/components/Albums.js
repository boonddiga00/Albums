import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from 'fbase';

const Albums = ({ user, currentUser, location }) => {
	const { albums } = user;
	const [albumDatas, setAlbumDatas] = useState([]);
	const getAlbums = async () => {
		const getAlbumDataFromFirebase = async () => {
			let albumDataArray = [];
			for (let i = 0; i < albums.length; i++) {
				const albumRef = doc(db, `${albums[i]}`);
				const albumSnap = await getDoc(albumRef);
				const albumData = await albumSnap.data();
				albumDataArray.push(albumData);
			}
			return albumDataArray;
		};
		const albumDataArray = await getAlbumDataFromFirebase();
		setAlbumDatas(albumDataArray);
	};
	useEffect(() => {
		if (!albums) {
			setAlbumDatas([]);
		} else {
			getAlbums();
		}
	}, [location, albums]);
	return (
		albumDatas && (
			<div>
				<h1>Albums</h1>
				{albumDatas.map(({ thumnail, albumImages, description, title }) => (
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