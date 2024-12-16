"use client"
import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRef } from 'react'
import { buttonVariants } from "@/components/ui/button"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"



type FormInputs = {
    email: string;
    password: string
}

interface FormProps {
    callbackUrl?: string
}


const SignInForm = (props: FormProps) => {

    const data = useRef<FormInputs>({
        email: "",
        password: ""
    })


    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log("submitted")
        await signIn("credentials", {
            email: data.current.email,
            password: data.current.password,
            redirect: true,
            callbackUrl: props.callbackUrl ?? "http://localhost:3000/"
        })
    }


    return(
        <CardContent className="grid place-items-center">
            <CardHeader>
                <CardTitle className="text-3xl">Sign In</CardTitle>
                <CardDescription>continue finding new insights.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={onSubmit}>
                <div className="flex flex-col justify-between items-center p-3">
                    {/* {state?.message && (
                        <p>{state.message}</p>
                    )} */}
                    <div className="mb-5 p-2 flex-col gap-y-3">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" placeholder="jace@piltover.com" type="email" onChange={(e) => (data.current.email = e.target.value)} />
                    </div>
                    {/* {state?.error?.email && (
                        <p>{state.error.email}</p>
                    )} */}
                        <div className="mb-5 p-2 flex-col gap-y-3">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" name="password" type="password" onChange={(e) => (data.current.password = e.target.value)} />
                    </div>
                    {/* {state?.error?.password && (
                        <p>{state.error.password}</p>
                    )} */}
                        <Link href="/" className={`text-xs mb-2 ${buttonVariants({variant: "link"})}`}>Forgot password?</Link>
                        <button type="submit" className={`${buttonVariants({variant: "secondary"})}`}>Sign In</button>
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