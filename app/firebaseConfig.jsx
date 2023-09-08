// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAuth, signInWithCredential } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEMxqvobs-VfeoXqqcZmGwOlx7OQGbgBA",
  authDomain: "project1-b71d2.firebaseapp.com",
  projectId: "project1-b71d2",
  storageBucket: "project1-b71d2.appspot.com",
  messagingSenderId: "233895338448",
  appId: "1:233895338448:web:8d0d6358ffa625e9a819d5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)

export const storage = getStorage(app)