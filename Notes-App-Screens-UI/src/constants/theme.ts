export const Colors = {
  dark: {
    primary: "#BB86FC",
    secondary: "#03DAC6",

    background: "#0F0F14",
    surface: "#1A1B22",
    card: "#22232B",

    text: "#EAEAF0",
    textSecondary: "#A1A1AA",

    border: "#2A2B35",
    input: "#2A2B35",

    accent: "#F59E0B",
  },

  light: {
    primary: "#6C47FF",
    secondary: "#00BFA6",

    background: "#F8F9FC",
    surface: "#FFFFFF",
    card: "#F1F3F9",

    text: "#1A1A1A",
    textSecondary: "#6B7280",

    border: "#E5E7EB",
    input: "#F3F4F6",

    accent: "#F59E0B",
  },
};

export type themeType = keyof typeof Colors;