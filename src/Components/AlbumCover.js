import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteAlbum } from 'fbase/functions/multiFunctions';
import { getAuthAsync } from 'Store/Actions/authAction';

const AlbumCover = ({ uid, albums }) => {
	const dispatch = useDispatch();
	const { currentUser } = useSelector((state) => state);
	const deleteButton = useRef();

	const onClickDeleteBtn = async (albumId) => {
		await deleteAlbum(albumId, uid);
		dispatch(getAuthAsync(uid));
	};

	return albums ? (
		<div>
			<h2>Albums</h2>
			{albums.map(({ id, thumnail, albumImages, description, title }, index) => (
				<div key={index}>
					<Link
						to={{
							pathname: `/album/${id}`,
							state: { id, thumnail, albumImages, description, title },
						}}
					>
						<div style={{ border: '1px solid black', width: '200px' }}>
							<img src={thumnail} alt="Thumnail" title="Thumnail" width="200px" height="200px" />
							<h4>{title}</h4>
							<p>{description}</p>
						</div>
					</Link>
					{currentUser.uid === uid && (
						<button ref={deleteButton} onClick={(e) => onClickDeleteBtn(id)}>
							Delete
						</button>
					)}
				</div>
			))}
		</div>
	) : (
		<>
			<h1>Albums</h1>
			<h3>We can't Find anything...</h3>
		</>
	);
};

export default AlbumCover;