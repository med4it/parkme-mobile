/**
 * @format
 */

import React, { Component } from "react";

import { AppRegistry, YellowBox } from "react-native";
import App from "./src/components/App";
import { name as appName } from "./app.json";
import _ from "lodash";

class Initial extends Component {
  constructor(props) {
    super(props);
    YellowBox.ignoreWarnings(["Setting a timer"]);
    const _console = _.clone(console);
    console.warn = message => {
      if (message.indexOf("Setting a timer") <= -1) {
        _console.warn(message);
      }
    };
  }

  render() {
    return <App />;
  }
}

AppRegistry.registerComponent(appName, () => Initial);
