import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
  Dimensions,
  FlatList,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../../app/Providers/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";
import { globalTheme } from "../../../shared/theme/theme";
const { width } = Dimensions.get("window");
const MENU_CATEGORIES = [
  "Popular",
  "Main Course",
  "Appetizers",
  "Drinks",
  "Desserts",
];
const MENU_ITEMS = [
  {
    id: "1",
    name: "Truffle Mushroom Pizza",
    description:
      "Fresh truffles, wild mushrooms, mozzarella, and a drizzle of truffle oil on our signature thin crust.",
    price: "$24.00",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80",
    calories: "850 kcal",
    rating: "4.9",
  },
  {
    id: "2",
    name: "Spicy Wagyu Burger",
    description:
      "Double wagyu beef patty, jalapeños, smoked cheddar, and secret spicy mayo served with truffle fries.",
    price: "$28.50",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80",
    calories: "1100 kcal",
    rating: "4.8",
  },
  {
    id: "3",
    name: "Lobster Ravioli",
    description:
      "Handmade ravioli filled with butter-poached lobster in a creamy saffron and cherry tomato sauce.",
    price: "$32.00",
    image:
      "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=400&q=80",
    calories: "720 kcal",
    rating: "5.0",
  },
];
const RestaurantDetailScreen = () => {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState("Popular");
  const styles = createStyles(theme);
  return (
    <View style={styles.container}>
      
      <StatusBar barStyle="light-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[1]}
      >
        
        {/* Hero Header Section */}
        <View style={styles.heroSection}>
          
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80",
            }}
            style={styles.heroImage}
          />
          <View style={styles.headerOverlay}>
            
            <SafeAreaView style={styles.navBar}>
              
              <TouchableOpacity style={styles.iconButton}>
                
                <Ionicons name="arrow-back" size={24} color="#FFF" />
              </TouchableOpacity>
              <View style={styles.navActions}>
                
                <TouchableOpacity style={styles.iconButton}>
                  
                  <Ionicons name="share-outline" size={24} color="#FFF" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.iconButton, { marginLeft: 12 }]}
                >
                  
                  <Ionicons name="heart-outline" size={24} color="#FFF" />
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </View>
          {/* Restaurant Info Card */}
          <View style={styles.restaurantCard}>
            
            <View style={styles.restaurantHeader}>
              
              <View>
                
                <Text style={styles.restaurantName}>
                  Culinary Modernist
                </Text>
                <Text style={styles.cuisineText}>
                  Premium European • Contemporary
                </Text>
              </View>
              <View style={styles.ratingBadge}>
                
                <Ionicons name="star" size={16} color="#FFB347" />
                <Text style={styles.ratingText}>4.9</Text>
              </View>
            </View>
            <View style={styles.infoRow}>
              
              <View style={styles.infoItem}>
                
                <Ionicons
                  name="time-outline"
                  size={18}
                  color={theme.colors.brand.primary}
                />
                <Text style={styles.infoValue}>25-35 min</Text>
              </View>
              <View style={styles.infoDivider} />
              <View style={styles.infoItem}>
                
                <Ionicons
                  name="bicycle-outline"
                  size={18}
                  color={theme.colors.brand.primary}
                />
                <Text style={styles.infoValue}>Free Delivery</Text>
              </View>
              <View style={styles.infoDivider} />
              <View style={styles.infoItem}>
                
                <Ionicons
                  name="location-outline"
                  size={18}
                  color={theme.colors.brand.primary}
                />
                <Text style={styles.infoValue}>1.2 km</Text>
              </View>
            </View>
          </View>
        </View>
        {/* Menu Categories Tab Bar */}
        <View style={styles.tabBarContainer}>
          
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabBarContent}
          >
            
            {MENU_CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category}
                onPress={() => setSelectedCategory(category)}
                style={[
                  styles.tabItem,
                  selectedCategory === category && styles.tabItemActive,
                ]}
              >
                
                <Text
                  style={[
                    styles.tabText,
                    selectedCategory === category && styles.tabTextActive,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        {/* Menu Items List */}
        <View style={styles.menuList}>
          
          <Text style={styles.sectionTitle}>{selectedCategory}</Text>
          {MENU_ITEMS.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItemCard}
              activeOpacity={0.7}
            >
              
              <View style={styles.menuItemInfo}>
                
                <Text style={styles.menuItemName}>{item.name}</Text>
                <Text style={styles.menuItemDesc} numberOfLines={2}>
                  {item.description}
                </Text>
                <View style={styles.menuItemMeta}>
                  
                  <Text style={styles.menuItemPrice}>{item.price}</Text>
                  <View style={styles.dot} />
                  <Text style={styles.caloriesText}>{item.calories}</Text>
                </View>
              </View>
              <View style={styles.imageWrapper}>
                
                <Image
                  source={{ uri: item.image }}
                  style={styles.menuItemImage}
                />
                <TouchableOpacity style={styles.addButton}>
                  
                  <Ionicons name="add" size={20} color="#FFF" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      {/* Floating Cart Button */}
      <SafeAreaView style={styles.floatingAction}>
        
        <TouchableOpacity style={styles.cartButton}>
          
          <View style={styles.cartCount}>
            
            <Text style={styles.cartCountText}>2</Text>
          </View>
          <Text style={styles.viewCartText}>View Cart</Text>
          <Text style={styles.totalText}>$52.50</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};
const createStyles = (theme: typeof globalTheme.light) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.surfaces.background },
    heroSection: { height: 380, position: "relative" },
    heroImage: { width: "100%", height: 300 },
    headerOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: 100,
      paddingTop: 10,
    },
    navBar: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      alignItems: "center",
    },
    navActions: { flexDirection: "row" },
    iconButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: "rgba(0,0,0,0.3)",
      justifyContent: "center",
      alignItems: "center",
    },
    restaurantCard: {
      position: "absolute",
      bottom: 0,
      left: 20,
      right: 20,
      backgroundColor: theme.colors.surfaces.surface,
      borderRadius: 24,
      padding: 20,
      borderWidth: 1,
      borderColor: theme.colors.surfaces.outline,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: theme.mode === "Dark" ? 0.4 : 0.1,
      shadowRadius: 20,
      elevation: 10,
    },
    restaurantHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 16,
    },
    restaurantName: {
      fontSize: 24,
      fontWeight: "700",
      color: theme.colors.text.primary,
      fontFamily: theme.typography.font_family,
    },
    cuisineText: {
      fontSize: 14,
      color: theme.colors.text.secondary,
      marginTop: 4,
    },
    ratingBadge: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.colors.surfaces.container_low,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 8,
      gap: 4,
    },
    ratingText: {
      fontSize: 14,
      fontWeight: "700",
      color: theme.colors.text.primary,
    },
    infoRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderTopWidth: 1,
      borderTopColor: theme.colors.surfaces.outline,
      paddingTop: 16,
    },
    infoItem: { flexDirection: "row", alignItems: "center", gap: 6 },
    infoValue: {
      fontSize: 13,
      fontWeight: "600",
      color: theme.colors.text.primary,
    },
    infoDivider: {
      width: 1,
      height: 12,
      backgroundColor: theme.colors.surfaces.outline,
    },
    tabBarContainer: {
      backgroundColor: theme.colors.surfaces.background,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.surfaces.outline,
    },
    tabBarContent: { paddingHorizontal: 20, gap: 12 },
    tabItem: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      backgroundColor: theme.colors.surfaces.container_low,
    },
    tabItemActive: { backgroundColor: theme.colors.brand.primary },
    tabText: {
      fontSize: 14,
      fontWeight: "600",
      color: theme.colors.text.secondary,
    },
    tabTextActive: { color: "#FFF" },
    menuList: { padding: 20 },
    sectionTitle: {
      fontSize: 20,
      fontWeight: "700",
      color: theme.colors.text.primary,
      marginBottom: 20,
    },
    menuItemCard: {
      flexDirection: "row",
      backgroundColor: theme.colors.surfaces.container_low,
      borderRadius: 20,
      padding: 16,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: theme.colors.surfaces.outline,
    },
    menuItemInfo: { flex: 1, paddingRight: 12 },
    menuItemName: {
      fontSize: 16,
      fontWeight: "700",
      color: theme.colors.text.primary,
      marginBottom: 4,
    },
    menuItemDesc: {
      fontSize: 13,
      color: theme.colors.text.secondary,
      lineHeight: 18,
      marginBottom: 12,
    },
    menuItemMeta: { flexDirection: "row", alignItems: "center" },
    menuItemPrice: {
      fontSize: 16,
      fontWeight: "700",
      color: theme.colors.brand.primary,
    },
    dot: {
      width: 4,
      height: 4,
      borderRadius: 2,
      backgroundColor: theme.colors.text.secondary,
      marginHorizontal: 8,
    },
    caloriesText: { fontSize: 12, color: theme.colors.text.secondary },
    imageWrapper: { position: "relative" },
    menuItemImage: { width: 100, height: 100, borderRadius: 16 },
    addButton: {
      position: "absolute",
      bottom: -8,
      right: -8,
      backgroundColor: theme.colors.brand.primary,
      width: 32,
      height: 32,
      borderRadius: 16,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 3,
      borderColor: theme.colors.surfaces.container_low,
    },
    floatingAction: { position: "absolute", bottom: 20, left: 20, right: 20 },
    cartButton: {
      backgroundColor: theme.colors.brand.primary,
      height: 60,
      borderRadius: 18,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 20,
      shadowColor: theme.colors.brand.primary,
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.3,
      shadowRadius: 15,
      elevation: 8,
    },
    cartCount: {
      backgroundColor: "rgba(255,255,255,0.2)",
      width: 28,
      height: 28,
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
    },
    cartCountText: { color: "#FFF", fontSize: 14, fontWeight: "700" },
    viewCartText: {
      flex: 1,
      textAlign: "center",
      color: "#FFF",
      fontSize: 16,
      fontWeight: "700",
    },
    totalText: { color: "#FFF", fontSize: 16, fontWeight: "700" },
  });
export default RestaurantDetailScreen;
