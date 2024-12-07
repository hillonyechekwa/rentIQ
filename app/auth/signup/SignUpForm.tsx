"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { signUp } from "@/lib/auth"
import Link from "next/link"
import { useFormState } from "react-dom"
import SubmitButton from "@/components/SubmitButton"
import { buttonVariants } from "@/components/ui/button"




const SignUpForm = () => {
    const [state, action] = useFormState(signUp, undefined)
    return (
        <CardContent className="grid place-items-center">
            <CardHeader>
                <CardTitle className="text-3xl">Sign Up</CardTitle>
                <CardDescription>Begin your journey to better insights.</CardDescription>
            </CardHeader>
            <CardContent>
                <form action={action}>
                    <div className="flex flex-col justify-between items-center p-3 ">
                        {state?.message && (
                            <p>{state.message}</p>
                        )}
                        <div className="mb-5 p-2 flex flex-col gap-y-3">
                            <Label htmlFor="username">Username:</Label>
                            <Input id="username" name="username" type="text" placeholder="Jynx" />
                        </div>
                        {state?.error?.username && (
                            <p>{state.error.username}</p>
                        )}
                        <div className="mb-5 p-2 flex flex-col gap-y-3">
                            <Label htmlFor="email">Email:</Label>
                            <Input id="email" name="email" type="email" placeholder="Jynx@zaun.com" />
                        </div>
                        {state?.error?.email && (
                            <p>{state.error.username}</p>
                        )}
                        <div className="mb-5 p-2 flex flex-col gap-y-3">
                            <Label htmlFor="password">Password:</Label>
                            <Input id="password" name="password" type="password" />
                        </div>
                        {state?.error?.password && (
                            <div>
                                <p>password must:</p>
                                <ul>
                                    {state.error.password.map((error) => (
                                        <li key={error}>{error}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <SubmitButton >Sign Up</SubmitButton>
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