import React from "react";
import { UserContext } from "../providers/UserProvider";

import { ActivityIndicator } from "react-native-paper";
import ContainerWithFlex from "./styledComponents/ContainerWithFlex";

const AuthLoadingScreen = ({ navigation }) => {
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
