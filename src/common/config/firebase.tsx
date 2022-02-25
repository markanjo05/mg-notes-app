import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC4Z6VTLTJoqHBfb_E4hyq4OBSbYoOCB3M",
  authDomain: "mg-notes-app.firebaseapp.com",
  projectId: "mg-notes-app",
  storageBucket: "mg-notes-app.appspot.com",
  messagingSenderId: "176792747669",
  appId: "1:176792747669:web:7aceb7ae6d760bc592259c",
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();

export const FIREBASE_COLLECTIONS = {
  NOTES: firestore.collection("notes"),
};

export default firebase;
