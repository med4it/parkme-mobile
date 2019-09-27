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
import { signOut, firebaseStore } from "../../firebase";

const Profile = ({ navigation }) => {
  const user = React.useContext(UserContext);
  const { displayName, email, balence } = user;
  let [avatarLabel, setAvatarLabel] = React.useState("..");

  React.useEffect(() => {
    if (!user) {
      navigation.navigate("AuthLoading");
    }
    if (user && user.displayName)
      setAvatarLabel(
        user.displayName
          .split(" ")
          .map((word, index) => {
            if (index > 1) return null;
            return word[0];
          })
          .join("")
          .toUpperCase()
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <ContainerWithFlex>
      <View style={styles.userInfo}>
        <View style={styles.userInfoContainer}>
          <View style={styles.avatar}>
            <Avatar.Text size={85} label={avatarLabel} />
          </View>

          <View style={styles.userDetails}>
            <Text>{displayName}</Text>
            <Text>{email}</Text>
            <Subheading>{`Balance: ${balence} DH`}</Subheading>
          </View>
        </View>
      </View>

      <View>
        <Button
          mode="contained"
          color="tomato"
          onPress={async () => {
            await signOut();
            navigation.navigate("AuthLoading");
          }}
        >
          Log Out
        </Button>
      </View>

      <Divider />

      <View style={styles.balanceCharger}>
        <TextInput mode="flat" label="Charging Code" />
        <Button
          mode="contained"
          style={regularButton}
          onPress={async () => {
            try {
              const userRef = firebaseStore.doc(`users/${user.uid}`);
              let newBalence = balence + 150;
              await userRef.update({ balence: newBalence });
            } catch (error) {
              console.log(error.message);
            }
          }}
        >
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
