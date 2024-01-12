// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDeD_7b-9Ayx07rCwJ84rZml-9Is6NlLQc",
  authDomain: "employees-9b631.firebaseapp.com",
  projectId: "employees-9b631",
  storageBucket: "employees-9b631.appspot.com",
  messagingSenderId: "1000790959114",
  appId: "1:1000790959114:web:8d96ab38c22ee1618fabf3",
  measurementId: "G-R39MVEC6RL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);