import { api } from "../../../lib/api/client"
import { LoginPayload, LoginResponse, RegisterPayload, RegisterResponse } from "../types/auth.types";

export const loginUser = async (payload: LoginPayload):Promise<LoginResponse> => {
    const res = await api.post("/users/login", payload)

    return res.data;
}

export const registerUser = async (payload: RegisterPayload):Promise<RegisterResponse> => {
    const res = await api.post("/users/register",payload)

    return res.data;
}

export const me = async () => {
    const res = await api.get("/users/current-user")
    return res.data;
}