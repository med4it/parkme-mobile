import React from "react";
import { StyleSheet, View } from "react-native";

const ContainerWithFlex = ({ children }) => (
  <View style={styles.container}>{children}</View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch"
  }
});

export default ContainerWithFlex;
