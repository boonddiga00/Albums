import { storageService } from 'fbase/firebaseInstance';
import { ref, getDownloadURL, uploadString, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

const attachUidToPath = (uid, PATH) => `${uid}/` + PATH;
const makeUniquePath = (PATH) => PATH + `/${uuidv4()}`;

const makeStoragePath = (uid, PATH) => {
	const UID_PATH = attachUidToPath(uid, PATH);
	const STORAGE_PATH = makeUniquePath(UID_PATH);
	return STORAGE_PATH;
};

const storageRef = (STORAGE_PATH) => ref(storageService, STORAGE_PATH);

export const uploadProfileImage = async (uid, profileImage) => {
	const PROFILE_PATH = 'profile';
	const PROFILE_STORAGE_PATH = makeStoragePath(uid, PROFILE_PATH);
	const profileStorageRef = storageRef(PROFILE_STORAGE_PATH);
	await uploadString(profileStorageRef, profileImage, 'data_url');
	const profileFileUrl = await getDownloadURL(profileStorageRef);
	return profileFileUrl;
};

export const uploadThumnail = async (uid, thumnail) => {
	const THUMNAIL_PATH = 'album/thumnail';
	const THUMNAIL_STORAGE_PATH = makeStoragePath(uid, THUMNAIL_PATH);
	const thumnailStorageRef = storageRef(THUMNAIL_STORAGE_PATH);
	await uploadBytes(thumnailStorageRef, thumnail);
	const thumnailFileUrl = await getDownloadURL(thumnailStorageRef);
	return thumnailFileUrl;
};

export const uploadAlbumImages = async (uid, albumImages) => {
	const ALBUM_IMAGE_PATH = 'album/albumImage';

	const albumArray = [...albumImages];
	const uploadAblumImages = async () =>
		await Promise.all(
			albumArray.map(async (albumImage) => {
				const ALBUM_IMAGE_STORAGE_PATH = makeStoragePath(uid, ALBUM_IMAGE_PATH);
				const albumStorageRef = storageRef(ALBUM_IMAGE_STORAGE_PATH);
				await uploadBytes(albumStorageRef, albumImage);
				const albumFileUrl = await getDownloadURL(albumStorageRef);
				return albumFileUrl;
			})
		);
	const albumImageUrls = await uploadAblumImages();
	return albumImageUrls;
};