import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Web app's Firebase configuration
const firebaseConfig = {
	apiKey: REACT_APP_APIKEY,
	authDomain: REACT_APP_AUTH_DOMAIN,
	projectId: REACT_APP_PROJECT_ID,
	storageBucket: REACT_APP_STORAGE_BUCKET,
	messagingSenderId: REACT_APP_MESSAGING_SENDER_ID,
	appId: REACT_APP_APP_ID,
};

// Initialize Firebase
const firebaseInstance = initializeApp(firebaseConfig);
export const authService = getAuth();