import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../../app/Providers/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";
import { globalTheme } from "../../../shared/theme/theme";
import { useNavigation } from "@react-navigation/native";


import type { AuthStackNavigation } from "../../../navigation/stack/AuthStack";
import { useRegister } from "../hooks/useAuth";


const RegisterScreen = () => {
  const { theme } = useTheme();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const styles = createStyles(theme);


  const {mutate, isPending, error} = useRegister();

  function submitHandler() {
    if(!agreeToTerms) {
      alert("You must agree to the terms and conditions to register.");
      return;
    }
    mutate({
      username, email, password
    })
  }

  const navigation = useNavigation<AuthStackNavigation>();
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>
              Join our community of food enthusiasts today.
            </Text>
          </View>
          {/* Registration Form */}
          <View style={styles.form}>
            {/* Full Name Input */}
            <View style={styles.inputContainer}>
              <Ionicons
                name="person-outline"
                size={20}
                color={theme.colors.text.secondary}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="username"
                placeholderTextColor={theme.colors.text.secondary}
                value={username}
                onChangeText={setUsername}
              />
            </View>
            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Ionicons
                name="mail-outline"
                size={20}
                color={theme.colors.text.secondary}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Email address"
                placeholderTextColor={theme.colors.text.secondary}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            {/* Password Input */}
            <View style={styles.inputContainer}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color={theme.colors.text.secondary}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={theme.colors.text.secondary}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color={theme.colors.text.secondary}
                />
              </TouchableOpacity>
            </View>
            {/* Terms of Service Checkbox */}
            <TouchableOpacity
              style={styles.termsRow}
              onPress={() => setAgreeToTerms(!agreeToTerms)}
              activeOpacity={0.7}
            >
              <View
                style={[styles.checkbox, agreeToTerms && styles.checkboxActive]}
              >
                {agreeToTerms && (
                  <Ionicons
                    name="checkmark"
                    size={14}
                    color={theme.colors.text.on_primary}
                  />
                )}
              </View>
              <Text style={styles.termsText}>
                I agree to the
                <Text style={styles.linkText}>Terms of Service</Text> and
                <Text style={styles.linkText}>Privacy Policy</Text>
              </Text>
            </TouchableOpacity>
            {/* Sign Up Button */}
            <TouchableOpacity style={styles.signUpButton} activeOpacity={0.8} onPress={submitHandler} disabled={isPending}>
              {isPending ? <Text style={styles.signUpButtonText}>Registering...</Text> : <Text style={styles.signUpButtonText}>Sign Up</Text>}
            </TouchableOpacity>

            {error && <Text style={styles.error}>{error.message}</Text>}
          </View>
          {/* Social Auth Section */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR SIGN UP WITH</Text>
            <View style={styles.dividerLine} />
          </View>
          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons
                name="logo-google"
                size={20}
                color={theme.colors.text.primary}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons
                name="logo-apple"
                size={20}
                color={theme.colors.text.primary}
              />
            </TouchableOpacity>
          </View>
          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Already have an account?
              <Text style={styles.footerLink} onPress={() => navigation.replace("Login")}>Sign In</Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
const createStyles = (theme: typeof globalTheme.light) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.surfaces.background },
    content: { paddingHorizontal: 24, paddingTop: 40, paddingBottom: 24 },
    header: { marginBottom: 40 },
    title: {
      fontSize: 32,
      fontWeight: "700",
      color: theme.colors.text.primary,
      fontFamily: theme.typography.font_family,
    },
    error: {
      color: "red",
      marginBottom: 16,
      textAlign: "center",
    },
    subtitle: {
      fontSize: 16,
      color: theme.colors.text.secondary,
      marginTop: 8,
      lineHeight: 24,
    },
    form: { width: "100%" },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.colors.surfaces.container_low,
      borderWidth: 1,
      borderColor: theme.colors.surfaces.outline,
      borderRadius: theme.shape.input,
      paddingHorizontal: 16,
      marginBottom: 16,
      height: 56,
    },
    inputIcon: { marginRight: 12 },
    input: { flex: 1, color: theme.colors.text.primary, fontSize: 16 },
    termsRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 32,
      marginTop: 8,
    },
    checkbox: {
      width: 20,
      height: 20,
      borderRadius: 6,
      borderWidth: 2,
      borderColor: theme.colors.surfaces.outline,
      marginRight: 12,
      justifyContent: "center",
      alignItems: "center",
    },
    checkboxActive: {
      backgroundColor: theme.colors.brand.primary,
      borderColor: theme.colors.brand.primary,
    },
    termsText: {
      flex: 1,
      fontSize: 14,
      color: theme.colors.text.secondary,
      lineHeight: 20,
    },
    linkText: { color: theme.colors.brand.primary, fontWeight: "600" },
    signUpButton: {
      backgroundColor: theme.colors.brand.primary,
      height: 56,
      borderRadius: theme.shape.button,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: theme.colors.brand.primary,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.3,
      shadowRadius: 16,
      elevation: 8,
    },
    signUpButtonText: {
      color: theme.colors.text.on_primary,
      fontSize: 18,
      fontWeight: "600",
    },
    dividerContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 32,
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: theme.colors.surfaces.outline,
    },
    dividerText: {
      marginHorizontal: 16,
      color: theme.colors.text.secondary,
      fontSize: 11,
      fontWeight: "700",
      letterSpacing: 1,
    },
    socialRow: { flexDirection: "row", justifyContent: "center", gap: 16 },
    socialButton: {
      width: 80,
      height: 56,
      borderRadius: theme.shape.button,
      borderWidth: 1,
      borderColor: theme.colors.surfaces.outline,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.surfaces.surface,
    },
    footer: { marginTop: 40, alignItems: "center" },
    footerText: { color: theme.colors.text.secondary, fontSize: 14 },
    footerLink: { color: theme.colors.brand.primary, fontWeight: "700" },
  });
export default RegisterScreen;
