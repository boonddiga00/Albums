import { dbService } from 'fbase/firebaseInstance';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

const USER_PATH = 'users';

const userDocumentRef = (uid) => {
	return doc(dbService, USER_PATH, uid);
};

const extractUserFromSnapshot = (userSnapshot) => {
	return userSnapshot.data();
};

export const getUserById = async (uid) => {
	const userSnapshot = await getDoc(userDocumentRef(uid));
	const user = extractUserFromSnapshot(userSnapshot);
	return user;
};

export const setUserById = async (uid, userObj) => {
	await setDoc(userDocumentRef(uid), userObj);
};

export const updateUserById = async (uid, userObj) => {
	await updateDoc(userDocumentRef(uid), userObj);
};