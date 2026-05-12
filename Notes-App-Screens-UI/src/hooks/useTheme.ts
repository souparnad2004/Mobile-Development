import { themeType } from "@/constants/theme";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";

export function useTheme() {
  const systemTheme = useColorScheme();

  const getValidTheme = (scheme: typeof systemTheme): themeType => {
    if (scheme === "light" || scheme === "dark") return scheme;
    return "light";
  };

  const [theme, setTheme] = useState<themeType>(getValidTheme(systemTheme));

  useEffect(() => {
    setTheme(getValidTheme(systemTheme));
  }, [systemTheme]);

  return { theme, setTheme };
}
