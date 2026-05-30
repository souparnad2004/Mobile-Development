import type { NavigatorScreenParams } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AuthStack, { AuthStackParamList } from "./stack/AuthStack";
import { useAuth } from "../app/Providers/AuthProvider";
import { ActivityIndicator, View } from "react-native";
import { useAuthStore } from "../features/auth/store/auth.store";
import TabNavigator from "./tab/TabNavigation";

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList> | undefined;
  Mytab: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { isLoading } = useAuth();
  const token = useAuthStore((s) => s.token);
  const isAuthenticated = !!token;

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="Mytab" component={TabNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
}

export type RootStackNavigation = NativeStackNavigationProp<
  RootStackParamList
>;
