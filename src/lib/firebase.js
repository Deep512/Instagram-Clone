import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// import seed file

const config = {
	apiKey: "AIzaSyDB46o8EuUmgTUvOVFUhG2fIkR_6T0ChRE",
	authDomain: "instagram-clone-c6133.firebaseapp.com",
	projectId: "instagram-clone-c6133",
	storageBucket: "instagram-clone-c6133.appspot.com",
	messagingSenderId: "1052693075224",
	appId: "1:1052693075224:web:37edb1da0bdc4aad3cba6d",
};

export const firebase = Firebase.initializeApp(config);
export const { FieldValue } = Firebase.firestore;

// call the seed file
// console.log("firebase", firebase);

// export default { firebase, FieldValue };
