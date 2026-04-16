// firebase-config.js

// 1. Import the Firebase tools we need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// 2. Paste your config ONLY ONE TIME here
 const firebaseConfig = {
    apiKey: "AIzaSyCjpG0uEfQOhnBoTD80cE--KInyg7rh6vQ",
    authDomain: "ap-precalc.firebaseapp.com",
    projectId: "ap-precalc",
    storageBucket: "ap-precalc.firebasestorage.app",
    messagingSenderId: "50281949647",
    appId: "1:50281949647:web:c2c0eff68b2d0fa5d24aba",
    measurementId: "G-Z5YBDNR3NZ"
  };

// 3. Initialize Firebase
const app = initializeApp(firebaseConfig);

// 4. EXPORT the initialized Auth and Database so other files can use them!
export const auth = getAuth(app);
export const db = getFirestore(app);

// Add this import to the top of firebase-config.js
import { getFirestore, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// Export it at the bottom so your quiz files can use it
export const timestamp = serverTimestamp;
