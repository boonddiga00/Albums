import { dbService } from 'fbase/firebaseInstance';
import { doc, getDoc, setDoc, updateDoc, collection, addDoc } from 'firebase/firestore';

export const getUserByIdFromFirebase = async (uid) => {
	const userRef = doc(dbService, 'users', uid);
	const userSnap = await getDoc(userRef);
	const user = userSnap.data();
	return user;
};

export const setUserByIdOnFirebase = async (uid, userObj) => {
	const userRef = doc(dbService, 'users', uid);
	await setDoc(userRef, userObj);
};

export const updateUserByIdOnFirebase = async (uid, userObj) => {
	const userDbRef = doc(dbService, 'users', uid);
	await updateDoc(userDbRef, userObj);
};

export const upadateFirestoreDoc = async (PATH, updatingObj) => {
	const docRef = doc(dbService, PATH);
	await updateDoc(docRef, updatingObj);
};

export const getDocFromFirebase = async (PATH) => {
	const dataRef = doc(dbService, PATH);
	const dataSnap = await getDoc(dataRef);
	const data = await dataSnap.data();
	return data;
};

export const addDocToFirebase = async (PATH, obj) => {
	const ref = collection(dbService, PATH);
	const docRef = await addDoc(ref, obj);
	return docRef;
};

export const getMultipleData = async (arr) => {
	const dataArr = await Promise.all(arr.map((path) => getDocFromFirebase(path)));
	return dataArr;
};

export const getPopulatedUserById = async (uid) => {
	const userRef = doc(dbService, 'users', uid);
	const userSnap = await getDoc(userRef);
	const user = userSnap.data();
	const { albums } = user;
	const albumData = await getMultipleData(albums);
	user.albums = albumData;
	return user;
};