"use server";


import {redirect} from "next/navigation"
import {BACKEND_URL} from "./contants"
import {
    FormState,
    LoginFormSchema,
    SignupFormSchema,
} from "./type"
import { createSession, updateTokens} from "./session"




export async function signUp(
    state: FormState,
    formData: FormData
): Promise<FormState> {
    const validationFields = SignupFormSchema.safeParse({
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
    });

    if (!validationFields.success) {
        return {
            error: validationFields.error.flatten().fieldErrors
        }
    }


    const response = await fetch(
        `${BACKEND_URL}/auth/signup`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(validationFields.data),
        }
    );
    if (response.ok) {
        redirect("auth/signin")
    } else {
        return {
            message:
                response.status === 409
                    ? "This user already exists"
                    : response.statusText
        }
    }
}

    export async function signIn(
        state: FormState,
        formData: FormData
    ): Promise<FormState> {
        const validationFields = LoginFormSchema.safeParse({
            email: formData.get("email"),
            password: formData.get("password"),
        });
        if(!validationFields.success){
            return {
                error: validationFields.error.flatten().fieldErrors
            }
        }

        const response = await fetch(
            `${BACKEND_URL}/auth/signin`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(validationFields.data),
            }
        );

        if(response.ok){
            const result = await response.json();

            await createSession({
                user: {
                    id: result.id,
                    name: result.name,
                },
                accessToken: result.accessToken,
                refreshToken: result.refreshToken
            })
            redirect("/")
        }else{
            return {
                message:
                    response.status === 401
                    ? "Invalid Credentials!"
                        : response.statusText
            };
        }
    }


    export const refreshToken = async (
        oldRefreshToken: string
    )=> {
        try{
            const response = await fetch(
                `${BACKEND_URL}/auth/refresh`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        refresh: oldRefreshToken
                    }),
                }
            )


            if(!response.ok){
                throw new Error("Refresh token failed." + response.statusText);
            }

            const { accessToken, refreshToken} = await response.json()
            const updateRes = await fetch("http://localhost:3000/api/auth/update",
                {
                    method: "POST",
                    body: JSON.stringify({
                        accessToken,
                        refreshToken,
                    })
                })
            if(!updateRes.ok) throw new Error("Refresh token failed.");

                return accessToken

        }catch(error){
            console.error("Refresh token failed.", error)
            return null
        }
    }
