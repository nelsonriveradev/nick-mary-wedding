// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzlkUpaRUspzFwuHFy1DRTyPKIqWubuCk",
  authDomain: "nick-mariel-wedding.firebaseapp.com",
  projectId: "nick-mariel-wedding",
  storageBucket: "nick-mariel-wedding.firebasestorage.app",
  messagingSenderId: "215135550910",
  appId: "1:215135550910:web:3b43e11fd8fcac298e0def",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
