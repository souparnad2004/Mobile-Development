import { Colors, themeType } from "@/constants/theme";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

const Filter = ({
  name,
  theme,
  onPress,
  isSelected,
}: {
  name: string;
  theme: themeType;
  onPress: () => void;
  isSelected: boolean;
}) => {
  const styles = createStyle(theme, isSelected);
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{name}</Text>
    </Pressable>
  );
};

export default Filter;

const createStyle = (theme: themeType, isSelected: boolean) => {
  return StyleSheet.create({
    container: {
      backgroundColor: isSelected ? Colors[theme].primary : Colors[theme].input,
      padding: 10,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: isSelected ? Colors[theme].primary : Colors[theme].border,
    },
    text: {
      fontWeight: "500",
      color: isSelected ? Colors[theme].surface : Colors[theme].text,
    },
  });
};
