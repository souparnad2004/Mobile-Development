import { authStorage } from "../storage/tokenStorage";
import { useAuthStore } from "../store/auth.store";
import { LoginResponse, RegisterResponse } from "../types/auth.types";

export const handleLoginSuccess = async(res: LoginResponse) => {
    const {accessToken, refreshToken, user} = res.data;
    if(!accessToken || !refreshToken || !user) return false;
    await authStorage.setAccessToken(accessToken);
    await authStorage.setRefreshToken(refreshToken);

    useAuthStore.getState().setAuth(accessToken, user);
}

export const handleRegisterSuccess = async(res: RegisterResponse) => {
    if(res.user) return true;
    return false;
}