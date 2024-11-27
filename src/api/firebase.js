import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBldyGUOWLp7WTyfB75gtpr_4tSlagCN-A",
  authDomain: "kh-react-firebase.firebaseapp.com",
  projectId: "kh-react-firebase",
  storageBucket: "kh-react-firebase.firebasestorage.app",
  messagingSenderId: "37264675266",
  appId: "1:37264675266:web:f070e698b088e24e2e065b",
  measurementId: "G-MRL1R1M5CY",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const storage = firebase.storage();
