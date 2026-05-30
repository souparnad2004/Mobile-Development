import {
    DarkTheme as NavDark,
    DefaultTheme as NavLight,
    Theme as NavigationTheme,
  } from "@react-navigation/native";
import { globalTheme } from "../../../src/shared/theme/theme";
  
  export const getNavigationTheme = (
    appTheme: typeof globalTheme.light
  ): NavigationTheme => {
    const isDark = appTheme.mode === "Dark";
  
    const base = isDark ? NavDark : NavLight;
  
    return {
      ...base,
      dark: isDark,
  
      colors: {
        ...base.colors,
  
        primary: appTheme.colors.brand.primary,
        background: appTheme.colors.surfaces.background,
        card: appTheme.colors.surfaces.surface,
        text: appTheme.colors.text.primary,
  
        border: appTheme.colors.surfaces.outline,
        notification: appTheme.colors.brand.accent,
      },
    };
  };