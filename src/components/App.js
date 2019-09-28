/* eslint-disable react-native/no-inline-styles */
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
import Icon from "react-native-vector-icons/FontAwesome";

import AuthScreen from "./Auth/AuthScreen";
import HomeScreen from "./Home/HomeScreen";

import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import ParkingDetails from "./Reservation/ParkingDetails";
import Reservations from "./Reservation/Reservations";
import Profile from "./Profile/Profile";
import RegisterScreen from "./Auth/RegisterScreen";
import ParkingsProvider from "../providers/ParkingsProvider";
import AuthLoadingScreen from "./Auth/AuthLoadingScreen";
import UserProvider from "../providers/UserProvider";

const HomeNavigator = createStackNavigator({
  Home: HomeScreen,
  Parking: ParkingDetails
});

const AuthNavigator = createStackNavigator(
  {
    SignIn: AuthScreen,
    Register: RegisterScreen
  },
  {
    headerMode: "none"
  }
);

const MainNavigator = createStackNavigator(
  {
    HomeNavigator: HomeNavigator
  },
  {
    headerMode: "none"
  }
);

const ReservationsStack = createStackNavigator({
  Reservations: Reservations
});

const ProfileStack = createStackNavigator({
  Profile: Profile
});

const TabNavigator = createMaterialBottomTabNavigator(
  {
    Main: MainNavigator,
    Reservations: ReservationsStack,
    Profile: ProfileStack
  },
  {
    initialRouteName: "Main",
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Main") iconName = "home";
        else if (routeName === "Reservations") iconName = "flag-checkered";
        else if (routeName === "Profile") iconName = "user-o";

        return <Icon size={16} color="white" name={iconName} />;
      }
    })
  }
);

const Navigator = () => {
  const AppContainer = createAppContainer(
    createSwitchNavigator(
      {
        AuthLoading: { screen: AuthLoadingScreen },
        Auth: { screen: AuthNavigator },
        TabNavigator: { screen: TabNavigator }
      },
      { initialRouteName: "AuthLoading" }
    )
  );

  return <AppContainer />;
};

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <ParkingsProvider>
        <PaperProvider>
          <UserProvider>
            <Navigator />
          </UserProvider>
        </PaperProvider>
      </ParkingsProvider>
    </View>
  );
};

export default App;
