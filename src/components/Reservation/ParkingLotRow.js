import React from "react";
import { View, Text } from "react-native";
import { DataTable, Button } from "react-native-paper";
import { smallButtonText } from "../styles";
import { StyleSheet } from "react-native";

export const ParkingLotRow = ({ id, state, reserveHandler }) => {
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
          onPress={() => {
            reserveHandler(id);
          }}
        >
          <Text style={smallButtonText}>Reserve</Text>
        </Button>
      </View>
    </DataTable.Row>
  );
};

export const styles = StyleSheet.create({
  buttonCell: {
    justifyContent: "center",
    alignContent: "center",
    flex: 1
  }
});
