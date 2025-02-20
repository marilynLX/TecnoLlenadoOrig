// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQspLphD1qDFuPMzACiJnUXO7x8dFTO8o",
  authDomain: "tecnollenado-fbac1.firebaseapp.com",
  projectId: "tecnollenado-fbac1",
  storageBucket: "tecnollenado-fbac1.firebasestorage.app",
  messagingSenderId: "583352936875",
  appId: "1:583352936875:web:fafd2400c000aef43a0aee",
  measurementId: "G-61SXB1B33F"
};

// inicializa firebase
export const firebase = initializeApp(firebaseConfig);
//firebase se consume en toda la aplicacion para consumir la base de datos
export const auth = getAuth(firebase);