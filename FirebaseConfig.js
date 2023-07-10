// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0pSmClZaD7_7abIt8XaABVdou3fvjoQ4",
  authDomain: "pinterest-clone-8776b.firebaseapp.com",
  projectId: "pinterest-clone-8776b",
  storageBucket: "pinterest-clone-8776b.appspot.com",
  messagingSenderId: "233572904213",
  appId: "1:233572904213:web:84dcb895e08385b6e74d1c",
  measurementId: "G-Z918DC2LS0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);