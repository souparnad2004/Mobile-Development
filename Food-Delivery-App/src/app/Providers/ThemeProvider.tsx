import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { globalTheme } from "../../shared/theme/theme";

type ThemeContextType = {
  theme: typeof globalTheme.light;
  toggleTheme: () => Promise<void>;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<typeof globalTheme.light | null>(null);

  useEffect(() => {
    loadTheme();
  }, []);

  async function loadTheme() {
    const saved = await AsyncStorage.getItem("theme");
    if (saved === "Dark") setTheme(globalTheme.dark);
    else setTheme(globalTheme.light);
  }

  async function toggleTheme() {
    if(!theme) return;
    const newTheme =
      theme.mode === "Light" ? globalTheme.dark : globalTheme.light;
    setTheme(newTheme);
    await AsyncStorage.setItem("theme", newTheme.mode);
  }

  if(!theme) return null;
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if(!context) {
        throw new Error("useTheme must be within the theme provider");
    }
    return context;
}
