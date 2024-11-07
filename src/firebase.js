// Import the necessary Firebase modules
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig =  {
    apiKey: "AIzaSyAk4yM7yM5v3DARsyyK3eLctwj-gueJ8F8",
    authDomain: "forum2024registration.firebaseapp.com",
    projectId: "forum2024registration",
    storageBucket: "forum2024registration.firebasestorage.app",
    messagingSenderId: "978960837269",
    appId: "1:978960837269:web:a0beea49a9f6d76e43499c",
    measurementId: "G-XHLXCS2RH0"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// // Sign in anonymously (if using anonymous authentication)
// signInAnonymously(auth)
//     .then(() => {
//         console.log("User signed in anonymously");
//     })
//     .catch((error) => {
//         console.error("Error signing in anonymously:", error);
//     });

export { db };
