import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { globalTheme } from "../../../shared/theme/theme";
import { useTheme } from "../../../app/Providers/ThemeProvider";
import { MenuTileProps } from "../../profile/screens/ProfileScreen";
const Logout = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const MenuTile = ({
    icon,
    title,
    subtitle,
    showArrow = true,
    isDestructive = false,
    onPress,
  }: MenuTileProps) => (
    <TouchableOpacity
      style={styles.menuTile}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.iconContainer,
          isDestructive && styles.destructiveIconContainer,
        ]}
      >
        <Ionicons
          name={icon}
          size={20}
          color={isDestructive ? "#FF4B4B" : theme.colors.brand.primary}
        />
      </View>
      <View style={styles.menuTextContainer}>
        <Text
          style={[styles.menuTitle, isDestructive && styles.destructiveText]}
        >
          {title}
        </Text>
        {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
      </View>
      {showArrow && (
        <Ionicons
          name="chevron-forward"
          size={18}
          color={theme.colors.text.secondary}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <TouchableOpacity style={styles.logoutButton}>
      <MenuTile
        icon="log-out-outline"
        title="Log Out"
        showArrow={false}
        isDestructive={true}
      />
    </TouchableOpacity>
  );
};

export default Logout;

const createStyles = (theme: typeof globalTheme.light) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.surfaces.background },
    header: {
      paddingHorizontal: 24,
      paddingTop: 20,
      paddingBottom: 32,
      backgroundColor: theme.colors.surfaces.background,
    },
    profileInfo: { alignItems: "center", marginBottom: 32 },
    avatarWrapper: { position: "relative", marginBottom: 16 },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 35,
      borderWidth: 4,
      borderColor: theme.colors.surfaces.container_low,
    },
    editBadge: {
      position: "absolute",
      bottom: 0,
      right: 0,
      backgroundColor: theme.colors.brand.primary,
      width: 32,
      height: 32,
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 3,
      borderColor: theme.colors.surfaces.background,
    },
    userName: {
      fontSize: 24,
      fontWeight: "800",
      color: theme.colors.text.primary,
      fontFamily: theme.typography.font_family,
    },
    userEmail: {
      fontSize: 14,
      color: theme.colors.text.secondary,
      marginTop: 4,
    },
    membershipCard: {
      backgroundColor: theme.colors.surfaces.container_low,
      borderRadius: 24,
      padding: 20,
      borderWidth: 1,
      borderColor: theme.colors.surfaces.outline,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: theme.mode === "Dark" ? 0.2 : 0.05,
      shadowRadius: 10,
      elevation: 4,
    },
    membershipLabel: {
      fontSize: 12,
      fontWeight: "800",
      color: theme.colors.brand.primary,
      textTransform: "uppercase",
      letterSpacing: 1,
      marginBottom: 4,
    },
    pointsText: {
      fontSize: 20,
      fontWeight: "700",
      color: theme.colors.text.primary,
    },
    rowBetween: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
    },
    progressContainer: { gap: 8 },
    progressBarBg: {
      height: 8,
      backgroundColor: theme.colors.surfaces.outline,
      borderRadius: 4,
    },
    progressBarFill: {
      height: "100%",
      backgroundColor: theme.colors.brand.primary,
      borderRadius: 4,
    },
    progressText: {
      fontSize: 12,
      color: theme.colors.text.secondary,
      fontWeight: "500",
    },
    content: { paddingHorizontal: 24, paddingBottom: 40 },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "700",
      color: theme.colors.text.primary,
      marginBottom: 16,
      marginTop: 8,
    },
    menuGroup: {
      backgroundColor: theme.colors.surfaces.container_low,
      borderRadius: 20,
      padding: 8,
      borderWidth: 1,
      borderColor: theme.colors.surfaces.outline,
      marginBottom: 24,
    },
    menuTile: { flexDirection: "row", alignItems: "center", padding: 12 },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 12,
      backgroundColor: "rgba(255, 107, 53, 0.1)",
      justifyContent: "center",
      alignItems: "center",
    },
    destructiveIconContainer: { backgroundColor: "rgba(255, 75, 75, 0.1)" },
    menuTextContainer: { flex: 1, marginLeft: 16 },
    menuTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: theme.colors.text.primary,
    },
    destructiveText: { color: "#FF4B4B" },
    menuSubtitle: {
      fontSize: 12,
      color: theme.colors.text.secondary,
      marginTop: 2,
    },
    logoutButton: { marginTop: 8 },
    versionText: {
      textAlign: "center",
      color: theme.colors.text.secondary,
      fontSize: 12,
      marginTop: 16,
      opacity: 0.6,
    },
  });
