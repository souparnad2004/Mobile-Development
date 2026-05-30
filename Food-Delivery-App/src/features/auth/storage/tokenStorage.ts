import * as SecureStore from "expo-secure-store";

export const authStorage = {
  setAccessToken: (token: string) => SecureStore.setItemAsync("access", token),

  getAccessToken: () => SecureStore.getItemAsync("access"),

  setRefreshToken: (token: string) => SecureStore.setItemAsync("refresh", token),

  getRefreshToken: () => SecureStore.getItemAsync("refresh"),

  clear: async() => {
    await SecureStore.deleteItemAsync("access")
    await SecureStore.deleteItemAsync("refresh")
  },
};
