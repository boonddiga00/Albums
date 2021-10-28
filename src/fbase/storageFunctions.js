import { storageService } from 'fbase/firebaseInstance';
import { ref, getDownloadURL, uploadString, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

export const uploadStringToFirebase = async (fileData, PATH, DATA_TYPE) => {
	const fileStorageRef = ref(storageService, PATH);
	await uploadString(fileStorageRef, fileData, DATA_TYPE);
	const fileUrl = await getDownloadURL(fileStorageRef);
	return fileUrl;
};

export const uploadBytesTofirebase = async (fileData, PATH) => {
	const fileStorageRef = ref(storageService, PATH);
	await uploadBytes(fileStorageRef, fileData);
	const fileUrl = await getDownloadURL(fileStorageRef);
	return fileUrl;
};

export const uploadMultipleFilesToFirebase = async (filesArray, PATH) => {
	let fileUrls = [];
	for (let i = 0; i < filesArray.length; i++) {
		const filesStorageRef = ref(storageService, PATH + '/' + uuidv4());
		await uploadBytes(filesStorageRef, filesArray[i]);
		const uploadeFileUrl = await getDownloadURL(filesStorageRef);
		fileUrls.push(uploadeFileUrl);
	}
	return fileUrls;
};