"use client"
import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"
import {signIn} from "@/lib/auth"
import Link from "next/link"
import {useFormState} from "react-dom"
import SubmitButton from "@/components/SubmitButton"
import { buttonVariants } from "@/components/ui/button"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"


const SignInForm = () => {
    const [state, action] = useFormState(signIn, undefined)
    return(
        <CardContent className="grid place-items-center">
            <CardHeader>
                <CardTitle className="text-3xl">Sign In</CardTitle>
                <CardDescription>continue finding new insights.</CardDescription>
            </CardHeader>
            <CardContent>
            <form action={action}>
                <div className="flex flex-col justify-between items-center p-3">
                    {state?.message && (
                        <p>{state.message}</p>
                    )}
                    <div className="mb-5 p-2 flex-col gap-y-3">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" placeholder="jace@piltover.com" type="email" />
                    </div>
                    {state?.error?.email && (
                        <p>{state.error.email}</p>
                    )}
                        <div className="mb-5 p-2 flex-col gap-y-3">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" name="password" type="password" />
                    </div>
                    {state?.error?.password && (
                        <p>{state.error.password}</p>
                    )}
                    <Link href="/" className="text-xs">Forgot password?</Link>
                    <SubmitButton>Sign In</SubmitButton>
                    <div className="text-xs mt-5 flex gap-x-2 items-center">
                        <p>don&apos;t have an account?</p>
                        <Link href="/auth/signup" className={buttonVariants({variant: "link"})}>
                            Sign Up
                        </Link>
                    </div>
                </div>
            </form>
            </CardContent>
        </CardContent>
    )
}

export default SignInForm;