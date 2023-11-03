import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9Vbck9w53q_CRDa3A0v_720XqBazHBxY",
  authDomain: "e-commerce-c01b3.firebaseapp.com",
  projectId: "e-commerce-c01b3",
  storageBucket: "e-commerce-c01b3.appspot.com",
  messagingSenderId: "673216700002",
  appId: "1:673216700002:web:b1e43e4babad247f6afb3b",
};

const app = initializeApp(firebaseConfig);

export default app;

const storage = getStorage(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { storage, db, auth };
