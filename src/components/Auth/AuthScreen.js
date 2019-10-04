/* eslint-disable react-native/no-inline-styles */
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";
import {
  TextInput,
  Button,
  HelperText,
  ActivityIndicator
} from "react-native-paper";

import { flatButton, textInputTheme, whiteButtonTheme } from "../styles";
import { firebaseAuth } from "../../firebase";

const AuthScreen = ({ navigation }) => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [signInError, setSignInError] = useState("");
  let [loading, setLoading] = useState(false);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="height"
      enabled={false}
    >
      <ImageBackground
        source={require("../../assets/images/bg-login.png")}
        style={{ width: "100%", height: "100%" }}
      >
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("../../assets/images/logo.png")}
          />
        </View>

        {/* Actions */}
        <View style={styles.cta}>
          <View>
            {Boolean(signInError.length) && (
              <HelperText type="error">{signInError}</HelperText>
            )}
          </View>

          <View style={{ height: 70 }}>
            <TextInput
              theme={textInputTheme}
              style={styles.input}
              autoCompleteType="email"
              keyboardType="email-address"
              textContentType="emailAddress"
              mode="flat"
              label="Email"
              value={email}
              onChangeText={text => setEmail(text)}
            />
          </View>

          <View style={{ height: 70 }}>
            <TextInput
              theme={textInputTheme}
              style={styles.input}
              autoCompleteType="password"
              textContentType="password"
              mode="flat"
              label="Password"
              secureTextEntry={true}
              value={password}
              onChangeText={text => setPassword(text)}
            />
          </View>

          <Text style={{ color: "white" }}>Forgot Password ?</Text>

          <View>
            <Button
              mode="contained"
              theme={whiteButtonTheme}
              style={flatButton}
              onPress={async () => {
                try {
                  setLoading(true);
                  await firebaseAuth.signInWithEmailAndPassword(
                    email,
                    password
                  );
                  navigation.navigate("TabNavigator");
                } catch (error) {
                  setLoading(false);
                  setSignInError(error.message);
                }
              }}
            >
              <Text>SIGN IN</Text>
            </Button>
            <ActivityIndicator animating={loading} />
          </View>

          <View style={{ alignSelf: "flex-start" }}>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text
                style={{
                  textTransform: "uppercase",
                  color: "white",
                  padding: 0,
                  margin: 0
                }}
              >
                New Account ?
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.info}>
          <Text
            style={{
              textAlign: "center",
              color: "rgba(255, 255, 255, 0.8)",
              fontSize: 13
            }}
          >
            SmartParking Mobile - IOSM - Copyright (c) 2019
          </Text>
        </View>
      </ImageBackground>
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
    flex: 2,
    alignSelf: "center",
    justifyContent: "center"
  },

  logo: {
    width: 275,
    height: 84
  },

  cta: {
    flex: 4,
    paddingHorizontal: 20,
    justifyContent: "space-between"
  },

  info: {
    flex: 2,
    justifyContent: "flex-end",
    paddingBottom: 20
  },

  input: {
    borderBottomWidth: 1,
    borderBottomColor: "white"
  }
});

export default AuthScreen;
