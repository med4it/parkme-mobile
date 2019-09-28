import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { DataTable } from "react-native-paper";
import ContainerWithFlex from "../styledComponents/ContainerWithFlex";

import { ParkingsContext } from "../../providers/ParkingsProvider";
import { ParkingLotRow } from "./ParkingLotRow";
import { UserContext } from "../../providers/UserProvider";
import { firebaseStore } from "../../firebase";

const ParkingDetails = ({ navigation }) => {
  const user = React.useContext(UserContext);

  const id = navigation.getParam("id");
  const parkings = React.useContext(ParkingsContext);
  const park = parkings.filter(item => item.id === id)[0];
  const { lots } = park;

  let reservation = {
    parkingId: park.id,
    price: 0
  };

  const reserveHandler = async lotId => {
    try {
      const userRef = firebaseStore.doc(`users/${user.uid}`);
      await userRef.collection("reservations").add({ ...reservation, lotId });
    } catch (error) {
      console.err("Error Adding a Reservation", error.message);
    }
  };

  return (
    <ContainerWithFlex>
      <View style={styles.parkingInfo}>
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
      </View>
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
