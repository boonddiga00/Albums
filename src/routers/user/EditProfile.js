import { useState } from 'react';
import { db } from 'fbase';
import { doc, updateDoc } from 'firebase/firestore';

const EditProfile = ({ userObj }) => {
	const [preview, setPreview] = useState('');
	const onSubmitProfilePhoto = async (event) => {
		event.preventDefault();
		const docRef = doc(db, 'users', userObj.uid);
		await updateDoc(docRef, {
			photoURL: preview,
		});
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
	return (
		<>
			<form onSubmit={onSubmitProfilePhoto}>
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
				<input type="submit" value="+" />
			</form>
			<h4>Name: {userObj.username}</h4>
		</>
	);
};

export default EditProfile;