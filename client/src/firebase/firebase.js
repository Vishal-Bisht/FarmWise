import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
// Replace with your actual Firebase config from the Firebase Console
const firebaseConfig = {
   apiKey: "AIzaSyDWCuctXf3O0sv51n4lO1MMXgkEKktQcys",
  authDomain: "farmwise-7bf9e.firebaseapp.com",
  projectId: "farmwise-7bf9e",
  storageBucket: "farmwise-7bf9e.firebasestorage.app",
  messagingSenderId: "975455221703",
  appId: "1:975455221703:web:c3ba7a72f5f438eba9cbe2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;