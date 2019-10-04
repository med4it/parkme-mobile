import React from "react";
import { Text, ScrollView, StyleSheet } from "react-native";

import { UserContext } from "../../providers/UserProvider";
import { firebaseStore } from "../../firebase";
import { getDataFromDoc } from "../../utilities";
import ContainerWithFlex from "../styledComponents/ContainerWithFlex";
import { ActivityIndicator } from "react-native-paper";
import { ReservationView } from "./ReservationView";

const ReservationsList = ({ reservations }) => {
  return reservations.length ? (
    reservations.map(reservation => (
      <ReservationView key={reservation.id} {...reservation} />
    ))
  ) : (
    <Text>You do not have any reservations!</Text>
  );
};

const Reservations = () => {
  const user = React.useContext(UserContext);

  let [state, setState] = React.useState({
    isLoaded: false,
    reservations: []
  });

  React.useEffect(() => {
    let unsubscribeFromReservations = firebaseStore
      .collection(`users/${user.uid}/reservations`)
      .orderBy("reservedAt", "desc")
      .onSnapshot(snapshot => {
        let reservations = snapshot.docs.map(getDataFromDoc);

        setState({ reservations, isLoaded: true });
      });

    return () => {
      unsubscribeFromReservations();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ContainerWithFlex style={styles.container}>
      {state.isLoaded ? (
        <ScrollView>
          <ReservationsList reservations={state.reservations} />
        </ScrollView>
      ) : (
        <ActivityIndicator />
      )}
    </ContainerWithFlex>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f3f3f3",
    paddingHorizontal: 0
  }
});

Reservations.navigationOptions = {
  title: "Reservations"
};

export default Reservations;
