import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Divider, Headline } from "react-native-paper";

import moment from "moment";

export const ReservationView = ({
  parkingName,
  id,
  reservedAt,
  lotId,
  parkedAt,
  unparkedAt,
  price
}) => {
  return (
    <>
      <View style={styles.reservation}>
        <Headline>{parkingName}</Headline>
        <Text>Id : {id}</Text>
        <Text>Lot Id : {lotId}</Text>
        <Text>
          Date :{" "}
          {moment(reservedAt)
            .utcOffset("+0100")
            .format("YYYY-MM-DD HH:mm")}
        </Text>
        <Text>
          Parked at :{" "}
          {parkedAt
            ? moment(parkedAt)
                .utcOffset("+0100")
                .format("YYYY-MM-DD HH:mm")
            : "Not yet"}
        </Text>
        <Text>Unparked at : {unparkedAt ? unparkedAt : "Not yet"}</Text>
        <Text>Price : {price}</Text>
      </View>
      <Divider />
    </>
  );
};

const styles = StyleSheet.create({
  reservation: { paddingVertical: 20, paddingHorizontal: 5 }
});
