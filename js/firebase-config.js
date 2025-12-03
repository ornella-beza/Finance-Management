// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Your web app's Firebase configuration
// TODO: Replace with your actual Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtsGIROOr-NlE1JassSmLWjTEh-lDoHf0",
  authDomain: "finance-management-d1d1e.firebaseapp.com",
  projectId: "finance-management-d1d1e",
  storageBucket: "finance-management-d1d1e.firebasestorage.app",
  messagingSenderId: "694376200550",
  appId: "1:694376200550:web:bfb3e114a0487b964030a7",
  measurementId: "G-7C0SKRXSZJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
