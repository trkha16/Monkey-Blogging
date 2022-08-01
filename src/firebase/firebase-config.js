import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBCrZyWKPen8f_p8bf4lTnYoixXPAqRqiQ",
    authDomain: "monkey-blogging-831a5.firebaseapp.com",
    projectId: "monkey-blogging-831a5",
    storageBucket: "monkey-blogging-831a5.appspot.com",
    messagingSenderId: "765290301314",
    appId: "1:765290301314:web:8f0319cceb73493fa1b19b",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
