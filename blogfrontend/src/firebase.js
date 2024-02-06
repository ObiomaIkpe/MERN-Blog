// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "super-blog-51e8c.firebaseapp.com",
  projectId: "super-blog-51e8c",
  storageBucket: "super-blog-51e8c.appspot.com",
  messagingSenderId: "799729386610",
  appId: "1:799729386610:web:6ee55d948e7b5b10d42eeb",
  measurementId: "G-THGLCCXV6Q"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);