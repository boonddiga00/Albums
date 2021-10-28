import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useInput } from 'Hooks';
import { uploadBytesTofirebase, uploadMultipleFilesToFirebase } from 'fbase/storageFunctions';
import { addDocToFirebase, updatUserByIdOnFirebase } from 'fbase/firestoreFunctions';
import { v4 as uuidv4 } from 'uuid';

const UploadAlbum = ({ currentUser }) => {
	const [error, setError] = useState('');
	const [albumThumnailFile, setAlbumThumnailFile] = useState('');
	const [albumImageFiles, setAlbumImageFiles] = useState([]);
	const history = useHistory();
	const [title, onChangeTitle] = useInput('');
	const [description, onChangeDescription] = useInput('');
	const onChangeAlbumImage = (event) => {
		const {
			target: { files },
		} = event;
		setAlbumImageFiles(files);
	};
	const onChangeAlbumThumnail = (event) => {
		const {
			target: { files },
		} = event;
		setAlbumThumnailFile(files[0]);
	};
	const addAlbumToDB = async (thumnail, albumImages) => {
		const albumObj = {
			title,
			description,
			thumnail,
			albumImages,
			owner: currentUser.uid,
		};
		const albumDocRef = await addDocToFirebase('albums', albumObj);
		return albumDocRef;
	};
	const onSubmitAlbum = async (event) => {
		event.preventDefault();
		const { uid, albums } = currentUser;
		if (!albumThumnailFile || !albumImageFiles || !title || !description) {
			setError('You should fill every Field');
			return;
		}
		const THUMNAIL_STORAGE_PATH = `${uid}/album/thumnail/${uuidv4()}`;
		const ALBUM_IMAGE_STORAGE_PATH = `${uid}/album/albumImage`;
		const thumnail = await uploadBytesTofirebase(albumThumnailFile, THUMNAIL_STORAGE_PATH);
		const albumImages = await uploadMultipleFilesToFirebase(
			albumImageFiles,
			ALBUM_IMAGE_STORAGE_PATH
		);
		const albumDocRef = await addAlbumToDB(thumnail, albumImages);
		const { path } = albumDocRef;
		const ownedAlbums = albums ? [...albums, path] : [path];
		await updatUserByIdOnFirebase(uid, { albums: ownedAlbums });
		history.push(`/user/${uid}`);
	};
	return (
		<form onSubmit={onSubmitAlbum}>
			{error && <span>{error}</span>}
			<div>
				<input onChange={onChangeAlbumThumnail} type="file" required />
				<input value={title} onChange={onChangeTitle} type="text" placeholder="Title" required />
			</div>
			<input
				value={description}
				onChange={onChangeDescription}
				type="text"
				placeholder="Description"
				required
			/>
			<input onChange={onChangeAlbumImage} type="file" multiple={true} required />
			<input type="submit" value="Make an New Album" />
		</form>
	);
};
export default UploadAlbum;