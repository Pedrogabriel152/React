import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAuNW4VX_0BfvR2gp8let_ep9bHdb1de_Y",
    authDomain: "curso-1493f.firebaseapp.com",
    projectId: "curso-1493f",
    storageBucket: "curso-1493f.appspot.com",
    messagingSenderId: "1053810148398",
    appId: "1:1053810148398:web:2cfcd18c6fafb73a180bbf",
    measurementId: "G-0JKN1WFXJ7"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp)

export {db, auth};