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

// import { initializeApp } from "firebase/app";
// import { getDatabase } from "firebase/database";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyBcM3lueR5tIYBtE4Ley2Kp0fXIqq15nWs",
//   authDomain: "lilee-8d29d.firebaseapp.com",
//   projectId: "lilee-8d29d",
//   storageBucket: "lilee-8d29d.firebasestorage.app",
//   messagingSenderId: "393342285004",
//   appId: "1:393342285004:web:2de2cfc11e44bee8603e69",
//   measurementId: "G-PQVNEH6C9M",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getDatabase(app);
// const firestore = getFirestore(app);
// const storage = getStorage(app);

// export { db, firestore, storage };
