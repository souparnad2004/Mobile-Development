import { Colors, themeType } from "@/constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useWindowDimensions } from "react-native";

const Editor = ({
  theme,
  goBack,
  addNote,
}: {
  theme: themeType;
  goBack: () => void;
  addNote: (note: { title: string; content: string }) => void;
}) => {
  const { width } = useWindowDimensions();
  const isLargeScreen = width > 600;
  const styles = createStyle(theme, isLargeScreen);

  const [note, setNote] = useState({
    id: Date.now().toString(),
    title: "",
    content: "",
  });

  const [error, setError] = useState({
    title: "",
    content: "",
  });

  function validate() {
    let newErrors = { title: "", content: "" };
    let isValid = true;

    if (!note.title.trim()) {
      newErrors.title = "Title is required";
      isValid = false;
    }

    if (!note.content.trim()) {
      newErrors.content = "Content is required";
      isValid = false;
    }

    setError(newErrors);
    return isValid;
  }
  const createNote = (field: "title" | "content", value: string) => {
    setNote((prev) => ({ ...prev, [field]: value }));
  };

  const saveHandler = () => {
    if (!validate()) return;

    addNote(note);
    setNote({ id: Date.now().toString(), title: "", content: "" });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
    >
      <View style={styles.card}>
        <Ionicons
          name="arrow-back"
          size={24}
          onPress={() => goBack()}
          color="black"
        />
        <TextInput
          placeholder="Title"
          placeholderTextColor={Colors[theme].textSecondary}
          style={styles.titleInput}
          value={note.title}
          onChangeText={(text) => createNote("title", text)}
        />
        {error.title && (
          <Text style={{ color: "red", marginBottom: 10 }}>{error.title}</Text>
        )}
        <TextInput
          placeholder="Write your note..."
          placeholderTextColor={Colors[theme].textSecondary}
          style={styles.contentInput}
          value={note.content}
          onChangeText={(text) => createNote("content", text)}
          multiline
        />
        {error.content && (
          <Text style={{ color: "red", marginBottom: 10 }}>
            {error.content}
          </Text>
        )}
        <Pressable style={styles.button} onPress={() => saveHandler()}>
          <Text style={styles.buttonText}>Save</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Editor;

const createStyle = (theme: themeType, isLargeScreen: boolean) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors[theme].background,
      padding: isLargeScreen ? 24 : 16,
    },
    card: {
      backgroundColor: Colors[theme].card,
      borderRadius: 14,
      padding: isLargeScreen ? 24 : 16,
      borderWidth: 1,
      borderColor: Colors[theme].border,
      shadowColor: "#000",
      shadowOpacity: theme === "dark" ? 0.3 : 0.08,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 4 },
      elevation: 3,
    },
    titleInput: {
      color: Colors[theme].text,
      fontSize: isLargeScreen ? 24 : 20,
      fontWeight: "600",
      marginBottom: 12,
    },
    contentInput: {
      color: Colors[theme].text,
      fontSize: isLargeScreen ? 18 : 16,
      minHeight: isLargeScreen ? 150 : 120,
      textAlignVertical: "top",
    },
    button: {
      backgroundColor: Colors[theme].primary,
      paddingVertical: isLargeScreen ? 16 : 14,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 16,
      borderWidth: 1,
      borderColor: Colors[theme].border,
    },
    buttonText: {
      color: Colors[theme].surface,
      fontSize: isLargeScreen ? 18 : 16,
      fontWeight: "600",
    },
  });
};
