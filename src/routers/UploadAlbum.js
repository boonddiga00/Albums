import { useState } from 'react';
import { useInput } from 'Hooks';
import { db, storageService } from 'fbase';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { collection, doc, addDoc, updateDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

const UploadAlbum = ({ currentUser }) => {
	const [error, setError] = useState('');
	const [albumThumnailFile, setAlbumThumnailFile] = useState('');
	const [albumImageFiles, setAlbumImageFiles] = useState([]);
	const [title, onChangeTitle] = useInput('');
	const [description, onChangeDescription] = useInput('');
	const onChangeAlbumImage = (event) => {
		const {
			target: { files },
		} = event;
		setAlbumImageFiles(files);
	};
	const onChangeAlbumThumnail = (event) => {
		const {
			target: { files },
		} = event;
		setAlbumThumnailFile(files[0]);
	};
	const uploadThumnail = async () => {
		const thumnailStorageRef = ref(storageService, `${currentUser.uid}/album/thumnail/${uuidv4()}`);
		await uploadBytes(thumnailStorageRef, albumThumnailFile);
		const thumnailUrl = await getDownloadURL(thumnailStorageRef);
		return thumnailUrl;
	};
	const uploadAlbumImages = async () => {
		let albumImages = [];
		for (let i = 0; i < albumImageFiles.length; i++) {
			const albumImagesStorageRef = ref(
				storageService,
				`${currentUser.uid}/album/albumImage/${uuidv4()}`
			);
			await uploadBytes(albumImagesStorageRef, albumImageFiles[i]);
			const albumImageUrl = await getDownloadURL(albumImagesStorageRef);
			albumImages.push(albumImageUrl);
		}
		return albumImages;
	};
	const addAlbumToDB = async (thumnail, albumImages) => {
		const albumDbRef = collection(db, 'albums');
		const albumDbSnap = await addDoc(albumDbRef, {
			title,
			description,
			thumnail,
			albumImages,
			owner: currentUser.uid,
		});
		const { path } = albumDbSnap;
		const userDbRef = doc(db, 'users', currentUser.uid);
		const updateSnap = await updateDoc(userDbRef, { albums: [path] });
	};
	const onSubmitAlbum = async (event) => {
		event.preventDefault();
		if (!albumThumnailFile || !albumImageFiles || !title || !description) {
			setError('You should fill every Field');
			return;
		}
		const thumnail = await uploadThumnail();
		const albumImages = await uploadAlbumImages();
		await addAlbumToDB(thumnail, albumImages);
	};
	return (
		<form onSubmit={onSubmitAlbum}>
			{error && <span>{error}</span>}
			<div>
				<input onChange={onChangeAlbumThumnail} type="file" required />
				<input value={title} onChange={onChangeTitle} type="text" placeholder="Title" required />
			</div>
			<input
				value={description}
				onChange={onChangeDescription}
				type="text"
				placeholder="Description"
				required
			/>
			<input onChange={onChangeAlbumImage} type="file" multiple={true} required />
			<input type="submit" value="Make an New Album" />
		</form>
	);
};
export default UploadAlbum;