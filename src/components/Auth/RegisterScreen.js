/* eslint-disable react-native/no-inline-styles */
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ImageBackground,
  Image
} from "react-native";
import { TextInput, Button, HelperText } from "react-native-paper";
import { textInputTheme, flatButton, whiteButtonTheme } from "../styles";
import { firebaseAuth, createUserProfileDocument } from "../../firebase";

const RegisterScreen = () => {
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [signInError, setSignInError] = useState("");
  const handleRegister = async () => {
    const displayName = firstName + " " + lastName;
    const balence = 0;
    try {
      const { user } = await firebaseAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      await createUserProfileDocument(user, { displayName, balence });
    } catch (error) {
      setSignInError(error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="height"
      enabled={true}
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

        <View>
          <View>
            {Boolean(signInError.length) && (
              <HelperText type="error">{signInError}</HelperText>
            )}
          </View>
        </View>

        {/* Actions */}
        <View style={styles.cta}>
          <View style={{ height: 70 }}>
            <TextInput
              theme={textInputTheme}
              style={styles.input}
              mode="flat"
              label="First Name"
              onChangeText={text => setFirstName(text)}
            />
          </View>

          <View style={{ height: 70 }}>
            <TextInput
              theme={textInputTheme}
              style={styles.input}
              mode="flat"
              label="Last Name"
              value={lastName}
              onChangeText={text => setLastName(text)}
            />
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

          <View>
            <Button
              mode="contained"
              onPress={handleRegister}
              theme={whiteButtonTheme}
              style={flatButton}
            >
              <Text onPress={() => handleRegister()}>REGISTER</Text>
            </Button>
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

  logo: {
    width: 275,
    height: 84
  },

  logoContainer: {
    flex: 1.3,
    paddingVertical: 3,
    justifyContent: "center",
    alignItems: "center"
  },

  cta: {
    flex: 5,
    paddingHorizontal: 20,
    alignItems: "stretch"
  },

  info: {
    flex: 0.3
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "white"
  }
});

export default RegisterScreen;
