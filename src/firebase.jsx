// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAY2tlLj3wojDcXZaqfG2_o2GE9PMM5sNI",
  authDomain: "postgradsystem-e090a.firebaseapp.com",
  projectId: "postgradsystem-e090a",
  storageBucket: "postgradsystem-e090a.appspot.com",
  messagingSenderId: "961932972960",
  appId: "1:961932972960:web:346e3ad2481c0a4f5d8ac5",
  measurementId: "G-JKEYC42CPF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = getFirestore(app);

export  {db};