import * as firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyChvFr5A8U9zCiHs6xCGdCjy5B2WdTxSOQ",
    authDomain: "fir-auth-article-b9b44.firebaseapp.com",
    projectId: "fir-auth-article-b9b44",
    storageBucket: "fir-auth-article-b9b44.appspot.com",
    messagingSenderId: "749931646930",
    appId: "1:749931646930:web:5284aa064ce36ca2bb420b",
    measurementId: "${config.measurementId}"
};

// Initialize Firebase
let fireDb = 'firebase';
try {
        fireDb = firebase.initializeApp(firebaseConfig);
} catch (error) {
    // we skip the “already exists” message which is
    // not an actual error when we’re hot-reloading
    if (!/already exists/.test(error.message)) {
        console.error("Firebase initialization error raised", error.stack);
    }
}

export default fireDb.database().ref();
export const fireAuth = fireDb.auth();
export const fireStore = fireDb.firestore();
