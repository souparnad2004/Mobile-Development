import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "./ProfileScreen";
import ProfileDrawer from "../../../navigation/drawer/DrawerNavigation";
import Logout from "../../auth/components/Logout";

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Drawer" component={ProfileDrawer}/>
    </Stack.Navigator>
  );
}