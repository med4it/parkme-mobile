/* eslint-disable react-native/no-inline-styles */
import React, { useState } from "react";
import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import { TextInput, Button, HelperText } from "react-native-paper";
import { buttonText } from "./styles";
import { firebaseAuth, createUserProfileDocument } from "../firebase";

const RegisterScreen = ({ navigation }) => {
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

      <View>
        <View>
          {Boolean(signInError.length) && (
            <HelperText type="error">{signInError}</HelperText>
          )}
        </View>
      </View>

      {/* Actions */}
      <View style={styles.cta}>
        <View>
          <TextInput
            mode="flat"
            label="First Name"
            value={firstName}
            onChangeText={text => setFirstName(text)}
          />

          <TextInput
            mode="flat"
            label="Last Name"
            value={lastName}
            onChangeText={text => setLastName(text)}
          />

          <TextInput
            mode="flat"
            label="Email"
            value={email}
            onChangeText={text => setEmail(text)}
          />

          <TextInput
            mode="flat"
            label="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={text => setPassword(text)}
          />
        </View>

        <View>
          <Button mode="contained" onPress={handleRegister}>
            <Text style={buttonText} onPress={() => handleRegister()}>
              Register
            </Text>
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

export default RegisterScreen;
