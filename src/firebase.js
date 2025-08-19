import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDNVlpcekkwjFC-PiCBDpQZLDZLU1ACFkc",
  authDomain: "siva-7ada4.firebaseapp.com",
  databaseURL: "https://siva-7ada4-default-rtdb.firebaseio.com",
  projectId: "siva-7ada4",
  storageBucket: "siva-7ada4.firebasestorage.app",
  messagingSenderId: "212091890994",
  appId: "1:212091890994:web:99fdc8af4ad77e47357b2b"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();