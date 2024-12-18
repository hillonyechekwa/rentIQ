import { refreshToken } from "./auth";
import { getSession } from "@/lib/session";





export interface FetchOptions extends RequestInit{
    headers?: Record<string, string>
}

export const authFetch = async (
    url: string | URL,
    options: FetchOptions = {} 
) => {
    const session = await getSession()
    console.log(session)


    options.headers = {
        ...options.headers,
        Authorization: `Bearer ${session?.backendTokens.refreshToken}`
    };

    let response = await fetch(url, options)
    console.log({ status: response.status })

    if (response.status === 401) {
        if(session?.backendTokens.refreshToken) throw new Error("refresh Token not found")
            
        const newToken = await refreshToken(session?.backendTokens.refreshToken)

        if (newToken) {
            options.headers.Authorization = `Bearer ${session?.backendTokens.refreshToken}`;
            response = await fetch(url, options)
        }
    }
    return response
}