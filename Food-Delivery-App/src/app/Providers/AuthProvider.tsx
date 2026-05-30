import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { useAuthStore } from "../../features/auth/store/auth.store";
import { me } from "../../features/auth/api/auth.api";

type AuthContextType = {
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const setAuth = useAuthStore((s) => s.setAuth);
  const user = useAuthStore((s) => s.user)

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    bootstrap();
  }, []);

  async function bootstrap() {
    try {
      const token = await SecureStore.getItemAsync("access"); 
      if (token && !user) {
        const res = await me();
        if(res.data) {
          setAuth(token, res.data);
        }
      }
    } catch (err) {
      console.log("Auth bootstrap error:", err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthContext.Provider value={{ isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};