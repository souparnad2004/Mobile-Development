import axios from "axios";
import {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
} from "../types/auth.types";
import { authStorage } from "../storage/tokenStorage";
import { useAuthStore } from "../store/auth.store";

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


export const loginUser = async (
  payload: LoginPayload,
): Promise<LoginResponse> => {
  const res = await api.post("/users/login", payload);

  return res.data;
};

export const registerUser = async (
  payload: RegisterPayload,
): Promise<RegisterResponse> => {
  const res = await api.post("/users/register", payload);

  return res.data;
};

export const me = async () => {
  const res = await api.get("/users/current-user");
  return res.data;
};
