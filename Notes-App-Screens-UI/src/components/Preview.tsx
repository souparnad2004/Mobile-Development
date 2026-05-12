import { Colors, themeType } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";

type NoteType = {
  title: string;
  content: string;
};

const Preview = ({
  note,
  goBack,
  theme,
}: {
  note: NoteType;
  goBack: () => void;
  theme: themeType
}) => {
  const { width } = useWindowDimensions();
  const isLargeScreen = width > 600;
  const styles = createStyle(theme, isLargeScreen);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
  
      <View style={styles.header}>
        <Pressable onPress={goBack}>
          <Text style={styles.actionText}>Back</Text>
        </Pressable>

      </View>

      <Text style={styles.title}>{note.title}</Text>

      <Text style={styles.content}>{note.content}</Text>
    </ScrollView>
  );
};

export default Preview;
const createStyle = (theme: themeType, isLargeScreen: boolean) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors[theme].background,
      paddingHorizontal: isLargeScreen ? 24 : 16,
      paddingVertical: 10,
    },

    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 20,
    },

    actionText: {
      color: Colors[theme].primary,
      fontSize: isLargeScreen ? 18 : 16,
      fontWeight: "600",
    },

    title: {
      fontSize: isLargeScreen ? 32 : 26,
      fontWeight: "700",
      color: Colors[theme].text,
      marginBottom: 16,
    },

    content: {
      fontSize: isLargeScreen ? 18 : 16,
      color: Colors[theme].textSecondary,
      lineHeight: isLargeScreen ? 26 : 22,
    },
    scrollContent: {
      paddingBottom: 20,
    },
  });
};
