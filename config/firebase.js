// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0dxRja5JY1gY6itP-fliK6RmuDp2bpcU",
  authDomain: "myhealth-c09c8.firebaseapp.com",
  projectId: "myhealth-c09c8",
  storageBucket: "myhealth-c09c8.appspot.com",
  messagingSenderId: "317230272907",
  appId: "1:317230272907:web:2618f69761e017fe061f8e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

export { app, auth }