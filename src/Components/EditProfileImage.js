import { useState, useRef } from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { currentUserState } from 'atoms';

const EditProfileImage = ({ preview, setPreview }) => {
	const currentUser = useRecoilValueLoadable(currentUserState);
	const [isEditing, setIsEditing] = useState(false);
	const changeBtn = useRef();

	const onClickChangeBtn = (event) => {
		if (!isEditing) {
			changeBtn.current.textContent = 'Cancle';
		} else {
			changeBtn.current.textContent = 'Cancle';
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
	return (
		<div>
			{!isEditing ? (
				<img
					src={
						currentUser.contents.photoURL ||
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
			<button ref={changeBtn} onClick={onClickChangeBtn}>
				{!isEditing ? 'Change Profile Image' : 'Cancle'}
			</button>
		</div>
	);
};

export default EditProfileImage;