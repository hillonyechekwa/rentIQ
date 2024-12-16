"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useRef } from "react"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
// import { useFormState } from "react-dom"
// import { signIn } from "next-auth/react"
// import SubmitButton from "@/components/SubmitButton"
import { buttonVariants } from "@/components/ui/button"
import { redirect } from "next/navigation"
// import { BACKEND_URL } from "@/lib/constants"




type FormInputs = {
    username: string,
    email: string,
    password: string
}



const SignUpForm = () => {

    const data = useRef<FormInputs>({
        username: "",
        email: "",
        password: ""
    })


    // const handleSubmit = async (username: string, email: string, password: string) => {
    //     await signIn("signup-credentials", {username, email, password, redirect: false})
    //     redirect("/feed")
    // }


    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        console.log("submitting....")
        
        const res = await fetch("/api/signup", {
            method: "POST",
            body: JSON.stringify({
                username: data.current.username,
                email: data.current.email,
                password: data.current.password
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        console.log("authenticating...")
        console.log("response", res)
        if (!res.ok) {
            throw new Error("Form submission failed!")
        }
        const result = await res.json()
        console.log("done!!")
        console.log("signup response", result)
        //?how do I harness next-auth here to create a new session before redirecting to the feed page??
        redirect("/feed") //* tweak to redirect to onboarding page later on
    
    }

    return (
        <CardContent className="grid place-items-center">
            <CardHeader>
                <CardTitle className="text-3xl">Sign Up</CardTitle>
                <CardDescription>Begin your journey to better insights.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={onSubmit}>
                    <div className="flex flex-col justify-between items-center p-3 ">
                        {/* {state?.message && (
                            <p className="text-xs text-red-600">{state.message}</p>
                        )} */}
                        <div className="mb-5 p-2 flex flex-col gap-y-3">
                            <Label htmlFor="username">Username:</Label>
                            <Input id="username" name="username" type="text" placeholder="Jynx" onChange={(e) => (data.current.username = e.target.value)} />
                        </div>
                        {/* {state?.error?.username && (
                            <p className="text-xs text-red-600">{state.error.username}</p>
                        )} */}
                        <div className="mb-5 p-2 flex flex-col gap-y-3">
                            <Label htmlFor="email">Email:</Label>
                            <Input id="email" name="email" type="email" placeholder="Jynx@zaun.com" onChange={(e) => (data.current.email = e.target.value)} />
                        </div>
                        {/* {state?.error?.email && (
                            <p className="text-xs text-red-600">{state.error.email}</p>
                        )} */}
                        <div className="mb-5 p-2 flex flex-col gap-y-3">
                            <Label htmlFor="password">Password:</Label>
                            <Input id="password" name="password" type="password" onChange={(e) => (data.current.password = e.target.value)} />
                        </div>
                        {/* {state?.error?.password && (
                            <div className="text-xs text-red-600">
                                <p className="text-xs">password must:</p>
                                <ul>
                                    {state.error.password.map((error) => (
                                        <li key={error}>{error}</li>
                                    ))}
                                </ul>
                            </div>
                        )} */}
                        {/* <SubmitButton>Sign Up</SubmitButton> */}
                        <button type="submit" className={`${buttonVariants({ variant: "secondary" })}`}>Sign Up</button>
                        <div className="text-xs mt-5 flex gap-x-2 items-center">
                            <p>already have an account?</p>
                            <Link href="/auth/signin" className={`${buttonVariants({ variant: "link" })}`}>
                                Sign In
                            </Link>
                        </div>
                    </div>
                </form>
                </CardContent>
            </CardContent>
    )
}

export default SignUpForm;