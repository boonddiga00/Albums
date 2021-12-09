import { useSelector, useDispatch } from 'react-redux';
import { getAuthAsync } from 'Store/Actions/authAction';
import { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useInput, useOnChangeFile, useOnChangeFiles } from 'Hooks';
import { uploadThumnailTofirebase, uploadAlbumImagesToFirebase } from 'fbase/storageFunctions';
import { addDocToFirebase, updateUserByIdOnFirebase } from 'fbase/firestoreFunctions';
import UploadAlbumPresenter from 'Routers/UploadAlbum/UploadAlbumPresenter';

const uploadAlbumToStorage = async (uid, thumanil, albumImages) => {
	const thumnailUrl = await uploadThumnailTofirebase(thumanil, uid);
	const albumImagesUrl = await uploadAlbumImagesToFirebase(albumImages, uid);
	return [thumnailUrl, albumImagesUrl];
};

const updateUserAlbums = async (userObj, newAlbum) => {
	const { uid, albums } = userObj;
	const { path } = newAlbum;
	const updatedAlbum = [...albums, path];
	await updateUserByIdOnFirebase(uid, { albums: updatedAlbum });
};

const UploadAlbumContainer = () => {
	const { currentUser } = useSelector((state) => state);
	const dispatch = useDispatch();
	const [thumnail, onChangeThumnail] = useOnChangeFile();
	const [albumImages, onChangeAblumImages] = useOnChangeFiles();
	const [title, onChangeTitle] = useInput('');
	const [description, onChangeDescription] = useInput('');
	const btnRef = useRef();
	const history = useHistory();

	const titleInput = { value: title, onChange: onChangeTitle };
	const descriptionInput = { value: description, onChange: onChangeDescription };
	const onSubmitAlbum = async (event) => {
		event.preventDefault();
		if (!thumnail || !albumImages || !title || !description) {
			return;
		}
		btnRef.current.disabled = true;
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
		dispatch(getAuthAsync(currentUser.uid));
		history.push(`/user/${currentUser.uid}`);
	};

	return (
		<UploadAlbumPresenter
			onChangeThumnail={onChangeThumnail}
			onChangeAblumImages={onChangeAblumImages}
			titleInput={titleInput}
			descriptionInput={descriptionInput}
			onSubmitAlbum={onSubmitAlbum}
			btnRef={btnRef}
		/>
	);
};

export default UploadAlbumContainer;