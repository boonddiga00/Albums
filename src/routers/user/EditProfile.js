import { useState, useRef } from 'react';
import { db } from 'fbase';
import { doc, updateDoc } from 'firebase/firestore';

const EditProfile = ({ currentUser }) => {
	const [preview, setPreview] = useState('');
	const [isEditing, setIsEditing] = useState(false);
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
	const onSubmitProfilePhoto = async (event) => {
		event.preventDefault();
		if (preview) {
			const docRef = doc(db, 'users', currentUser.uid);
			await updateDoc(docRef, {
				photoURL: preview,
			});
		}
	};
	return (
		<>
			<form onSubmit={onSubmitProfilePhoto}>
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
				<input id="username" type="text" value={currentUser.username} placeholder="Username" />
				<label htmlFor="description">Description</label>
				<input id="description" type="text" placeholder="Description" />
				<input type="submit" value="Edit!" />
			</form>
		</>
	);
};

export default EditProfile;