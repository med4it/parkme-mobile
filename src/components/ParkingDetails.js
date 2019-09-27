import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { DataTable, Button } from "react-native-paper";
import ContainerWithFlex from "./styledComponents/ContainerWithFlex";

import { smallButtonText } from "./styles";
import { ParkingsContext } from "../providers/ParkingsProvider";

const ParkingDetails = ({ navigation }) => {
  const id = navigation.getParam("id");
  const parkings = React.useContext(ParkingsContext);
  const park = parkings.filter(item => item.id === id)[0];
  const { lots } = park;

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
            lots.map(lot => <ParkingLotRow key={lot.id} {...lot} />)
          ) : (
            <Text>This parking does not have any available parking lots</Text>
          )}
        </DataTable>
      </View>
    </ContainerWithFlex>
  );
};

const styles = StyleSheet.create({
  parkingInfo: {
    flex: 1
  },

  tableTitle: { fontWeight: "bold" },

  buttonCell: {
    justifyContent: "center",
    alignContent: "center",
    flex: 1
  }
});

const ParkingLotRow = ({ id, state }) => {
  console.log(id, state);
  return (
    <DataTable.Row>
      <DataTable.Cell>
        <Text>{id}</Text>
      </DataTable.Cell>
      <DataTable.Cell>
        <Text>{state}</Text>
      </DataTable.Cell>

      <View style={styles.buttonCell}>
        <Button
          mode="contained"
          style={styles.reserveButton}
          disabled={state !== "available"}
        >
          <Text style={smallButtonText}>Reserve</Text>
        </Button>
      </View>
    </DataTable.Row>
  );
};

ParkingDetails.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam("name")
});

export default ParkingDetails;
