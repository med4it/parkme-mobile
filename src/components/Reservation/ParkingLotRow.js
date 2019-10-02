import React from "react";
import { View, Text } from "react-native";
import { DataTable, Button } from "react-native-paper";
import { smallButtonText } from "../styles";
import { StyleSheet } from "react-native";

export const ParkingLotRow = ({ id, state, reserveHandler }) => {
  let [isReserving, setIsReserving] = React.useState(false);
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
          disabled={state !== "available" || isReserving}
          onPress={async () => {
            setIsReserving(true);
            await reserveHandler(id);
            setIsReserving(false);
          }}
          loading={isReserving}
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
