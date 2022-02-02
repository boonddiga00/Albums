import { dbService } from 'fbase/firebaseInstance';
import { doc, getDoc, collection, addDoc, updateDoc } from 'firebase/firestore';

const albumDocumentRef = (id) => doc(dbService, `albums/${id}`);
const albumCollectionRef = () => {
	const ALBUM_COLLECTION_PATH = 'albums';
	return collection(dbService, ALBUM_COLLECTION_PATH);
};
const extractAlbumFromSnapshot = (albumSnapshot) => albumSnapshot.data();

export const addAlbum = async (albumObj) => {
	const { id } = await addDoc(albumCollectionRef(), albumObj);
	await updateDoc(albumDocumentRef(id), { id });
	return id;
};

export const getAlbumById = async (id) => {
	const albumDocumentSnapshot = await getDoc(albumDocumentRef(id));
	const album = extractAlbumFromSnapshot(albumDocumentSnapshot);
	return album;
};

export const getAlbums = async (albumUrls) => {
	const albumArr = await Promise.all(albumUrls.map((albumId) => getAlbumById(albumId)));
	return albumArr;
};