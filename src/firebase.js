// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvI5RFkgimP06JhiM1ZPUb_tTv_2hND0w",
  authDomain: "jpyo-cbeda.firebaseapp.com",
  projectId: "jpyo-cbeda",
  storageBucket: "jpyo-cbeda.appspot.com",
  messagingSenderId: "1788163494",
  appId: "1:1788163494:web:e64257bc8de430a8874b67",
  measurementId: "G-606B2YTZ10"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app)
export const auth = getAuth(app)

