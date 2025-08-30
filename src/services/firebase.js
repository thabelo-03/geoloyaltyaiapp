// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"; 

const firebaseConfig = {
  apiKey: "AIzaSyCfqG6L7O5qaYqMJGmUFJMOwuwNTCOG734",
  authDomain: "geoloyaltyai.firebaseapp.com",
  databaseURL: "https://geoloyaltyai-default-rtdb.firebaseio.com", 
  projectId: "geoloyaltyai",
  storageBucket: "geoloyaltyai.firebasestorage.app",
  messagingSenderId: "360128414769",
  appId: "1:360128414769:web:8d91e2703058f8ba4a4110",
  measurementId: "G-T5HJ18QZCF"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getDatabase(app); // ✅ Realtime DB instance

export { auth, db };
