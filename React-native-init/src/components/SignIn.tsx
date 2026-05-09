import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { AntDesign, Fontisto, FontAwesome } from "@expo/vector-icons";

const SignIn = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [focused, setFocused] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function inputHandler(field: string, value: string) {
    setInput((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require("@/assets/expo.icon/Assets/images/Logo1.png")}
            style={styles.logo}
          />
        </View>

        {/* Heading */}
        <View style={styles.header}>
          <Text style={styles.heading}>Sign In</Text>
          <Text style={styles.subHeading}>
            Enter your credentials and sign in
          </Text>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          {/* EMAIL */}
          <Text style={styles.inputHeading}>Email address</Text>
          <View
            style={[styles.inputWrapper, focused === "email" && styles.focus]}
          >
            <Fontisto name="email" size={24} color="black" />
            <TextInput
              style={[styles.inputField]}
              value={input.email}
              onChangeText={(text) => inputHandler("email", text)}
              onFocus={() => setFocused("email")}
              onBlur={() => setFocused("")}
              placeholder="Enter your email"
            />
          </View>

          {/* PASSWORD */}
          <Text style={styles.inputHeading}>Password</Text>
          <View
            style={[
              styles.inputWrapper,
              focused === "password" && styles.focus,
            ]}
          >
            <AntDesign name="lock" size={24} color="black" />
            <TextInput
              style={styles.inputField}
              value={input.password}
              secureTextEntry={!showPassword}
              onChangeText={(text) => inputHandler("password", text)}
              onFocus={() => setFocused("password")}
              onBlur={() => setFocused("")}
              placeholder="Enter your password"
            />

            <Pressable onPress={() => setShowPassword(!showPassword)}>
              <AntDesign
                name={showPassword ? "eye" : "eye-invisible"}
                size={22}
                color="gray"
              />
            </Pressable>
          </View>

          {/* BUTTON */}
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Sign In</Text>
            <AntDesign name="arrow-right" size={15} color="white" />
          </Pressable>
        </View>

        {/* SOCIAL LOGIN */}
        <View style={styles.socialContainer}>
          <FontAwesome style={styles.authIcon} name="facebook" size={26} />
          <AntDesign style={styles.authIcon} name="google" size={26} />
          <AntDesign style={styles.authIcon} name="instagram" size={26} />
        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <Text>
            Don't have an account?
            <Text style={{ color: "rgb(47, 201, 0)" }}> Sign Up</Text>
          </Text>

          <Text style={{ color: "rgb(47, 201, 0)", marginTop: 5 }}>
            Forgot your password?
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },

  logoContainer: {
    alignItems: "center",
    marginBottom: 10,
  },

  logo: {
    width: 150,
    height: 150,
  },

  header: {
    transform: [{ translateY: -20 }],
  },

  heading: {
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold",
  },

  subHeading: {
    textAlign: "center",
    opacity: 0.5,
    marginBottom: 20,
  },

  formContainer: {
    gap: 10,
  },

  inputHeading: {
    fontSize: 14,
    fontWeight: "500",
  },

  inputField: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 12,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "transparent",
    fontSize: 16,
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "transparent",
    borderRadius: 20,
    paddingHorizontal: 10,
  },

  focus: {
    borderColor: "rgb(134, 201, 27)",
  },

  button: {
    backgroundColor: "rgb(134, 201, 27)",
    paddingVertical: 18,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    marginTop: 10,
  },

  buttonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
  },

  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
    marginTop: 20,
  },

  authIcon: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    paddingVertical: 10,
    borderRadius: 10,
    height: 50,
    width: 50,
    textAlign: "center",
  },

  footer: {
    marginTop: 25,
    alignItems: "center",
  },
});

export default SignIn;
