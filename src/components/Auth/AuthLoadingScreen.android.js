import React from "react";
import { UserContext } from "../../providers/UserProvider";

import { PermissionsAndroid } from "react-native";

import { ActivityIndicator } from "react-native-paper";
import ContainerWithFlex from "../styledComponents/ContainerWithFlex";

const _askForLocationServices = () => {
  PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: "question",
      message:
        "Please, permit the application to get your location while you are using it."
    }
  ).then(() => {});
};

const AuthLoadingScreen = ({ navigation }) => {
  _askForLocationServices();
  const user = React.useContext(UserContext);
  console.log("authloading : user = ", user);
  React.useEffect(() => {
    if (user.isLoaded && user.isSignedIn) navigation.navigate("TabNavigator");
    else if (user.isLoaded && !user.isSignedIn) {
      navigation.navigate("SignIn");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <ContainerWithFlex>
      <ActivityIndicator />
    </ContainerWithFlex>
  );
};

export default AuthLoadingScreen;
