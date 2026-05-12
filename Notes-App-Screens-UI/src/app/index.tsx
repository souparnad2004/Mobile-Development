import Editor from "@/components/Editor";
import Filter from "@/components/Filter";
import NoteCard from "@/components/NoteCard";
import Preview from "@/components/Preview";
import { Colors, themeType } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import * as ScreenOrientation from "expo-screen-orientation";
import { useEffect, useState } from "react";
import {
  FlatList,
  ImageBackground,
  Pressable,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import type { EdgeInsets } from "react-native-safe-area-context";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  type ScreenType = "home" | "editor" | "preview";
  const [screen, setScreen] = useState<ScreenType>("home");
  const [notes, setNotes] = useState<any[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<any[]>([]);
  const { theme, setTheme } = useTheme();
  const [selectedNote, setSelectedNote] = useState<any | null>(null);
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("Recent");
  const filters = ["Recent", "Personal", "Work", "Ideas"];
  const insets = useSafeAreaInsets();

  const { height, width } = useWindowDimensions();
  const isLargeScreen = width > 600;
  const styles = createStyle(theme, insets, isLargeScreen);

  useEffect(() => {
    const result = notes.filter((note) =>
      note.title.toLowerCase().includes(search.toLowerCase()),
    );
    setFilteredNotes(result);
  }, [search, notes]);

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.ALL);
  }, [width]);

  const numColumns = width > 600 ? 2 : 1;

  return (
    <View style={[styles.safeArea]}>
      {screen === "preview" && (
        <Preview
          note={selectedNote}
          goBack={() => setScreen("home")}
          theme={theme}
        />
      )}
      {screen === "editor" && (
        <Editor
          goBack={() => setScreen("home")}
          addNote={(note) => {
            setNotes((prev) => [
              ...prev,
              { ...note, createdAt: new Date().toISOString() },
            ]);
            setScreen("home");
          }}
          theme={theme}
        />
      )}

      {screen === "home" && (
        <ImageBackground
          source={require("../../assets/images/background-image.jpg")}
          style={styles.container}
          resizeMode="cover"
          // imageStyle={styles.backgroundImage}
        >
          <StatusBar
            barStyle={theme === "dark" ? "light-content" : "dark-content"}
          />
          <View style={styles.overlay}>
            <View style={styles.header}>
              <Text style={styles.heading}>MyNotes</Text>
              <Switch
                value={theme === "dark"}
                onValueChange={() =>
                  setTheme(theme === "light" ? "dark" : "light")
                }
              />
            </View>
            <View style={styles.searchContainer}>
              <Feather
                name="search"
                size={24}
                color={Colors[theme].text}
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Search notes..."
                placeholderTextColor={Colors[theme].textSecondary}
                value={search}
                onChangeText={(text) => setSearch(text)}
              />
            </View>
            <View style={styles.filterContainer}>
              {filters.map((filter, index) => (
                <Filter
                  key={`${filter}-${index}`}
                  name={filter}
                  theme={theme}
                  onPress={() => setSelectedFilter(filter)}
                  isSelected={selectedFilter === filter}
                />
              ))}
            </View>
            <FlatList
              key={numColumns}
              data={filteredNotes}
              numColumns={numColumns}
              renderItem={({ item }) => (
                <NoteCard
                  onPress={() => {
                    setSelectedNote(item);
                    setScreen("preview");
                  }}
                  noteDelete={() => {
                    setNotes((prev) => prev.filter((n) => n.id !== item.id));
                  }}
                  theme={theme}
                  title={item.title}
                  date={item.createdAt}
                />
              )}
              keyExtractor={(item) => item.id}
              style={{
                flex: 1,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                borderRadius: 20,
                padding: 10,
              }}
              contentContainerStyle={styles.flatListContent}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <Text style={styles.emptyText}>No notes found</Text>
              }
              ListFooterComponent={<View style={{ height: 100 }} />}
            />
            <Pressable
              style={styles.addButton}
              onPress={() => setScreen("editor")}
            >
              <FontAwesome6
                name="add"
                size={24}
                color={Colors[theme].surface}
              />
            </Pressable>
          </View>
        </ImageBackground>
      )}
    </View>
  );
}

const createStyle = (
  theme: themeType,
  insets: EdgeInsets,
  isLargeScreen: boolean,
) => {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
    },
    container: {
      flex: 1,
      backgroundColor: Colors[theme].surface,
      paddingHorizontal: isLargeScreen ? 24 : 16,
    },
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: Colors[theme].input,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 8,
      marginVertical: 16,
      borderWidth: 1,
      borderColor: Colors[theme].border,
    },
    searchIcon: {
      marginRight: 8,
    },
    searchInput: {
      flex: 1,
      color: Colors[theme].text,
      fontSize: isLargeScreen ? 18 : 16,
    },
    filterContainer: {
      flexDirection: "row",
      marginBottom: 16,
      gap: 10,
    },
    addButton: {
      position: "absolute",
      bottom: isLargeScreen ? 80 : 35,
      right: isLargeScreen ? 40 : 30,
      backgroundColor: Colors[theme].secondary,
      borderRadius: 10,
      paddingHorizontal: isLargeScreen ? 20 : 16,
      paddingVertical: isLargeScreen ? 18 : 15,
    },
    heading: {
      color: Colors[theme].text,
      fontSize: isLargeScreen ? 36 : 30,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingInline: 5,
    },
    overlay: {
      flex: 1,
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingHorizontal: isLargeScreen ? 24 : 0,
    },
    backgroundImage: {},
    emptyText: {
      textAlign: "center",
      marginTop: 40,
      color: Colors[theme].textSecondary,
      fontSize: isLargeScreen ? 18 : 16,
    },
    flatListContent: {
      paddingBottom: 20,
    },
  });
};
