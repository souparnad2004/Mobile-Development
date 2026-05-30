import axios from "axios";
import { authStorage } from "../../features/auth/storage/tokenStorage";
import { useAuthStore } from "../../features/auth/store/auth.store";

export const api = axios.create({
  baseURL: "https://api.freeapi.app/api/v1/",
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  const memoryToken = useAuthStore.getState().token;
  const token = memoryToken ?? (await authStorage.getAccessToken());

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
