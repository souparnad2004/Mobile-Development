import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  Pressable,
} from "react-native";
import { useTheme } from "../../../app/Providers/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalTheme } from "../../../shared/theme/theme";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useLogin } from "../hooks/useAuth";
import type { AuthStackParamList } from "../../../navigation/stack/AuthStack";

type NavigationType = NativeStackNavigationProp<
  AuthStackParamList,
  'Login'
>;

const LoginScreen = () => {
  const { theme } = useTheme();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const styles = createStyles(theme);

  const {mutate, isPending, error} = useLogin()

  function submitHandler() {
    mutate({
      username, password
    }
  )}

  const navigation = useNavigation<NavigationType>();

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.content}
      >
        {/* App Logo & Branding */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Ionicons
              name="restaurant"
              size={40}
              color={theme.colors.brand.primary}
            />
          </View>
          <Text style={styles.brandName}>FoodApp</Text>
          <Text style={styles.subtitle}>Welcome back to premium dining.</Text>
        </View>
        {/* Input Fields */}
        <View style={styles.form}>
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
              autoCapitalize="none"
            />
          </View>
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
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
          </TouchableOpacity>
          {/* Primary Sign In Button */}
          <TouchableOpacity style={styles.signInButton} activeOpacity={0.8} onPress={submitHandler} disabled={isPending}>
            {isPending ? <Text style={styles.signInButtonText}>Logging In...</Text> : <Text style={styles.signInButtonText}>Sign In</Text>}
            <Ionicons
              name="arrow-forward"
              size={20}
              color={theme.colors.text.on_primary}
            />
          </TouchableOpacity>
          {error && <Text style={styles.error}>{error.message}</Text>}
        </View>
        {/* Social Auth Section */}
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR CONTINUE WITH</Text>
          <View style={styles.dividerLine} />
        </View>
        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons
              name="logo-google"
              size={20}
              color={theme.colors.text.primary}
            />
            <Text style={styles.socialButtonText}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons
              name="logo-apple"
              size={20}
              color={theme.colors.text.primary}
            />
            <Text style={styles.socialButtonText}>Apple</Text>
          </TouchableOpacity>
        </View>
        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Don't have an account?
            <Text style={styles.footerLink} onPress={() => navigation.replace("Register")}>Sign Up</Text>
          </Text>
          <TouchableOpacity style={styles.guestLink}>
            <Text style={styles.guestLinkText}>Continue as Guest</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
const createStyles = (theme: typeof globalTheme.light) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.surfaces.background },
    content: { flex: 1, paddingHorizontal: 24, justifyContent: "center" },
    header: { alignItems: "center", marginBottom: 48 },
    logoContainer: {
      width: 80,
      height: 80,
      borderRadius: 24,
      backgroundColor: theme.colors.surfaces.container_low,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 4,
    },
    error: {
      color:"red",
      marginBottom: 16,
      textAlign: "center",
    },
    brandName: {
      fontSize: 32,
      fontWeight: "700",
      color: theme.colors.text.primary,
      fontFamily: theme.typography.font_family,
    },
    subtitle: {
      fontSize: 16,
      color: theme.colors.text.secondary,
      marginTop: 8,
      textAlign: "center",
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
    forgotPassword: { alignSelf: "flex-end", marginBottom: 24 },
    forgotPasswordText: {
      color: theme.colors.brand.primary,
      fontSize: 14,
      fontWeight: "600",
    },
    signInButton: {
      backgroundColor: theme.colors.brand.primary,
      height: 56,
      borderRadius: theme.shape.button,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      shadowColor: theme.colors.brand.primary,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.3,
      shadowRadius: 16,
      elevation: 8,
    },
    signInButtonText: {
      color: theme.colors.text.on_primary,
      fontSize: 18,
      fontWeight: "600",
      marginRight: 8,
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
      fontSize: 12,
      fontWeight: "600",
      letterSpacing: 1,
    },
    socialRow: { flexDirection: "row", justifyContent: "space-between" },
    socialButton: {
      flex: 0.47,
      flexDirection: "row",
      height: 56,
      borderRadius: theme.shape.button,
      borderWidth: 1,
      borderColor: theme.colors.surfaces.outline,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.surfaces.surface,
    },
    socialButtonText: {
      marginLeft: 10,
      fontSize: 16,
      fontWeight: "600",
      color: theme.colors.text.primary,
    },
    footer: { marginTop: 40, alignItems: "center" },
    footerText: { color: theme.colors.text.secondary, fontSize: 14 },
    footerLink: { color: theme.colors.brand.primary, fontWeight: "700" },
    guestLink: { marginTop: 24 },
    guestLinkText: {
      color: theme.colors.text.secondary,
      fontSize: 14,
      textDecorationLine: "underline",
    },
  });
export default LoginScreen;
