import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteAlbum } from 'fbase/firestoreFunctions';
import { getAuthAsync } from 'Store/Actions/authAction';

const AlbumCover = ({ user }) => {
	const deleteButton = useRef();
	const { currentUser } = useSelector((state) => state);
	const dispatch = useDispatch();
	const { albums } = user;
	const onClickDeleteBtn = async (albumId, userId) => {
		deleteButton.current.disabled = true;
		await deleteAlbum(albumId, userId);
		dispatch(getAuthAsync(currentUser.uid));
	};
	return albums ? (
		<div>
			<h2>Albums</h2>
			{albums.map(({ id, thumnail, albumImages, description, title }, index) => (
				<div key={index}>
					<Link
						key={index}
						to={{ pathname: `/album/${id}`, state: { thumnail, albumImages, description, title } }}
					>
						<div style={{ border: '1px solid black', width: '200px' }}>
							<img src={thumnail} alt="Thumnail" title="Thumnail" width="200px" height="200px" />
							<h4>{title}</h4>
							<p>{description}</p>
						</div>
					</Link>
					{currentUser.uid === user.uid && (
						<button ref={deleteButton} onClick={() => onClickDeleteBtn(id, currentUser.uid)}>
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