/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React from "react";

import { Provider as PaperProvider } from "react-native-paper";
import HomeMapScreen from "./HomeMapScreen";

const App = () => {
  return (
    <PaperProvider>
      <HomeMapScreen />
    </PaperProvider>
  );
};

export default App;
