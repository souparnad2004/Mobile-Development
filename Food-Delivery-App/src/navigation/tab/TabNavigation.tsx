import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../../features/home/screens/HomeScreen";
import SearchScreen from "../../features/search/screens/SearchScreen";
import OrdersScreen from "../../features/orders/screens/OrdersScreen";
import ProfileScreen from "../../features/profile/screens/ProfileScreen";
import { useTheme } from "../../app/Providers/ThemeProvider";


import { Ionicons } from "@expo/vector-icons";
import ProfileStack from "../../features/profile/screens/ProfileStack";


const Tab = createBottomTabNavigator();

function MyTab() {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarStyle: {
          backgroundColor: theme.colors.surfaces.background,
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },

        tabBarActiveTintColor: theme.colors.text.primary,
        tabBarInactiveTintColor: "gray",

        tabBarIcon: ({ color, size, focused }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === "Orders") {
            iconName = focused ? "receipt" : "receipt-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }
//@ts-ignore
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Orders" component={OrdersScreen} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}

export default function TabNavigator() {
  return <MyTab />;
}