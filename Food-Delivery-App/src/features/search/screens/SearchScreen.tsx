import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ImageBackground,
  Dimensions,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useTheme } from "../../../app/Providers/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";
import { globalTheme } from "../../../shared/theme/theme";
const { width } = Dimensions.get("window");
const COLUMN_WIDTH = (width - 60) / 2;
const RECENT_SEARCHES = [
  "Truffle Pizza",
  "Wagyu Beef",
  "Vegan Sushi",
  "Artisan Coffee",
];
const CATEGORIES = [
  {
    id: "1",
    name: "Pizza",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "2",
    name: "Burgers",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "3",
    name: "Sushi",
    image:
      "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "4",
    name: "Desserts",
    image:
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "5",
    name: "Healthy",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "6",
    name: "Drinks",
    image:
      "https://images.unsplash.com/photo-1544145945-f904253d0c7b?auto=format&fit=crop&w=400&q=80",
  },
];



const SearchScreen = () => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const styles = createStyles(theme);
  const renderRecentSearch = (item:any) => (
    <TouchableOpacity key={item} style={styles.recentChip}>
      
      <Ionicons
        name="time-outline"
        size={16}
        color={theme.colors.text.secondary}
      />
      <Text style={styles.recentText}>{item}</Text>
      <TouchableOpacity>
        
        <Ionicons
          name="close"
          size={14}
          color={theme.colors.text.secondary}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      
      {/* Search Header */}
      <View style={styles.header}>
        
        <View style={styles.searchContainer}>
          
          <Ionicons
            name="search"
            size={20}
            color={theme.colors.text.secondary}
          />
          <TextInput
            style={styles.input}
            placeholder="Search restaurants or dishes..."
            placeholderTextColor={theme.colors.text.secondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              
              <Ionicons
                name="close-circle"
                size={20}
                color={theme.colors.text.secondary}
              />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity style={styles.filterButton}>
          
          <Ionicons
            name="options-outline"
            size={22}
            color={theme.colors.brand.primary}
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        
        {/* Recent Searches */}
        <View style={styles.section}>
          
          <View style={styles.sectionHeader}>
            
            <Text style={styles.sectionTitle}>Recent Searches</Text>
            <TouchableOpacity>
              
              <Text style={styles.clearAllText}>Clear All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.recentGrid}>
            
            {RECENT_SEARCHES.map(renderRecentSearch)}
          </View>
        </View>
        {/* Categories Grid */}
        <View style={styles.section}>
          
          <Text style={styles.sectionTitle}>Browse Categories</Text>
          <View style={styles.categoryGrid}>
            
            {CATEGORIES.map((item) => (
              <TouchableOpacity key={item.id} style={styles.categoryCard}>
                
                <ImageBackground
                  source={{ uri: item.image }}
                  style={styles.categoryImage}
                  imageStyle={{ borderRadius: 20 }}
                >
                  
                  <View style={styles.categoryOverlay}>
                    
                    <Text style={styles.categoryName}>{item.name}</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const createStyles = (theme:typeof globalTheme.light) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.surfaces.background },
    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingVertical: 12,
      gap: 12,
    },
    searchContainer: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.colors.surfaces.container_low,
      height: 52,
      borderRadius: 16,
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: theme.colors.surfaces.outline,
    },
    input: {
      flex: 1,
      marginLeft: 12,
      fontSize: 16,
      color: theme.colors.text.primary,
    },
    filterButton: {
      width: 52,
      height: 52,
      backgroundColor: theme.colors.surfaces.container_low,
      borderRadius: 16,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: theme.colors.surfaces.outline,
    },
    scrollContent: { paddingHorizontal: 20, paddingBottom: 24 },
    section: { marginTop: 32 },
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
      fontFamily: theme.typography.font_family,
    },
    clearAllText: {
      fontSize: 14,
      color: theme.colors.brand.primary,
      fontWeight: "600",
    },
    recentGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
    recentChip: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.colors.surfaces.container_low,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.colors.surfaces.outline,
      gap: 8,
    },
    recentText: {
      fontSize: 14,
      color: theme.colors.text.primary,
      fontWeight: "500",
    },
    categoryGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      marginTop: 16,
    },
    categoryCard: {
      width: COLUMN_WIDTH,
      height: COLUMN_WIDTH * 1.2,
      marginBottom: 20,
      borderRadius: 20,
      overflow: "hidden",
    },
    categoryImage: {
      width: "100%",
      height: "100%",
      justifyContent: "flex-end",
    },
    categoryOverlay: {
      height: "40%",
      backgroundColor: "rgba(0,0,0,0.4)",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 10,
    },
    categoryName: {
      color: "#FFF",
      fontSize: 16,
      fontWeight: "700",
      textAlign: "center",
    },
  });
export default SearchScreen;
