import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Import pour le stockage

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkxfIn-kJmegSDDd8CXMTJXGOvPGY5HZo",
  authDomain: "stage-5f64a.firebaseapp.com",
  projectId: "stage-5f64a",
  storageBucket: "stage-5f64a.firebasestorage.app",
  messagingSenderId: "839966878598",
  appId: "1:839966878598:web:a5c99c195c1768e87a1a07",
  measurementId: "G-SVE7P0QFL1",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const firestore = getFirestore(app);
const storage = getStorage(app); // Initialisation du stockage

export { db, firestore, storage };
