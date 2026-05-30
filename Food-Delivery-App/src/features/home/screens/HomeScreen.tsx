import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  ActivityIndicator,
  Pressable,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../../app/Providers/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";
import { globalTheme } from "../../../shared/theme/theme";
import { getRecipes } from "../api/home.api";
import { useInfiniteQuery } from "@tanstack/react-query";

const { width } = Dimensions.get("window");

const CUISINES = [
  { id: "1", name: "All" },
  { id: "2", name: "Pizza" },
  { id: "3", name: "Burger" },
  { id: "4", name: "Sushi" },
  { id: "5", name: "Dessert" },
];

const HomeScreen = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [selectedCuisine, setSelectedCuisine] = useState("1");

  // ✅ Infinite Query
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["recipes"],
      queryFn: ({ pageParam = 0 }) => getRecipes(pageParam),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        if (!lastPage?.recipes?.length) return undefined;
        return allPages.length * 10;
      },
    });

  const recipes = data?.pages.flatMap((page) => page.recipes) || [];

  const mapToRestaurant = (recipe: any) => ({
    id: recipe.id.toString(),
    name: recipe.name,
    image: recipe.image,
    rating: recipe.rating,
    tags: recipe.tags || [],
    time: "25-35 min",
  });

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  // 🔹 HEADER
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
          placeholder="Search food..."
          placeholderTextColor={theme.colors.text.secondary}
          style={styles.searchInput}
        />
      </View>
    </View>
  );

  const renderPromo = () => (
    <View style={styles.promoContainer}>
      <View style={styles.promoContent}>
        <Text style={styles.promoTitle}>50% OFF</Text>
        <Text style={styles.promoSubtitle}>On your first order</Text>
      </View>
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
        }}
        style={styles.promoImage}
      />
    </View>
  );

  const renderCuisines = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Cuisine</Text>

      <FlatList
        horizontal
        data={CUISINES}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
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
        )}
      />
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <FlatList
        data={recipes}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        showsVerticalScrollIndicator={false}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.4}
        ListHeaderComponent={
          <>
            {renderHeader()}
            <View style={styles.content}>
              {renderPromo()}
              {renderCuisines()}
              <Text style={styles.sectionTitle}>Popular</Text>
            </View>
          </>
        }
        renderItem={({ item }) => {
          const r = mapToRestaurant(item);

          return (
            <Pressable style={styles.card}>
              <View style={styles.imageContainer}>
                <Image source={{ uri: r.image }} style={styles.image} />

                <View style={styles.timeBadge}>
                  <Text style={styles.timeText}>{r.time}</Text>
                </View>

                <TouchableOpacity style={styles.heart}>
                  <Ionicons name="heart-outline" size={18} color="#fff" />
                </TouchableOpacity>
              </View>

              <View style={styles.cardContent}>
                <Text style={styles.title}>{r.name}</Text>

                <View style={styles.row}>
                  <View style={styles.rating}>
                    <Ionicons name="star" size={14} color="#FFD700" />
                    <Text style={styles.ratingText}>{r.rating}</Text>
                  </View>
                </View>

                <Text style={styles.tags}>{r.tags.join(" • ")}</Text>

                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>View Menu</Text>
                </TouchableOpacity>
              </View>
            </Pressable>
          );
        }}
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator style={{ marginVertical: 20 }} />
          ) : null
        }
      />
    </SafeAreaView>
  );
};

const createStyles = (theme: typeof globalTheme.light) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.surfaces.background },

    loader: { flex: 1, justifyContent: "center", alignItems: "center" },

    header: { padding: 20 },

    headerTop: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 16,
    },

    deliveryLabel: { fontSize: 12, color: theme.colors.text.secondary },

    locationRow: { flexDirection: "row", alignItems: "center", gap: 4 },

    locationText: {
      fontSize: 16,
      fontWeight: "600",
      color: theme.colors.text.primary,
    },

    profileButton: { justifyContent: "center", alignItems: "center" },

    searchBar: {
      flexDirection: "row",
      backgroundColor: theme.colors.surfaces.container_low,
      padding: 12,
      borderRadius: 12,
      alignItems: "center",
    },

    searchInput: { marginLeft: 10, flex: 1, color: theme.colors.text.primary },

    content: { paddingHorizontal: 20 },

    promoContainer: {
      height: 140,
      borderRadius: 20,
      overflow: "hidden",
      marginBottom: 20,
      backgroundColor: theme.colors.brand.primary,
    },

    promoContent: { padding: 20 },

    promoTitle: {
      color: theme.colors.text.on_primary,
      fontSize: 22,
      fontWeight: "bold",
    }, 

    promoSubtitle: { color: theme.colors.text.on_primary, marginTop: 4 }, 

    promoImage: {
      position: "absolute",
      right: 0,
      width: "50%",
      height: "100%",
    },

    section: { marginBottom: 20 },

    sectionTitle: {
      fontSize: 18,
      fontWeight: "700",
      marginBottom: 10,
      color: theme.colors.text.primary,
    },

    cuisineChip: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      backgroundColor: theme.colors.surfaces.container_low, 
      marginRight: 10,
    },

    cuisineChipActive: { backgroundColor: theme.colors.brand.primary }, 

    cuisineText: { color: theme.colors.text.primary }, 

    cuisineTextActive: { color: theme.colors.text.on_primary }, 

    card: {
      marginHorizontal: 20,
      marginBottom: 20,
      borderRadius: 20,
      overflow: "hidden",
      backgroundColor: theme.colors.surfaces.container, 
      elevation: 4,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },

    imageContainer: { height: 180 },

    image: { width: "100%", height: "100%" },

    heart: {
      position: "absolute",
      top: 10,
      right: 10,
      backgroundColor: "rgba(0,0,0,0.4)",
      padding: 6,
      borderRadius: 20,
    },

    timeBadge: {
      position: "absolute",
      bottom: 10,
      right: 10,
      backgroundColor: theme.colors.surfaces.surface_dim, 
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 8,
    },

    timeText: { color: theme.colors.text.primary, fontSize: 12 },

    cardContent: { padding: 14 },

    title: {
      fontSize: 16,
      fontWeight: "700",
      color: theme.colors.text.primary,
    }, 

    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 6,
    },

    rating: { flexDirection: "row", alignItems: "center", gap: 4 },

    ratingText: { marginLeft: 4, color: theme.colors.text.secondary }, 

    tags: { marginTop: 6, color: theme.colors.text.secondary }, 

    button: {
      marginTop: 10,
      backgroundColor: theme.colors.brand.primary, 
      padding: 10,
      borderRadius: 12, 
      alignItems: "center",
    },

    buttonText: { color: theme.colors.text.on_primary, fontWeight: "600" }, 
  });

export default HomeScreen;
