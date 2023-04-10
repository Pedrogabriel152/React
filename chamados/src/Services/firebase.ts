import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCoYTXe6V-y1e19GGDvPw339kSlVIYehR0",
    authDomain: "chamados-2d84b.firebaseapp.com",
    projectId: "chamados-2d84b",
    storageBucket: "chamados-2d84b.appspot.com",
    messagingSenderId: "446218330684",
    appId: "1:446218330684:web:6fd088447aca68c047d939",
    measurementId: "G-CZHS6HW801"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);

export {db, auth, storage};
