import React from "react";
import { StyleSheet, View } from "react-native";

const ContainerWithFlex = ({ children, style }) => (
  <View style={{ ...styles.container, ...style }}>{children}</View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
    paddingHorizontal: 10
  }
});

export default ContainerWithFlex;
