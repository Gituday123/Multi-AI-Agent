// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "airt-4001f.firebaseapp.com",
  projectId: "airt-4001f",
  storageBucket: "airt-4001f.firebasestorage.app",
  messagingSenderId: "111608142438",
  appId: "1:111608142438:web:9bb3e9e08ed3568f55aba7",
  measurementId: "G-3QPTVNN3CL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
