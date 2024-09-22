// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAf-uZcLhKI8EEg3Z5o9aJ72fjpwu52LU",
  authDomain: "auth-firebase-f32dc.firebaseapp.com",
  projectId: "auth-firebase-f32dc",
  storageBucket: "auth-firebase-f32dc.appspot.com",
  messagingSenderId: "260028574584",
  appId: "1:260028574584:web:fd9401eaba31b23136368d",
  measurementId: "G-4VV7807LMC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
