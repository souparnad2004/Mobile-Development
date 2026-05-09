import { Text, View, StyleSheet } from "react-native";
import SignIn from "@/components/SignIn";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <SignIn />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      padding: 20,
    }
});
