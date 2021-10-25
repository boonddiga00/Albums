import { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useInput } from 'Hooks';
import { db, storageService } from 'fbase';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import EditProfileImage from 'components/EditProfileImage';

const EditProfile = ({ currentUser, setCurrentUser, getUserDataFromFirestore }) => {
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
		const docRef = doc(db, '/users', currentUser.uid);
		if (preview) {
			const storageRef = ref(storageService, `${currentUser.uid}/profile/main`);
			await uploadString(storageRef, preview, 'data_url');
			const uploadedProfileURL = await getDownloadURL(storageRef);

			await updateDoc(docRef, { photoURL: uploadedProfileURL });
		}
		if (username !== currentUser.username) {
			await updateDoc(docRef, { username });
		}
		if (description !== currentUser.description) {
			await updateDoc(docRef, { description });
		}
		const updatedCurrentUser = await getUserDataFromFirestore(currentUser.uid);
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