import { useRecoilValue } from 'recoil';
import { currentUserState } from 'atoms';
import { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { updateUserById } from 'fbase/functions/userFunctions';
import { uploadProfileImage } from 'fbase/functions/storageFunctions';
import EditProfileImage from 'Components/EditProfileImage';

const EditProfile = () => {
	const { currentUser } = useRecoilValue();
	const [preview, setPreview] = useState('');
	const { register, handleSubmit } = useForm();
	const history = useHistory();
	const submitBtn = useRef();

	const onSubmit = async ({ username, description }) => {
		const checkAnythingChanged =
			!preview && username === currentUser.username && description === currentUser.description;
		if (checkAnythingChanged) {
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
		// refresh user
		history.push(`/user/${uid}`);
	};

	return (
		<>
			<EditProfileImage preview={preview} setPreview={setPreview} />
			<form onSubmit={handleSubmit(onSubmit)}>
				<label htmlFor="username">Username</label>
				<input
					id="username"
					type="text"
					placeholder="Username"
					{...register('username', { value: currentUser.username })}
					defaultValue={currentUser.username}
				/>
				<label htmlFor="description">Description</label>
				<input
					id="description"
					type="text"
					placeholder="Description"
					{...register('description')}
					defaultValue={currentUser.description}
				/>
				<input ref={submitBtn} type="submit" value="Submit" />
			</form>
		</>
	);
};

export default EditProfile;