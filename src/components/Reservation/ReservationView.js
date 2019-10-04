import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Colors, Button } from "react-native-paper";

import { colors } from "../styles";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import { IconText } from "./IconText";
import { formatDate } from "../../utilities";

export const ReservationView = ({
  parkingName,
  id,
  reservedAt,
  lotId,
  parkedAt,
  unparkedAt,
  price
}) => {
  const parkedAtText = parkedAt ? formatDate(parkedAt) : "Not yet";
  const unParkedAtText = unparkedAt ? formatDate(unparkedAt) : "Not yet";
  return (
    <>
      <View style={styles.reservation}>
        <View style={styles.reservationHeader}>
          <View>
            <IconText
              iconner="Entypo"
              text={`${parkingName} - slot #${lotId}`}
            />
          </View>
          <View>
            <IconText
              iconner="Entypo"
              iconName="calendar"
              text={formatDate(reservedAt)}
            />
          </View>
        </View>

        {/* Reservation Id    */}
        <View style={styles.row}>
          <View style={styles.title}>
            <Text style={styles.primaryText}>Reservation id : </Text>
          </View>

          <View style={styles.content}>
            <Text style={styles.blueText}>{id}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <IconText
            iconner="AntDesign"
            iconName="caretright"
            color="green"
            text={`Parked at : ${parkedAtText}`}
          />
        </View>

        <View style={styles.row}>
          <IconText
            iconner="AntDesign"
            iconName="caretleft"
            color="red"
            text={`Unparked at : ${unParkedAtText}`}
          />
        </View>

        <View style={styles.reservationFooter}>
          <View>
            <IconText
              iconner="Entypo"
              iconName="price-tag"
              color={Colors.blue}
              textColor="red"
              text={`Price : ${price} DH`}
            />
          </View>

          {!parkedAt && (
            <View>
              <Button color="red" mode="outlined" compact={true}>
                <FontAwesome name="remove" color="red" size={16} />
                <Text>Cancel</Text>
              </Button>
            </View>
          )}
        </View>
      </View>
    </>
  );
};

export const styles = StyleSheet.create({
  reservationHeader: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 5
  },
  reservation: {
    marginVertical: 6,
    paddingHorizontal: 20,
    paddingVertical: 3,
    marginHorizontal: 8,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#ccc",
    elevation: 2
  },
  primaryText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.blue,
    paddingRight: 10
  },
  blueText: {
    fontSize: 16,
    color: colors.blue
  },

  smallLightText: {
    color: colors.lightGrey,
    fontSize: 14
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  reservationFooter: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    justifyContent: "space-between",
    marginTop: 4
  }
});
