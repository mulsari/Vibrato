// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBDAK9mt_zRdWzmZ-30jXRxk3lbg9jpzk",
  authDomain: "vibrato-c28f3.firebaseapp.com",
  projectId: "vibrato-c28f3",
  storageBucket: "vibrato-c28f3.appspot.com",
  messagingSenderId: "806195878333",
  appId: "1:806195878333:web:781e96895db993b61c9ad4",
  measurementId: "G-4T7WSXJNZ5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// const analytics = getAnalytics(app);