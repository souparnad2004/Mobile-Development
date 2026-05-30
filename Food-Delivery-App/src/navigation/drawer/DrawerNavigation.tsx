// ProfileDrawer.js
import { createDrawerNavigator } from "@react-navigation/drawer";
import ProfileScreen from "../../features/profile/screens/ProfileScreen";
import OrdersScreen from "../../features/orders/screens/OrdersScreen";
import { useTheme } from "../../app/Providers/ThemeProvider";
import CustomDrawerContent from "../../features/drawer/components/customDrawer";
import { Ionicons } from "@expo/vector-icons";

const Drawer = createDrawerNavigator();

export default function ProfileDrawer() {
  const { theme } = useTheme();
  
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />} 
      screenOptions={{
        drawerStyle: {
          backgroundColor: theme.colors.surfaces.surface,
          width: 260,
        },
        sceneStyle: {
          backgroundColor: theme.colors.surfaces.background,
        },
        drawerActiveBackgroundColor: theme.colors.brand.primary,
        drawerActiveTintColor: theme.colors.text.on_primary,
        drawerInactiveTintColor: theme.colors.text.primary,
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: "500",
          color: theme.colors.text.primary,
        },
        headerStyle: {
          backgroundColor: theme.colors.surfaces.surface,
          elevation: 0, // Remove shadow on Android
          shadowOpacity: 0, // Remove shadow on iOS
        },
        headerTintColor: theme.colors.text.primary,
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: "600",
          color: theme.colors.text.primary,
        },
        overlayColor: "rgba(0,0,0,0.3)",
        drawerType: "front",
      }}
    >
      {/* Only actual screens here */}
      <Drawer.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen 
        name="Orders" 
        component={OrdersScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="receipt-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}