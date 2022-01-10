import { useSelector, useDispatch } from 'react-redux';
import { getAuthAsync } from 'Store/Actions/authAction';
import { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useInput, useOnChangeFile, useOnChangeFiles } from 'Hooks';
import { uploadThumnail, uploadAlbumImages } from 'fbase/functions/storageFunctions';
import { updateUserById } from 'fbase/functions/userFunctions';
import { addAlbum } from 'fbase/functions/albumFunctions';
import UploadAlbumPresenter from 'Routers/UploadAlbum/UploadAlbumPresenter';

const uploadAlbumToStorage = async (uid, thumanil, albumImages) => {
	const thumnailUrl = await uploadThumnail(uid, thumanil);
	const albumImagesUrl = await uploadAlbumImages(uid, albumImages);
	return { thumnail: thumnailUrl, albumImages: albumImagesUrl };
};

const updateUsersAlbum = async (userObj, albumId) => {
	const { uid, albums } = userObj;
	const updatedAlbum = [...albums, albumId];
	await updateUserById(uid, { albums: updatedAlbum });
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

	const onSubmitAlbum = async (event) => {
		event.preventDefault();
		if (!thumnail || !albumImages || !title || !description) {
			return;
		}
		btnRef.current.disabled = true;
		
		const albumThumnailAndImages = await uploadAlbumToStorage(currentUser.uid, thumnail, albumImages);
		const newAlbumObj = {
			title,
			description,
			...albumThumnailAndImages,
			owner: currentUser.uid,
		};
		const albumId = await addAlbum(newAlbumObj);
		await updateUsersAlbum(currentUser, albumId);
		dispatch(getAuthAsync(currentUser.uid));
		history.push(`/user/${currentUser.uid}`);
	};

	const titleInput = { value: title, onChange: onChangeTitle };
	const descriptionInput = { value: description, onChange: onChangeDescription };

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