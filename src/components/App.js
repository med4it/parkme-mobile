/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React from "react";
import { View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import AuthScreen from "./AuthScreen";
import HomeScreen from "./HomeScreen";

import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import ParkingDetails from "./ParkingDetails";

const MainNavigator = createStackNavigator({
  Home: HomeScreen,
  Parking: ParkingDetails
});

const AuthNavigator = createStackNavigator(
  {
    SignIn: AuthScreen
  },
  {
    headerMode: "none"
  }
);

const RootNavigator = createStackNavigator(
  {
    AuthNavigator: AuthNavigator,
    MainNavigator: MainNavigator
  },
  {
    headerMode: "none"
  }
);

const AppContainer = createAppContainer(RootNavigator);

const App = () => {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{ flex: 1 }}>
      <PaperProvider>
        <AppContainer />
      </PaperProvider>
    </View>
  );
};

export default App;
