import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  Dimensions,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../../app/Providers/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";
import { globalTheme } from "../../../shared/theme/theme";
const { width } = Dimensions.get("window");
const CUISINES = [
  { id: "1", name: "All", icon: "apps-outline" },
  { id: "2", name: "Pizza", icon: "pizza-outline" },
  { id: "3", name: "Burger", icon: "fast-food-outline" },
  { id: "4", name: "Sushi", icon: "fish-outline" },
  { id: "5", name: "Dessert", icon: "ice-cream-outline" },
];
const RESTAURANTS = [
  {
    id: "1",
    name: "The Pizza Lab",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    time: "30-45 min",
    tags: ["Artisan Wood-fired", "Italian"],
    deliveryFee: "$2.99",
    isFavorite: true,
  },
  {
    id: "2",
    name: "Burger House",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    time: "20-30 min",
    tags: ["Gourmet Burgers", "American"],
    deliveryFee: "Free",
    isFavorite: false,
  },
];
const HomeScreen = () => {
  const { theme } = useTheme();
  const [selectedCuisine, setSelectedCuisine] = useState("1");
  const styles = createStyles(theme);


  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <View>
          <Text style={styles.deliveryLabel}>Delivering to</Text>
          <TouchableOpacity style={styles.locationRow}>
            <Ionicons
              name="location"
              size={16}
              color={theme.colors.brand.primary}
            />
            <Text style={styles.locationText}>Delivery Address</Text>
            <Ionicons
              name="chevron-down"
              size={16}
              color={theme.colors.text.primary}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <Ionicons
            name="person-circle"
            size={32}
            color={theme.colors.text.primary}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color={theme.colors.text.secondary} />
        <TextInput
          placeholder="Search for gourmet dishes..."
          placeholderTextColor={theme.colors.text.secondary}
          style={styles.searchInput}
        />
        <TouchableOpacity>
          <Ionicons
            name="options-outline"
            size={20}
            color={theme.colors.brand.primary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderPromoBanner = () => (
    <View style={styles.promoContainer}>
      <View style={styles.promoContent}>
        <View style={styles.promoBadge}>
          <Text style={styles.promoBadgeText}>EXCLUSIVE OFFER</Text>
        </View>
        <Text style={styles.promoTitle}>50% off your first{"\n"}order</Text>
      </View>
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
        }}
        style={styles.promoImage}
      />
    </View>
  );

  const renderCuisines = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Cuisine</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cuisineList}
      >
        {CUISINES.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => setSelectedCuisine(item.id)}
            style={[
              styles.cuisineChip,
              selectedCuisine === item.id && styles.cuisineChipActive,
            ]}
          >
            <Text
              style={[
                styles.cuisineText,
                selectedCuisine === item.id && styles.cuisineTextActive,
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
  
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
      >
        {renderHeader()}
        <View style={styles.content}>
         {renderPromoBanner()}
         {renderCuisines()}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Curated Selections</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          {RESTAURANTS.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.restaurantCard}
              activeOpacity={0.9}
            >
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.restaurantImage}
                />
                <View style={styles.timeBadge}>
                  <Text style={styles.timeText}>{item.time}</Text>
                </View>
                <TouchableOpacity style={styles.favButton}>
                  <Ionicons
                    name={item.isFavorite ? "heart" : "heart-outline"}
                    size={22}
                    color={
                      item.isFavorite ? theme.colors.brand.primary : "#FFF"
                    }
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.cardInfo}>
                <View style={styles.rowBetween}>
                  <Text style={styles.restaurantName}>{item.name}</Text>
                  <View style={styles.ratingRow}>
                    <Ionicons name="star" size={16} color="#FFB347" />
                    <Text style={styles.ratingText}>{item.rating}</Text>
                  </View>
                </View>
                <Text style={styles.tagsText}>{item.tags.join(" • ")}</Text>
                <View style={styles.rowBetween}>
                  <View style={styles.deliveryRow}>
                    <Ionicons
                      name="bicycle"
                      size={16}
                      color={theme.colors.text.secondary}
                    />
                    <Text style={styles.deliveryText}>
                      {item.deliveryFee} Delivery
                    </Text>
                  </View>
                  <TouchableOpacity style={styles.viewMenuButton}>
                    <Text style={styles.viewMenuText}>View Menu</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const createStyles = (theme: typeof globalTheme.light) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.surfaces.background },
    header: {
      backgroundColor: theme.colors.surfaces.background,
      paddingHorizontal: 24,
      paddingBottom: 16,
      paddingTop: 8,
    },
    headerTop: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
    },
    deliveryLabel: {
      fontSize: 12,
      color: theme.colors.text.secondary,
      marginBottom: 4,
    },
    profileButton: {
      width: 44,
      height: 44,
      borderRadius: 14, 
      backgroundColor: theme.colors.surfaces.container_low,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: theme.colors.surfaces.outline,

      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: theme.mode === "Dark" ? 0.3 : 0.08,
      shadowRadius: 10,
      elevation: 3,
    },
    profileIcon: {
      color: theme.colors.text.primary,
    },
    locationRow: { flexDirection: "row", alignItems: "center", gap: 4 },
    locationText: {
      fontSize: 16,
      fontWeight: "600",
      color: theme.colors.text.primary,
    },
    searchBar: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.colors.surfaces.container_low,
      borderRadius: theme.shape.input,
      paddingHorizontal: 16,
      height: 50,
      borderWidth: 1,
      borderColor: theme.colors.surfaces.outline,
    },
    searchInput: {
      flex: 1,
      marginHorizontal: 12,
      fontSize: 14,
      color: theme.colors.text.primary,
    },
    content: { paddingHorizontal: 24 },
    promoContainer: {
      height: 180,
      backgroundColor: theme.colors.surfaces.container,
      borderRadius: 24,
      overflow: "hidden",
      flexDirection: "row",
    },
    promoContent: { flex: 1, padding: 24, justifyContent: "center", zIndex: 2},
    promoBadge: {
      alignSelf: "flex-start",
      backgroundColor: "rgba(255, 107, 53, 0.15)",
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 8,
      marginBottom: 12,
    },
    promoBadgeText: {
      fontSize: 10,
      fontWeight: "800",
      color: theme.colors.brand.primary,
    },
    promoTitle: {
      fontSize: 24,
      fontWeight: "bold",
      color: theme.colors.text.primary,
      lineHeight: 32,
    },
    promoImage: {
      position: "absolute",
      right: -20,
      width: "60%",
      height: "100%",
      resizeMode: "cover",
    },
    section: { marginBottom: 25, marginTop: 25 },
    sectionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: "700",
      color: theme.colors.text.primary,
      marginBottom: 16,
    },
    seeAllText: {
      color: theme.colors.brand.primary,
      fontWeight: "600",
      fontSize: 14,
      marginBottom: 14, 
    },
    cuisineList: { gap: 12 },
    cuisineChip: {
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 14,
      backgroundColor: theme.colors.surfaces.container_low,
      borderWidth: 1,
      borderColor: theme.colors.surfaces.outline,
    },
    cuisineChipActive: {
      backgroundColor: theme.colors.brand.primary,
      borderColor: theme.colors.brand.primary,
    },
    cuisineText: { color: theme.colors.text.primary, fontWeight: "600" },
    cuisineTextActive: { color: "#FFF" },
    restaurantCard: {
      backgroundColor: theme.colors.surfaces.container_low,
      borderRadius: 24,
      marginBottom: 24,
      overflow: "hidden",
      borderWidth: 1,
      borderColor: theme.colors.surfaces.outline,
    },
    imageContainer: { height: 200, position: "relative" },
    restaurantImage: { width: "100%", height: "100%" },
    timeBadge: {
      position: "absolute",
      bottom: 12,
      right: 12,
      backgroundColor: "rgba(0,0,0,0.6)",
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 10,
    },
    timeText: { color: "#FFF", fontSize: 12, fontWeight: "600" },
    favButton: {
      position: "absolute",
      top: 12,
      right: 12,
      backgroundColor: "rgba(0,0,0,0.3)",
      padding: 8,
      borderRadius: 12,
    },
    cardInfo: { padding: 16 },
    rowBetween: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
    },
    restaurantName: {
      fontSize: 18,
      fontWeight: "700",
      color: theme.colors.text.primary,
    },
    ratingRow: { flexDirection: "row", alignItems: "center", gap: 4 },
    ratingText: {
      fontSize: 14,
      fontWeight: "700",
      color: theme.colors.text.primary,
    },
    tagsText: {
      fontSize: 14,
      color: theme.colors.text.secondary,
      marginBottom: 16,
    },
    deliveryRow: { flexDirection: "row", alignItems: "center", gap: 6 },
    deliveryText: { fontSize: 14, color: theme.colors.text.secondary },
    viewMenuButton: {
      backgroundColor: theme.colors.surfaces.surface,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.colors.surfaces.outline,
    },
    viewMenuText: {
      fontSize: 13,
      fontWeight: "600",
      color: theme.colors.text.primary,
    },
  });
export default HomeScreen;
