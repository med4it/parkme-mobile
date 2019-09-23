import React, { useState, useEffect, createContext } from "react";
import { createUserProfileDocument, firebaseAuth } from "../firebase";
export const UserContext = createContext();

const UserProvider = ({ children }) => {
  let [user, setUser] = useState();

  useEffect(() => {
    // Subscribe to auth state changes
    let unsubscribeFromUserFirestore = null;
    const unsubscribeFromAuth = firebaseAuth.onAuthStateChanged(
      async userAuth => {
        let { uid, displayName, email, photoURL } = userAuth;
        const userRef = await createUserProfileDocument({
          uid,
          displayName,
          email,
          photoURL
        });

        if (unsubscribeFromUserFirestore) {
          unsubscribeFromUserFirestore();
        }

        setUser({ uid, displayName, email, photoURL });

        // Subscribe to user document changes
        if (userRef) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserProvider;
