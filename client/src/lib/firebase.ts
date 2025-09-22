import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "sravanth-kumar.firebaseapp.com",
  projectId: "sravanth-kumar",
  storageBucket: "sravanth-kumar.firebasestorage.app",
  messagingSenderId: "805020928461",
  appId: "1:805020928461:web:3198917d7924e963569c84",
  measurementId: "G-56WXLQLRQN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Initialize Analytics (only in production)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;