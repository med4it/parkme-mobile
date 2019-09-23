import React, { createContext, useState, useEffect } from "react";
import { firebaseStore } from "../firebase";
import { getDataFromDoc } from "../utilities";

export const ParkingsContext = createContext();

const ParkingsProvider = ({ children }) => {
  let [parkings, setParkings] = useState([]);

  useEffect(() => {
    // Subscribe to parkings
    let unsubscribeFromParkings = firebaseStore
      .collection("parkings")
      .onSnapshot(snapshot => {
        const parkingsData = snapshot.docs.map(getDataFromDoc);
        setParkings(parkingsData);
      });

    // Cleanup function
    return () => {
      unsubscribeFromParkings();
    };
  }, []);

  return (
    <ParkingsContext.Provider value={parkings}>
      {children}
    </ParkingsContext.Provider>
  );
};

export default ParkingsProvider;
