import { useHistory } from 'react-router-dom';
import { useInput, useOnChangeFile, useOnChangeFiles } from 'Hooks';
import { uploadBytesTofirebase, uploadMultipleFilesToFirebase } from 'fbase/storageFunctions';
import { addDocToFirebase, updateUserByIdOnFirebase } from 'fbase/firestoreFunctions';
import { v4 as uuidv4 } from 'uuid';
import UploadAlbumPresenter from 'Routers/UploadAlbum/UploadAlbumPresenter';

const uploadAlbumToStorage = async (uid, thumanil, albumImages) => {
	const THUMNAIL_STORAGE_PATH = `${uid}/album/thumnail/${uuidv4()}`;
	const ALBUM_IMAGE_STORAGE_PATH = `${uid}/album/albumImage/${uuidv4()}`;
	const thumnailUrl = await uploadBytesTofirebase(thumanil, THUMNAIL_STORAGE_PATH);
	const albumImagesUrl = await uploadMultipleFilesToFirebase(albumImages, ALBUM_IMAGE_STORAGE_PATH);
	return [thumnailUrl, albumImagesUrl];
};

const updateUserAlbums = async (userObj, newAlbum) => {
	const { uid, albums } = userObj;
	const { path } = newAlbum;
	const updatedAlbum = [...albums, path];
	await updateUserByIdOnFirebase(uid, { albums: updatedAlbum });
};

const UploadAlbumContainer = ({ currentUser, refreshUser }) => {
	const [thumnail, onChangeThumnail] = useOnChangeFile();
	const [albumImages, onChangeAblumImages] = useOnChangeFiles();
	const [title, onChangeTitle] = useInput('');
	const [description, onChangeDescription] = useInput('');
	const history = useHistory();

	const titleInput = { value: title, onChange: onChangeTitle };
	const descriptionInput = { value: description, onChange: onChangeDescription };

	const onSubmitAlbum = async (event) => {
		event.preventDefault();
		if (!thumnail || !albumImages || !title || !description) {
			return;
		}
		const [thumnailUrl, albumImagesUrl] = await uploadAlbumToStorage(
			currentUser.uid,
			thumnail,
			albumImages
		);
		const newAlbumObj = {
			title,
			description,
			thumnail: thumnailUrl,
			albumImages: albumImagesUrl,
			owner: currentUser.uid,
		};
		const uploadedNewAlbum = await addDocToFirebase('albums', newAlbumObj);
		await updateUserAlbums(currentUser, uploadedNewAlbum);
		refreshUser();
		history.push(`/user/${currentUser.uid}`);
	};

	return (
		<UploadAlbumPresenter
			onChangeThumnail={onChangeThumnail}
			onChangeAblumImages={onChangeAblumImages}
			titleInput={titleInput}
			descriptionInput={descriptionInput}
			onSubmitAlbum={onSubmitAlbum}
		/>
	);
};

export default UploadAlbumContainer;