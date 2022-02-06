import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { currentUserState, currentUserUidState, useRefreshCurrentUser } from 'atoms';
import { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { updateUserById } from 'fbase/functions/userFunctions';
import { uploadProfileImage } from 'fbase/functions/storageFunctions';
import EditProfileImage from 'Components/EditProfileImage';

const EditProfile = () => {
	const currentUserUid = useRecoilValue(currentUserUidState);
	const { contents: currentUser } = useRecoilValueLoadable(currentUserState);
	const [preview, setPreview] = useState('');
	const { register, handleSubmit } = useForm();
	const history = useHistory();
	const submitBtn = useRef();
	const refreshCurrentUser = useRefreshCurrentUser()

	const onSubmit = async ({ username, description }) => {
		const checkAnythingChanged =
			!preview && username === currentUser.username && description === currentUser.description;
		if (checkAnythingChanged) {
			return;
		}
		submitBtn.current.disabled = true;
		if (preview) {
			const uploadedProfileURL = await uploadProfileImage(currentUserUid, preview);
			await updateUserById(currentUserUid, { photoURL: uploadedProfileURL });
		}
		if (username !== currentUser.username) {
			await updateUserById(currentUserUid, { username });
		}
		if (description !== currentUser.description) {
			await updateUserById(currentUserUid, { description });
		}
		refreshCurrentUser();
		history.push(`/user/${currentUserUid}`);
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