import { authService } from "@/service/auth"
import { Auth } from "@/utils/types/Auth"
import { cookies } from "@/utils/cookies"
import { TOKEN_COOKIE, USER_COOKIE } from "./authActions"



export const loginService = async (authData: Auth) => {
    const response = await authService.login(authData)
    if(!response.data){
        throw new Error("Error in the login request");
    }
    const { accessToken, user } = response.data;
    // const expirationDate = new Date(expiresIn * 1000);
    cookies.set(TOKEN_COOKIE, accessToken, { path: "/" });
    cookies.set(USER_COOKIE, user, { path: "/" })

    return response.data;
}