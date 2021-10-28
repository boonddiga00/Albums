import { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useInput } from 'Hooks';
import { getUserByIdFromFirebase, updatUserByIdOnFirebase } from 'fbase/firestoreFunctions';
import { uploadStringToFirebase } from 'fbase/storageFunctions';
import EditProfileImage from 'components/EditProfileImage';

const EditProfile = ({ currentUser, setCurrentUser }) => {
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
			const STORAGE_PATH = `${currentUser.uid}/profile/main`;
			const uploadedProfileURL = await uploadStringToFirebase(preview, STORAGE_PATH, 'data_url');
			await updatUserByIdOnFirebase(uid, { photoURL: uploadedProfileURL });
		}
		if (username !== currentUser.username) {
			await updatUserByIdOnFirebase(uid, { username });
		}
		if (description !== currentUser.description) {
			await updatUserByIdOnFirebase(uid, { description });
		}
		const updatedCurrentUser = await getUserByIdFromFirebase(currentUser.uid);
		setCurrentUser(updatedCurrentUser);
		history.push(`/user/${currentUser.uid}`);
	};
	return (
		<form onSubmit={onSubmitProfileEdit}>
			<EditProfileImage currentUser={currentUser} preview={preview} setPreview={setPreview} />
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