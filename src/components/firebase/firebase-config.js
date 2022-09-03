import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
import {getDatabase} from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyDhtXx_rtmRqA9Oi7yEytYIkkja-pcM56U",
  authDomain: "bookkart-2c7ed.firebaseapp.com",
  databaseURL: "https://bookkart-2c7ed-default-rtdb.firebaseio.com",
  projectId: "bookkart-2c7ed",
  storageBucket: "bookkart-2c7ed.appspot.com",
  messagingSenderId: "561370883905",
  appId: "1:561370883905:web:02c87a85306e37904823c0",
  measurementId: "G-P924MJP001"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const db = getDatabase(app);

export {auth ,firestore ,db};