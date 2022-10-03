// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider ,getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUaNVawJJCOf-O1XQb3nrdQz78GPjqM_A",
  authDomain: "re-audio-recording-16589.firebaseapp.com",
  projectId: "re-audio-recording-16589",
  storageBucket: "re-audio-recording-16589.appspot.com",
  messagingSenderId: "209254203747",
  appId: "1:209254203747:web:e83155490aca50e1fa5356"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const authentication = getAuth(app);
export const provider = new GoogleAuthProvider();