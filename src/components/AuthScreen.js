/* eslint-disable react-native/no-inline-styles */
import React, { useState } from "react";
import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import { TextInput, Button, Divider, HelperText } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";

import { buttonText, underlinedTextButton } from "./styles";
import { firebaseAuth } from "../firebase";

const AuthScreen = ({ navigation }) => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [signInError, setSignInError] = useState("");

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height" enabled>
      <View style={styles.logoContainer}>
        <Text
          style={{
            fontSize: 50,
            textAlign: "center",
            fontWeight: "bold"
          }}
        >
          ParkMe
        </Text>
      </View>

      {/* Actions */}
      <View style={styles.cta}>
        <View>
          {Boolean(signInError.length) && (
            <HelperText type="error">{signInError}</HelperText>
          )}
        </View>
        <View style={{ height: 80 }}>
          <TextInput
            mode="flat"
            label="Email"
            value={email}
            onChangeText={text => setEmail(text)}
          />
        </View>
        <View style={{ height: 80 }}>
          <TextInput
            mode="flat"
            label="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={text => setPassword(text)}
          />
          <Text style={{ paddingVertical: 10 }}>Forgot password ?</Text>
        </View>

        <View style={{ marginVertical: 40 }}>
          <Button
            mode="contained"
            onPress={async () => {
              try {
                const {
                  user: authenticatedUser
                } = await firebaseAuth.signInWithEmailAndPassword(
                  email,
                  password
                );
                console.log(authenticatedUser);
              } catch (error) {
                setSignInError(error.message);
              }
            }}
          >
            <Text style={buttonText}>Log In</Text>
          </Button>
          <Divider style={{ marginHorizontal: 40 }} />
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: 10
          }}
        >
          <View
            style={{
              flex: 2
            }}
          >
            <Text style={{ textAlign: "center" }}>
              You don't have an account,
            </Text>
          </View>

          <View
            style={{
              flex: 1
            }}
          >
            <Button
              compact={true}
              mode="text"
              onPress={() => navigation.navigate("Register")}
            >
              <Text style={underlinedTextButton}>create one!</Text>
            </Button>
          </View>
        </View>

        <View style={{ height: 200 }}>
          <Button
            mode="contained"
            color="#cf4332"
            icon={({ size, color }) => (
              <Icon size={16} color="white" name="google" />
            )}
          >
            <Text style={buttonText}>Log in with Google</Text>
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
    </KeyboardAvoidingView>
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
    paddingVertical: 10,
    justifyContent: "center"
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

export default AuthScreen;
