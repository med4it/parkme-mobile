/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { TextInput, Button, Divider } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";

const App = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text
          style={{
            fontSize: 50,
            textAlign: "center",
            fontWeight: "bold",
            color: "steelblue"
          }}
        >
          ParkMe
        </Text>
      </View>

      {/* Actions */}
      <View style={styles.cta}>
        <View style={{ height: 70 }}>
          <TextInput
            placeholder="Please, type your email address"
            mode="outlined"
            label="Email"
          />
        </View>
        <View style={{ height: 70 }}>
          <TextInput
            placeholder="Please, type your password"
            mode="outlined"
            label="Password"
            secureTextEntry={true}
          />
          <Text style={{ paddingVertical: 10 }}>Forgot password ?</Text>
        </View>

        <View style={{ marginVertical: 40 }}>
          <Button mode="contained">
            <Text>Sign In</Text>
          </Button>
        </View>

        <Divider style={{ marginHorizontal: 40 }} />

        <View>
          <Text
            style={{
              textAlign: "center",
              color: "#555",
              fontSize: 17,
              marginVertical: 14
            }}
          >
            You do not have an account, create one!
          </Text>

          <Button
            mode="contained"
            color="#cf4332"
            icon={({ size, color }) => (
              <Icon size={16} color="white" name="google" />
            )}
          >
            Log in with Google
          </Button>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.info}>
        <Text
          style={{
            textAlign: "center",
            color: "#555",
            fontSize: 13
          }}
        >
          ParkMe Mobile - Copyright (c) 2019
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch"
  },

  logoContainer: {
    flex: 1.3,
    paddingVertical: 10
  },

  cta: {
    flex: 5,
    paddingHorizontal: 20,
    alignItems: "stretch"
  },

  info: {
    flex: 0.3
  }
});

export default App;
