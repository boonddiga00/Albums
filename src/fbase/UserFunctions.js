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