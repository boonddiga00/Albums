import { storageService } from 'fbase/firebaseInstance';
import { ref, getDownloadURL, uploadString, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

export const uploadProfileImageToFirebase = async (uid, fileData, DATA_TYPE) => {
	const fileStorageRef = ref(storageService, `${uid}/profile/main`);
	await uploadString(fileStorageRef, fileData, DATA_TYPE);
	const fileUrl = await getDownloadURL(fileStorageRef);
	return fileUrl;
};

export const uploadThumnailTofirebase = async (fileData, uid) => {
	const fileStorageRef = ref(storageService, `${uid}/album/thumnail/${uuidv4()}`);
	await uploadBytes(fileStorageRef, fileData);
	const fileUrl = await getDownloadURL(fileStorageRef);
	return fileUrl;
};

export const uploadAlbumImagesToFirebase = async (fileList, uid) => {
	const filesArray = [...fileList];
	const fileUrls = await Promise.all(
		filesArray.map(async (file) => {
			const filesStorageRef = ref(storageService, `${uid}/album/albumImage/${uuidv4()}`);
			await uploadBytes(filesStorageRef, file);
			return getDownloadURL(filesStorageRef);
		})
	);
	return fileUrls;
};