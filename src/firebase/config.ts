import {initializeApp} from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyABmOcevdaroYE29uOGBUWm0UGUJMNog90",
	authDomain: "trips-bdc78.firebaseapp.com",
	projectId: "trips-bdc78",
	storageBucket: "trips-bdc78.appspot.com",
	messagingSenderId: "242540869322",
	appId: "1:242540869322:web:73eb91a7a7860cf1e82633"
};

// Initialize Firebase
initializeApp(firebaseConfig);

// init firestore

const db = getFirestore();

const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export {db, auth}