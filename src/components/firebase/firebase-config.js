import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
import {getDatabase} from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyBqTzMcHJb0aCGp9a5_7A0yy4JTdU4_px0",
  authDomain: "bookkart-a52a7.firebaseapp.com",
  databaseURL: "https://bookkart-a52a7-default-rtdb.firebaseio.com",
  projectId: "bookkart-a52a7",
  storageBucket: "bookkart-a52a7.appspot.com",
  messagingSenderId: "941929603543",
  appId: "1:941929603543:web:0bb0451c0a443aad392b92",
  measurementId: "G-EPM4RD8ESM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const db = getDatabase(app);

export {auth ,firestore ,db};