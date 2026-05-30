import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../../app/Providers/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";
import { globalTheme } from "../../../shared/theme/theme";
const ACTIVE_ORDERS = [
  {
    id: "ORD-8829",
    restaurant: "The Pizza Lab",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=200&q=80",
    status: "In Kitchen",
    items: 3,
    total: "$42.50",
    timeRemaining: "12-15 min",
    progress: 0.6,
  },
];
const PAST_ORDERS = [
  {
    id: "ORD-7712",
    restaurant: "Burger House",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=200&q=80",
    date: "Oct 24, 2023",
    items: 2,
    total: "$28.50",
    status: "Delivered",
  },
  {
    id: "ORD-6601",
    restaurant: "Sushi Zen",
    image:
      "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=200&q=80",
    date: "Oct 18, 2023",
    items: 5,
    total: "$64.00",
    status: "Delivered",
  },
];
const OrdersScreen = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState("Active");
  const styles = createStyles(theme);
  const renderActiveOrder = (order:any) => (
    <TouchableOpacity
      key={order.id}
      style={styles.orderCard}
      activeOpacity={0.9}
    >
      
      <View style={styles.cardHeader}>
        
        <Image
          source={{ uri: order.image }}
          style={styles.restaurantThumb}
        />
        <View style={styles.orderInfo}>
          
          <Text style={styles.restaurantName}>{order.restaurant}</Text>
          <Text style={styles.orderId}>
            #{order.id} • {order.items} items
          </Text>
        </View>
        <View style={styles.statusBadge}>
          
          <Text style={styles.statusText}>{order.status}</Text>
        </View>
      </View>
      <View style={styles.progressSection}>
        
        <View style={styles.progressBarBg}>
          
          <View
            style={[
              styles.progressBarFill,
              { width: `${order.progress * 100}%` },
            ]}
          />
        </View>
        <View style={styles.rowBetween}>
          
          <Text style={styles.etaText}>
            Estimated Arrival: {order.timeRemaining}
          </Text>
          <Text style={styles.totalText}>{order.total}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.trackButton}>
        
        <Text style={styles.trackButtonText}>Track Order</Text>
        <Ionicons name="map-outline" size={18} color="#FFF" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
  const renderPastOrder = (order:any) => (
    <View key={order.id} style={styles.pastOrderCard}>
      
      <View style={styles.cardHeader}>
        
        <Image
          source={{ uri: order.image }}
          style={styles.restaurantThumb}
        />
        <View style={styles.orderInfo}>
          
          <Text style={styles.restaurantName}>{order.restaurant}</Text>
          <Text style={styles.orderId}>
            {order.date} • {order.total}
          </Text>
        </View>
        <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
      </View>
      <View style={styles.pastOrderActions}>
        
        <TouchableOpacity style={styles.reorderButton}>
          
          <Ionicons
            name="refresh"
            size={16}
            color={theme.colors.brand.primary}
          />
          <Text style={styles.reorderText}>Reorder</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.detailsButton}>
          
          <Text style={styles.detailsText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      
      <View style={styles.header}>
        
        <Text style={styles.headerTitle}>My Orders</Text>
      </View>
      {/* Segmented Control */}
      <View style={styles.tabContainer}>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === "Active" && styles.activeTab]}
          onPress={() => setActiveTab("Active")}
        >
          
          <Text
            style={[
              styles.tabText,
              activeTab === "Active" && styles.activeTabText,
            ]}
          >
            Active
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Past" && styles.activeTab]}
          onPress={() => setActiveTab("Past")}
        >
          
          <Text
            style={[
              styles.tabText,
              activeTab === "Past" && styles.activeTabText,
            ]}
          >
            Past Orders
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        
        {activeTab === "Active" ? (
          ACTIVE_ORDERS.length > 0 ? (
            ACTIVE_ORDERS.map(renderActiveOrder)
          ) : (
            <View style={styles.emptyContainer}>
              
              <Ionicons
                name="receipt-outline"
                size={64}
                color={theme.colors.surfaces.outline}
              />
              <Text style={styles.emptyText}>
                No active orders at the moment
              </Text>
            </View>
          )
        ) : (
          PAST_ORDERS.map(renderPastOrder)
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
const createStyles = (theme:typeof globalTheme.light) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.surfaces.background },
    header: { paddingHorizontal: 24, paddingVertical: 16 },
    headerTitle: {
      fontSize: 28,
      fontWeight: "800",
      color: theme.colors.text.primary,
      fontFamily: theme.typography.font_family,
    },
    tabContainer: {
      flexDirection: "row",
      marginHorizontal: 24,
      backgroundColor: theme.colors.surfaces.container_low,
      borderRadius: 14,
      padding: 4,
      marginBottom: 24,
      borderWidth: 1,
      borderColor: theme.colors.surfaces.outline,
    },
    tab: {
      flex: 1,
      paddingVertical: 12,
      alignItems: "center",
      borderRadius: 10,
    },
    activeTab: {
      backgroundColor: theme.colors.surfaces.surface,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    tabText: {
      fontSize: 14,
      fontWeight: "600",
      color: theme.colors.text.secondary,
    },
    activeTabText: { color: theme.colors.brand.primary },
    scrollContent: { paddingHorizontal: 24, paddingBottom: 40 },
    orderCard: {
      backgroundColor: theme.colors.surfaces.container_low,
      borderRadius: 24,
      padding: 20,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: theme.colors.surfaces.outline,
    },
    cardHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 20,
    },
    restaurantThumb: { width: 56, height: 56, borderRadius: 16 },
    orderInfo: { flex: 1, marginLeft: 16 },
    restaurantName: {
      fontSize: 18,
      fontWeight: "700",
      color: theme.colors.text.primary,
    },
    orderId: { fontSize: 13, color: theme.colors.text.secondary, marginTop: 2 },
    statusBadge: {
      backgroundColor: "rgba(255, 107, 53, 0.12)",
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 8,
    },
    statusText: {
      fontSize: 12,
      fontWeight: "700",
      color: theme.colors.brand.primary,
    },
    progressSection: { marginBottom: 20 },
    progressBarBg: {
      height: 6,
      backgroundColor: theme.colors.surfaces.outline,
      borderRadius: 3,
      marginBottom: 12,
    },
    progressBarFill: {
      height: "100%",
      backgroundColor: theme.colors.brand.primary,
      borderRadius: 3,
    },
    rowBetween: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    etaText: {
      fontSize: 13,
      color: theme.colors.text.secondary,
      fontWeight: "500",
    },
    totalText: {
      fontSize: 16,
      fontWeight: "700",
      color: theme.colors.text.primary,
    },
    trackButton: {
      backgroundColor: theme.colors.brand.primary,
      height: 52,
      borderRadius: 16,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: 8,
    },
    trackButtonText: { color: "#FFF", fontSize: 16, fontWeight: "700" },
    pastOrderCard: {
      backgroundColor: theme.colors.surfaces.container_low,
      borderRadius: 20,
      padding: 16,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: theme.colors.surfaces.outline,
    },
    pastOrderActions: {
      flexDirection: "row",
      borderTopWidth: 1,
      borderTopColor: theme.colors.surfaces.outline,
      paddingTop: 16,
      marginTop: 16,
      gap: 12,
    },
    reorderButton: {
      flex: 1,
      height: 44,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.colors.brand.primary,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: 6,
    },
    reorderText: {
      color: theme.colors.brand.primary,
      fontWeight: "700",
      fontSize: 14,
    },
    detailsButton: {
      flex: 1,
      height: 44,
      borderRadius: 12,
      backgroundColor: theme.colors.surfaces.surface,
      borderWidth: 1,
      borderColor: theme.colors.surfaces.outline,
      justifyContent: "center",
      alignItems: "center",
    },
    detailsText: {
      color: theme.colors.text.primary,
      fontWeight: "600",
      fontSize: 14,
    },
    emptyContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 100,
    },
    emptyText: {
      marginTop: 16,
      color: theme.colors.text.secondary,
      fontSize: 16,
      textAlign: "center",
    },
  });
export default OrdersScreen;
