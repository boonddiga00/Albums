import { useState, useRef } from 'react';
import { useInput } from 'Hooks';
import { db, storageService } from 'fbase';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';

const EditProfile = ({ currentUser, setCurrentUser, getUserDataFromFirestore }) => {
	const [preview, setPreview] = useState('');
	const [isEditing, setIsEditing] = useState(false);
	const [username, onChangeUsername] = useInput(currentUser.username || '');
	const [description, onChangeDescription] = useInput(currentUser.description || '');
	const changeBtn = useRef();
	const onClickChangeBtn = (event) => {
		event.preventDefault();
		if (!isEditing) {
			changeBtn.current.innerText = 'Cancle';
		} else {
			changeBtn.current.innerText = 'Cancle';
			setPreview('');
		}
		setIsEditing((prev) => !prev);
	};
	const onChangeProfilePhoto = (event) => {
		const {
			target: { files },
		} = event;
		const reader = new FileReader();
		reader.onloadend = (finishedEvent) => {
			const {
				currentTarget: { result },
			} = finishedEvent;
			setPreview(result);
		};
		reader.readAsDataURL(files[0]);
	};
	const onSubmitProfileEdit = async (event) => {
		event.preventDefault();
		if(!preview && username === currentUser.username && description === currentUser.description) {
			return;
		}
		const docRef = doc(db, '/users', currentUser.uid);
		if (preview) {
			const storageRef = ref(storageService, `profile/${currentUser.uid}`);
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
	};
	return (
		<>
			<form onSubmit={onSubmitProfileEdit}>
				<div>
					{!isEditing ? (
						<img
							src={
								currentUser.photoURL ||
								'https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png'
							}
							alt="User Profile"
							title="User Profile"
							width="100px"
							height="100px"
						/>
					) : (
						<>
							{preview && (
								<img
									src={preview}
									alt="Profile Preview"
									title="Profile Preview"
									width="100px"
									height="100px"
								/>
							)}
							<input onChange={onChangeProfilePhoto} type="file" accept="image/*" />
						</>
					)}
					<div ref={changeBtn} onClick={onClickChangeBtn}>
						{!isEditing ? 'Change Profile Image' : 'Cancle'}
					</div>
				</div>
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
				<input type="submit" value="Edit!" />
			</form>
		</>
	);
};

export default EditProfile;