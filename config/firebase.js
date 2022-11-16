// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import {initializeFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuus7cSVTZjHRkFTiH2K7HyyUfJ0myoHs",
  authDomain: "myhealth-9ae61.firebaseapp.com",
  projectId: "myhealth-9ae61",
  storageBucket: "myhealth-9ae61.appspot.com",
  messagingSenderId: "1018890779161",
  appId: "1:1018890779161:web:6ba0583cd7f3645c978888"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const db = initializeFirestore(app, {experimentalForceLongPolling: true})

const storage = getStorage(app)

export {app, auth, db, storage}