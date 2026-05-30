import {useMutation} from "@tanstack/react-query"
import { loginUser, me, registerUser } from "../api/auth.api"
import { LoginPayload, LoginResponse, RegisterPayload, RegisterResponse, User } from "../types/auth.types"
import { handleLoginSuccess } from "../services/auth.service"
import { useNavigation } from "@react-navigation/native"
import { AuthStackNavigation } from "../../../navigation/stack/AuthStack"


export const useLogin = () => {
    return useMutation<LoginResponse, Error, LoginPayload>({
        mutationFn: loginUser,
        onSuccess: handleLoginSuccess
    })
}


export const useRegister = () => {
    const navigation = useNavigation<AuthStackNavigation>();

    return useMutation<RegisterResponse, Error, RegisterPayload>({
        mutationFn: registerUser,
        onSuccess: () => navigation.navigate("Login"),
    })
}

export const useMe = () => {
    return useMutation<User, Error>({
        mutationFn: me
    })
}
