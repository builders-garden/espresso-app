import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "espresso-4efa0.firebaseapp.com",
  databaseURL: "https://espresso-4efa0.firebaseio.com",
  projectId: "espresso-4efa0",
  storageBucket: "espresso-4efa0.appspot.com",
  messagingSenderId: "1023619667111",
  appId: "1:1023619667111:ios:f39b07b6f3c43883c3f782",
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const firebaseFirestore = getFirestore(app);
