import { uploadThumnailTofirebase, uploadAlbumImagesToFirebase } from 'fbase/storageFunctions';

export const uploadAlbumToStorage = async (uid) => {
	const thumnail = await uploadThumnailTofirebase(thumanil, uid);
	const albumImages = await uploadAlbumImagesToFirebase(albumImages, uid);
}