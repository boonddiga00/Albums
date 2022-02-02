import { useQuery } from 'react-query';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { currentUserUidState } from 'atoms';
import { getAlbumById } from 'fbase/functions/albumFunctions';
import { deleteAlbum } from 'fbase/functions/multiFunctions';

const AlbumCover = ({ uid, albumId }) => {
	const { isLoading, data: album } = useQuery(['albumCover', albumId], () => getAlbumById(albumId));
	console.log(album);
	const currentUserUid = useRecoilValue(currentUserUidState);
	const deleteButton = useRef();
	const onClickDeleteBtn = async (albumId) => {
		await deleteAlbum(albumId, uid);
	};
	return isLoading ? (
		<h1>Loading...</h1>
	) : (
		<>
			<Link
				to={{
					pathname: `/album/${albumId}`,
					state: album,
				}}
			>
				<div style={{ border: '1px solid black', width: '200px' }}>
					<img src={album.thumnail} alt="Thumnail" title="Thumnail" width="200px" height="200px" />
					<h4>{album.title}</h4>
					<p>{album.description}</p>
				</div>
			</Link>
			{currentUserUid === uid && (
				<button ref={deleteButton} onClick={(e) => onClickDeleteBtn(albumId)}>
					Delete
				</button>
			)}
		</>
	);

	/* <>
			<h1>Albums</h1>
			<h3>We can't Find anything...</h3>
		</> */
};

export default AlbumCover;