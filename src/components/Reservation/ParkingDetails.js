import React from "react";
import { StyleSheet, ScrollView, Text } from "react-native";
import {
  DataTable,
  Dialog,
  Paragraph,
  Button,
  Portal
} from "react-native-paper";
import ContainerWithFlex from "../styledComponents/ContainerWithFlex";

import { ParkingsContext } from "../../providers/ParkingsProvider";
import { ParkingLotRow } from "./ParkingLotRow";
import { UserContext } from "../../providers/UserProvider";
import { firebaseStore } from "../../firebase";

const ParkingDetails = ({ navigation }) => {
  const user = React.useContext(UserContext);

  let [errorState, setErrorState] = React.useState({
    isError: false,
    message: ""
  });

  const parkingId = navigation.getParam("id");
  const parkings = React.useContext(ParkingsContext);
  const park = parkings.filter(item => item.id === parkingId)[0];
  let { lots } = park;

  let reservation = {
    parkingId,
    parkingName: park.name,
    price: 0,
    parkedAt: null,
    unparkedAt: null,
    reservedAt: null
  };

  const reserveHandler = async lotId => {
    try {
      if (user.balence < 3) {
        throw new Error("You do not have enough money to reserve");
      }
      const userRef = firebaseStore.doc(`users/${user.uid}`);
      const addedReservationRef = await userRef
        .collection("reservations")
        .add({ ...reservation, lotId });

      lots.forEach(element => {
        if (element.id === lotId) {
          element.state = "reserved";
          element.reservationId = addedReservationRef.id;
          element.reserverId = user.uid;
        }
      });

      const url = "https://europe-west1-msiosm.cloudfunctions.net/parkingData";
      let payload = {
        // Parking Id
        parkingId,
        lots
      };

      let headers = {
        "Content-Type": "application/json"
      };
      await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(payload)
      });
    } catch (error) {
      setErrorState({ isError: true, message: error.message });
    }
  };

  return (
    <ContainerWithFlex>
      <ScrollView style={styles.parkingInfo}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>
              <Text style={styles.tableTitle}>Id</Text>
            </DataTable.Title>

            <DataTable.Title>
              <Text style={styles.tableTitle}>State</Text>
            </DataTable.Title>

            <DataTable.Title>
              <Text style={styles.tableTitle}>Action</Text>
            </DataTable.Title>
          </DataTable.Header>

          {lots.length ? (
            lots.map(lot => (
              <ParkingLotRow
                key={lot.id}
                {...lot}
                reserveHandler={reserveHandler}
              />
            ))
          ) : (
            <Text>This parking does not have any available parking lots</Text>
          )}
        </DataTable>
        <Portal>
          <Dialog
            visible={errorState.isError}
            onDismiss={() => {
              setErrorState({ isError: false });
            }}
          >
            <Dialog.Title>Alert</Dialog.Title>
            <Dialog.Content>
              <Paragraph>{errorState.message}</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setErrorState({ isError: false })}>
                Ok
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </ScrollView>
    </ContainerWithFlex>
  );
};

export const styles = StyleSheet.create({
  parkingInfo: {
    flex: 1
  },

  tableTitle: { fontWeight: "bold" }
});

ParkingDetails.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam("name")
});

export default ParkingDetails;
