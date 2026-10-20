// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcAY94OxWEdtkFLt9MVYSQuzrjaeK3XyQ",
  authDomain: "rotina-2f602.firebaseapp.com",
  projectId: "rotina-2f602",
  storageBucket: "rotina-2f602.firebasestorage.app",
  messagingSenderId: "62942828903",
  appId: "1:62942828903:web:0e6f3026086e66e4f7f7c2",
  measurementId: "G-L7LFRGXZEX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
