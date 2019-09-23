// This import loads the firebase namespace along with all its type information.
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { firebaseConfig } from "./firebaseconfig";

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firebaseAuth = firebaseApp.auth();
export const firebaseStore = firebaseApp.firestore();

export const signOut = async () => {
  await firebaseAuth.signOut();
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const { displayName, photoURL, email } = userAuth;
  // Get a reference to the place in the database where the user might be.
  const userRef = firebaseStore.doc(`users/${userAuth.uid}`);

  // Go and fetch the document from the location
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    try {
      await userRef.set({
        displayName,
        photoURL,
        email,
        ...additionalData
      });
    } catch (error) {
      console.log("Error creating user ", error.message);
    }
  }

  return await getUserRef(userAuth.uid);
};

export const getUserRef = async uid => {
  if (!uid) return null;
  try {
    return firebaseStore.doc(`users/${uid}`);
  } catch (error) {
    console.log("error fetching the user", error.message);
  }
};
