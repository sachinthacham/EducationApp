import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDXry66l1tqMrXMNPuuB_KDCo29E3WN6y8",
  authDomain: "educationapp-fca9a.firebaseapp.com",
  projectId: "educationapp-fca9a",
  storageBucket: "educationapp-fca9a.firebasestorage.app",
  messagingSenderId: "864763283380",
  appId: "1:864763283380:web:70ff6ece7fbe3300e014e1",
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);
