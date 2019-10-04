import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { colors } from "../styles";
import Icon from "react-native-vector-icons/Entypo";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import { styles } from "./ReservationView";
export const IconText = ({ iconName, text, iconner, color }) => {
  let iconnerProps = {
    name: iconName,
    size: 22,
    color: color ? color : colors.veryLightGrey,
    style: { paddingRight: 5 }
  };
  let FancyIcon;
  if (iconner === "Entypo") {
    FancyIcon = <Icon {...iconnerProps} />;
  } else if (iconner === "AntDesign") {
    FancyIcon = <AntDesignIcon {...iconnerProps} />;
  }
  return (
    <View style={styles.row}>
      {iconName && FancyIcon}
      <Text style={styles.smallLightText}>{text}</Text>
    </View>
  );
};
