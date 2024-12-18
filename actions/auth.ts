"use server"

import { SignupFormSchema, SigninFormSchema, FormState } from "@/lib/definitions"
import { BACKEND_URL } from "@/lib/constants"
import { createSession } from "@/lib/session"
import { redirect } from "next/navigation"


export async function signUp(state: FormState, formData: FormData): Promise<FormState> {
    const validatedFields = SignupFormSchema.safeParse({
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password")
    })


    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors
        }
    }

    //call the provider to create user.
    const { username, email, password } = validatedFields.data

     const res = await fetch(`${BACKEND_URL}/auth/signup`, {
            method: "POST",
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: {
                "Content-Type": "application/json"
            }
     })
    
    if (!res.ok) {
        throw new Error ("Signup Failed!")
    }

    const result = await res.json()
    //create session for new user
    await createSession(result)
    redirect('/feed')
    
}

export async function signIn(state: FormState, formData: FormData) {
    const validatedFields = SigninFormSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password")
    })


    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors
        }
    }

    //call the provider to create user.
    const { email, password } = validatedFields.data

     const res = await fetch(`${BACKEND_URL}/auth/login`, {
            method: "POST",
            body: JSON.stringify({
                email,
                password
            }),
            headers: {
                "Content-Type": "application/json"
            }
     })
    
    if (!res.ok) {
        console.error("Signin Failed!")
        throw new Error ("Signin Failed!")
    }

    if (res.ok) {
        const result = await res.json()
        // console.log("signin res", result)
        //create session for new user
         await createSession(result)
         
        redirect('/feed')
    }
    
}


// export async function signout() {
//     const session = await getSession()
//     const res = await fetch(`${BACKEND_URL}/auth/signout`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${session?.backendTokens.refreshToken}`,
//         "Content-Type": "application/json",
//       },
//     });

//     if (!res.ok) {
//         throw new Error("Failed to signout")
//     }

//     deleteSession()
//     redirect("/")
// }


export async function refreshToken(oldrefreshToken?: string) {
    try {
        const response = await fetch(`${BACKEND_URL}/auth/refresh`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${oldrefreshToken}`,
                "Content-Type": "application/json",
            },
        })

        if (!response.ok) {
            throw new Error("Failed to refresh token" + response.statusText)
        }


        const {accessToken, refreshToken} = await response.json()

        const updateRes = await fetch("http://localhost:3000/api/auth/update", {
            method: "POST",
            body: JSON.stringify({
                accessToken,
                refreshToken
            })
        })

        if (!updateRes.ok) {
            throw new Error("Failed to update tokens")
        }
        //probably return either the refreshToken or both tokens
        return accessToken
    } catch (error) {
        console.error("refresh token failed:", error)
        return null
    }
}