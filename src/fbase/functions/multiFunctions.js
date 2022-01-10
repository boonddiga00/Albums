import { dbService } from 'fbase/firebaseInstance';
import { doc, updateDoc, deleteDoc, arrayRemove } from 'firebase/firestore';
import { getUserById } from 'fbase/functions/userFunctions';
import { getAlbumById } from 'fbase/functions/albumFunctions';

export const getPopulatedUserById = async (uid) => {
	const getAlbums = async (albums) => {
		const albumArr = await Promise.all(albums.map((albumId) => getAlbumById(albumId)));
		return albumArr;
	};
	const user = await getUserById(uid);
	const albumData = await getAlbums(user.albums);
	user.albums = albumData;
	return user;
};

export const deleteAlbum = async (albumId, userId) => {
	const albumRef = doc(dbService, 'albums', albumId);
	const userRef = doc(dbService, 'users', userId);
	await deleteDoc(albumRef);
	await updateDoc(userRef, { albums: arrayRemove(albumId) });
};