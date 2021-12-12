import * as firebase from "firebase";
import 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyChvFr5A8U9zCiHs6xCGdCjy5B2WdTxSOQ",
    databaseURL: "https://fir-auth-article-b9b44-default-rtdb.firebaseio.com",
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

const db = firebase.firestore();
db.settings({
    timestampsInSnapshots: true,
});

const initFirebase = async () => {
    // This check prevents us from initializing more than one app.
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
};

// Gets all posts from the database in reverse chronological order.
export const getPosts = async () => {
    // Because our exported functions can be called at any time from
    // any place in our app, we need to make sure we've initialized
    // a Firebase app every time these functions are invoked.
    initFirebase();

    const posts = await firebase
        .database()
        .ref('/posts')
        .orderByChild('Id')
        .once('value')
        .then((snapshot) => {
            const snapshotVal = snapshot.val();

            const result = [];
            for (var slug in snapshotVal) {
                const post = snapshotVal[slug];
                result.push(post);
            }

            return result.reverse();
        });

    return posts;
};

/*
Retrieves the data for a single post from a given slug.
*/
export const getPostBySlug = async (slug) => {
    initFirebase();

    return await firebase
        .database()
        .ref(`/posts/${slug}`)
        .orderByChild('Id')
        .once('value')
        .then((snapshot) => snapshot.val());
};

//export default fireDb.database().ref();
const fireAuth = firebase.auth();
export {db, fireAuth};
export const fireStore = fireDb;

