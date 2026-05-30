import { createDrawerNavigator } from "@react-navigation/drawer";
import ProfileScreen from "../../features/profile/screens/ProfileScreen";
import OrdersScreen from "../../features/orders/screens/OrdersScreen";
import { useTheme } from "../../app/Providers/ThemeProvider";

const Drawer = createDrawerNavigator();

export default function ProfileDrawer() {
  const { theme } = useTheme();
  return (
    <Drawer.Navigator
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
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
}
