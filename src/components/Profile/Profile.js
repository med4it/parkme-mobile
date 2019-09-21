import React from "react";
import { View, StyleSheet } from "react-native";
import {
  Avatar,
  TextInput,
  Text,
  Button,
  Divider,
  Subheading
} from "react-native-paper";

import ContainerWithFlex from "../styledComponents/ContainerWithFlex";
import { buttonText, regularButton } from "../styles";
const Profile = () => {
  return (
    <ContainerWithFlex>
      <View style={styles.userInfo}>
        <View style={styles.userInfoContainer}>
          <View style={styles.avatar}>
            <Avatar.Text size={85} label="MA" />
          </View>

          <View style={styles.userDetails}>
            <Text>Mohammed Ait Haddou</Text>
            <Text>mohammedaithaddou@gmail.com</Text>
            <Subheading>Balance: 300 DH</Subheading>
          </View>
        </View>
      </View>

      <Divider />

      <View style={styles.balanceCharger}>
        <TextInput
          mode="flat"
          label="Charging Code"
          placeholder="Please, enter a charging code"
        />
        <Button mode="contained" style={regularButton}>
          <Text style={buttonText} color="white">
            Submit
          </Text>
        </Button>
      </View>
    </ContainerWithFlex>
  );
};

const styles = StyleSheet.create({
  userInfo: {
    flex: 1,
    paddingVertical: 20
  },

  balanceCharger: {
    flex: 6,
    paddingVertical: 10
  },

  userInfoContainer: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 5,
    justifyContent: "center",
    alignItems: "center"
  },

  avatar: {
    flex: 2
  },

  userDetails: {
    flex: 4
  }
});

Profile.navigationOptions = {
  title: "Profile"
};

export default Profile;
