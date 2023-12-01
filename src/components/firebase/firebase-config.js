import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
import {getDatabase} from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyBp8tvOvosSdA8W20g0gk5S0REucbErtI4",
  authDomain: "bookkart-ce86f.firebaseapp.com",
  databaseURL: "https://bookkart-ce86f-default-rtdb.firebaseio.com",
  projectId: "bookkart-ce86f",
  storageBucket: "bookkart-ce86f.appspot.com",
  messagingSenderId: "628537848548",
  appId: "1:628537848548:web:7b6412dd66c69565f432f1",
  measurementId: "G-BHRJ6QZV1T"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const db = getDatabase(app);

export {auth ,firestore ,db};