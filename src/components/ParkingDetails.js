import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { DataTable, Button, Divider } from "react-native-paper";
import ContainerWithFlex from "./styledComponents/ContainerWithFlex";

import { smallButtonText } from "./styles";

const ParkingDetails = () => {
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

          <DataTable.Row>
            <DataTable.Cell>
              <Text>1</Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text>Occupied</Text>
            </DataTable.Cell>

            <View style={styles.buttonCell}>
              <Button mode="contained" style={styles.reserveButton} disabled>
                <Text style={smallButtonText}>Reserve</Text>
              </Button>
            </View>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>
              <Text>2</Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text>Reserved</Text>
            </DataTable.Cell>

            <View style={styles.buttonCell}>
              <Button mode="contained" style={styles.reserveButton} disabled>
                <Text style={smallButtonText}>Reserve</Text>
              </Button>
            </View>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>
              <Text>3</Text>
            </DataTable.Cell>

            <DataTable.Cell>
              <Text>Available</Text>
            </DataTable.Cell>

            <View style={styles.buttonCell}>
              <Button mode="contained" style={styles.reserveButton}>
                <Text style={smallButtonText}>Reserve</Text>
              </Button>
            </View>
          </DataTable.Row>
        </DataTable>
      </View>

      <Divider />

      <View style={styles.parkingCta}>
        <Button style={styles.ctaButton} mode="contained">
          <Text>Get Directions on Map</Text>
        </Button>
      </View>
    </ContainerWithFlex>
  );
};

const styles = StyleSheet.create({
  parkingInfo: {
    flex: 4
  },

  parkingCta: {
    flex: 1,
    paddingHorizontal: 5,
    justifyContent: "center",
    alignItems: "center"
  },

  ctaButton: {
    marginVertical: 5
  },

  tableTitle: { fontWeight: "bold" },

  reserveButton: {},

  buttonCell: {
    justifyContent: "center",
    alignContent: "center",
    flex: 1
  }
});

export default ParkingDetails;
