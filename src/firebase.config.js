import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCgBX1zJSTX5cgmok-7zeglLfW_hLpsU8M",
  authDomain: "arfoz-a0a9f.firebaseapp.com",
  projectId: "arfoz-a0a9f",
  storageBucket: "arfoz-a0a9f.firebasestorage.app",
  messagingSenderId: "121473616102",
  appId: "1:121473616102:web:0077e018204690586d1327",
  measurementId: "G-H9WGJKW3K2"
};

export default firebaseConfig
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);