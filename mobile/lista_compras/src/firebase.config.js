// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnQklgfSM9l8-YKrz0UnNaV5fFuf_M5aY",
  authDomain: "listacompras-950fe.firebaseapp.com",
  projectId: "listacompras-950fe",
  storageBucket: "listacompras-950fe.firebasestorage.app",
  messagingSenderId: "286966773236",
  appId: "1:286966773236:web:d69174da1811d689b0f5a1",
  measurementId: "G-SH09GXXQEL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);