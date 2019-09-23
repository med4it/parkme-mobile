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
import { UserContext } from "../../providers/UserProvider";
import { signOut } from "../../firebase";

const Profile = ({ navigation }) => {
  const user = React.useContext(UserContext);
  console.log("User Data", user);
  let avatarLabel = user.displayName
    .split(" ")
    .map((word, index) => {
      if (index > 1) return null;
      return word[0];
    })
    .join("")
    .toUpperCase();
  return (
    <ContainerWithFlex>
      <View style={styles.userInfo}>
        <View style={styles.userInfoContainer}>
          <View style={styles.avatar}>
            <Avatar.Text size={85} label={avatarLabel} />
          </View>

          <View style={styles.userDetails}>
            <Text>{user.displayName}</Text>
            <Text>{user.email}</Text>
            <Subheading>{`Balance: ${user.balence} DH`}</Subheading>
          </View>
        </View>
      </View>

      <View>
        <Button
          mode="contained"
          color="tomato"
          onPress={async () => {
            await signOut();
            navigation.navigate("SignIn");
          }}
        >
          Log Out
        </Button>
      </View>

      <Divider />

      <View style={styles.balanceCharger}>
        <TextInput mode="flat" label="Charging Code" />
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
