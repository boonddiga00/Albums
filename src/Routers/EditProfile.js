import { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useInput } from 'Hooks';
import { updateUserByIdOnFirebase } from 'fbase/firestoreFunctions';
import { uploadProfileImageToFirebase } from 'fbase/storageFunctions';
import EditProfileImage from 'Components/EditProfileImage';

const EditProfile = ({ currentUser, refreshUser }) => {
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
			const uploadedProfileURL = await uploadProfileImageToFirebase(uid, preview, 'data_url');
			await updateUserByIdOnFirebase(uid, { photoURL: uploadedProfileURL });
		}
		if (username !== currentUser.username) {
			await updateUserByIdOnFirebase(uid, { username });
		}
		if (description !== currentUser.description) {
			await updateUserByIdOnFirebase(uid, { description });
		}
		refreshUser();
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