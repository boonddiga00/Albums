import { useSelector, useDispatch } from 'react-redux';
import { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useInput } from 'Hooks';
import { updateUserById } from 'fbase/functions/userFunctions';
import { uploadProfileImage } from 'fbase/functions/storageFunctions';
import { getAuthAsync } from 'Store/Actions/authAction';
import EditProfileImage from 'Components/EditProfileImage';

const EditProfile = () => {
	const { currentUser } = useSelector((state) => state);
	const dispatch = useDispatch();
	const [preview, setPreview] = useState('');
	const [username, onChangeUsername] = useInput(currentUser.username || '');
	const [description, onChangeDescription] = useInput(currentUser.description || '');
	const submitBtn = useRef();
	const history = useHistory();
	const onSubmitProfileEdit = async (event) => {
		event.preventDefault();
		if (!preview && username === currentUser.username && description === currentUser.description) {
			return;
		}
		submitBtn.current.disabled = true;
		const { uid } = currentUser;
		if (preview) {
			const uploadedProfileURL = await uploadProfileImage(uid, preview);
			await updateUserById(uid, { photoURL: uploadedProfileURL });
		}
		if (username !== currentUser.username) {
			await updateUserById(uid, { username });
		}
		if (description !== currentUser.description) {
			await updateUserById(uid, { description });
		}
		dispatch(getAuthAsync(uid));
		history.push(`/user/${uid}`);
	};
	return (
		<form onSubmit={onSubmitProfileEdit}>
			<EditProfileImage preview={preview} setPreview={setPreview} />
			<label htmlFor="username">Username</label>
			<input
				id="username"
				type="text"
				placeholder="Username"
				value={username}
				onChange={onChangeUsername}
			/>
			<label htmlFor="description">Description</label>
			<input
				id="description"
				type="text"
				placeholder="Description"
				value={description}
				onChange={onChangeDescription}
			/>
			<input ref={submitBtn} type="submit" value="Submit" />
		</form>
	);
};

export default EditProfile;