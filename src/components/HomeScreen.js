import React from "react";

import UserMap from "./UserMap.android";

const HomeScreen = ({ navigation }) => {
  return <UserMap navigation={navigation} />;
};

HomeScreen.navigationOptions = () => {
  return {
    title: "Home"
  };
};

export default HomeScreen;
