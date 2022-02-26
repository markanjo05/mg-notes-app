import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

// Note: You can update this config to your firebase config details in case you want to add firebase support in this app.
const firebaseConfig = {
  apiKey: "xxx",
  authDomain: "xxx",
  projectId: "xxx",
  storageBucket: "xxx",
  messagingSenderId: "xxx",
  appId: "xxx",
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();

export const FIREBASE_COLLECTIONS = {
  NOTES: firestore.collection("notes"),
};

export default firebase;
