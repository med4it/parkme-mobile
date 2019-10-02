import React, { useState, useEffect, createContext } from "react";
import { firebaseAuth, firebaseStore } from "../firebase";
import { getDataFromDoc } from "../utilities";
export const UserContext = createContext();

const UserProvider = ({ children }) => {
  let [user, setUser] = useState({
    email: "",
    displayName: "",
    balence: "",
    isLoaded: false,
    isSignedIn: false
  });

  useEffect(() => {
    // Subscribe to auth state changes
    console.log("Subscribe to auth state changes");
    let unsubscribeFromUserFirestore = null;
    const unsubscribeFromAuth = firebaseAuth.onAuthStateChanged(
      async userAuth => {
        console.log("AUTH STATE CHANGED", userAuth);
        if (!userAuth) {
          setUser({
            email: "",
            displayName: "",
            balence: "",
            isLoaded: true,
            isSignedIn: false
          });
          return;
        }

        const userRef = firebaseStore.doc(`users/${userAuth.uid}`);
        const userSnapshot = await userRef.get();
        const isUserExists = userSnapshot.exists;

        setUser(
          isUserExists
            ? {
                ...getDataFromDoc(userSnapshot),
                isLoaded: true,
                isSignedIn: true
              }
            : null
        );

        // Subscribe to user document changes
        if (isUserExists) {
          if (unsubscribeFromUserFirestore) {
            unsubscribeFromUserFirestore();
          }
          unsubscribeFromUserFirestore = userRef.onSnapshot(snapshot => {
            setUser({ uid: snapshot.id, ...snapshot.data() });
          });
        }
      }
    );

    // Cleanup function
    return () => {
      if (unsubscribeFromAuth) {
        unsubscribeFromAuth();
      }
      if (unsubscribeFromUserFirestore) {
        unsubscribeFromUserFirestore();
      }
    };
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserProvider;
