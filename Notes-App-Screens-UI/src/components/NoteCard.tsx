import { Colors, themeType } from "@/constants/theme";
import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

const NoteCard = ({
  title,
  theme,
  onPress,
  date,
  noteDelete,
}: {
  theme: themeType;
  title: string;
  onPress: () => void;
  date: string;
  noteDelete: () => void;
}) => {
  const { width } = useWindowDimensions();
  const isLargeScreen = width > 600;
  const styles = createStyle(theme, isLargeScreen);

  return (
    <View style={styles.container}>
      <Pressable style={styles.left} onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
        <Text style={styles.date}>{new Date(date).toLocaleDateString()}</Text>
      </Pressable>

      <Pressable style={styles.deleteBtn} onPress={noteDelete}>
        <AntDesign
          name="delete"
          size={22}
          color={theme === "dark" ? "white" : "black"}
        />
      </Pressable>
    </View>
  );
};

export default NoteCard;
const createStyle = (theme: themeType, isLargeScreen: boolean) => {
  return StyleSheet.create({
    container: {
      backgroundColor: Colors[theme].card,
      paddingHorizontal: isLargeScreen ? 20 : 16,
      paddingVertical: isLargeScreen ? 18 : 14,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: Colors[theme].border,
      marginBottom: 12,
      marginHorizontal: isLargeScreen ? 8 : 0,

      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",

      shadowColor: "#000",
      shadowOpacity: theme === "dark" ? 0.3 : 0.08,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 4 },
      elevation: 3,
    },

    left: {
      flex: 1,
    },

    text: {
      color: Colors[theme].text,
      fontSize: isLargeScreen ? 18 : 16,
      fontWeight: "500",
    },

    date: {
      color: Colors[theme].textSecondary,
      fontSize: isLargeScreen ? 14 : 12,
      marginTop: 4,
    },

    deleteBtn: {
      padding: 8,
    },
  });
};
