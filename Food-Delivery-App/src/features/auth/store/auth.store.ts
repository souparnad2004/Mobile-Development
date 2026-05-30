import { create } from "zustand";
import { User } from "../types/auth.types";

type UserAuthStoreType = {
    token: string | null,
    user: User | null,

    setAuth: (token: string, user: User) => void
    logout: () => void,
}

export const useAuthStore = create<UserAuthStoreType>((set) => ({
  token: null,
  user: null,

  setAuth: (token: string, user: User) => set({ token, user }),
  logout: () => set({ token: null, user: null }),
}));

