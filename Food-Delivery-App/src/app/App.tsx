import { NavigationContainer } from "@react-navigation/native";
import Providers from "./Providers/Provider";
import RootNavigator from "../navigation/RootNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";

function AppContent() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default function App() {
  return (
    <Providers>
      <AppContent />
    </Providers>
  );
}
