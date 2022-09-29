import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBiVR3osPxWzuziXxHwVYBMwQH6FFDblFo",
    authDomain: "notetakingapp-42002.firebaseapp.com",
    projectId: "notetakingapp-42002",
    storageBucket: "notetakingapp-42002.appspot.com",
    messagingSenderId: "551110930980",
    appId: "1:551110930980:web:e5bcbf2e9b4cfbac5bdeb1",
    measurementId: "G-WV3EBEVWML"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app