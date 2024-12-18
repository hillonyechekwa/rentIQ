"use client"


import { signUp } from "@/actions/auth"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
// import { useRef } from "react"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useFormState } from "react-dom"
// import { signIn } from "next-auth/react"
// import SubmitButton from "@/components/SubmitButton"
import { buttonVariants } from "@/components/ui/button"
// import { redirect } from "next/navigation"
// import { useFormState } from "react-dom"
// import { BACKEND_URL } from "@/lib/constants"




// type FormInputs = {
//     username: string,
//     email: string,
//     password: string
// }



const SignUpForm = () => {
    const [state, action, pending] = useFormState(signUp, undefined)

    // const data = useRef<FormInputs>({
    //     username: "",
    //     email: "",
    //     password: ""
    // })


    // const handleSubmit = async (username: string, email: string, password: string) => {
    //     await signIn("signup-credentials", {username, email, password, redirect: false})
    //     redirect("/feed")
    // }


    // const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault()

    //     console.log("submitting....")

    //     const res = await fetch("/api/signup", {
    //         method: "POST",
    //         body: JSON.stringify({
    //             username: data.current.username,
    //             email: data.current.email,
    //             password: data.current.password
    //         }),
    //         headers: {
    //             "Content-Type": "application/json"
    //         }
    //     })
    //     console.log("authenticating...")
    //     console.log("response", res)
    //     if (!res.ok) {
    //         throw new Error("Form submission failed!")
    //     }
    //     const result = await res.json()
    //     console.log("done!!")
    //     console.log("signup response", result)
    //     //?how do I harness next-auth here to create a new session before redirecting to the feed page??
    //     redirect("/feed") //* tweak to redirect to onboarding page later on

    // }

    return (
        <CardContent className="grid place-items-center">
            <CardHeader>
                <CardTitle className="text-3xl">Sign Up</CardTitle>
                <CardDescription>Begin your journey to better insights.</CardDescription>
            </CardHeader>
            <CardContent>
                <form action={action}>
                    <div className="flex flex-col justify-between items-center p-3 ">
                       
                        <div className="mb-5 p-2 flex flex-col gap-y-3">
                            <Label htmlFor="username">Username:</Label>
                            <Input id="username" name="username" type="text" placeholder="Jynx"  />
                        </div>
                        {state?.error?.username && <p>{state.error.username}</p>}
                        <div className="mb-5 p-2 flex flex-col gap-y-3">
                            <Label htmlFor="email">Email:</Label>
                            <Input id="email" name="email" type="email" placeholder="Jynx@zaun.com"  />
                        </div>
                        {state?.error?.email && <p>{state.error.email}</p>}
                        <div className="mb-5 p-2 flex flex-col gap-y-3">
                            <Label htmlFor="password">Password:</Label>
                            <Input id="password" name="password" type="password"  />
                        </div>
                        {
                            state?.error?.password && (
                                <div>
                                    <p>Password must:</p>
                                    <ul>
                                        {
                                            state.error.password.map((error) => (<li key={error}>- {error}</li>))
                                        }
                                    </ul>
                                </div>
                            )
                        }
                        {/* <SubmitButton>Sign Up</SubmitButton> */}
                        <button disabled={pending} type="submit" className={`${buttonVariants({ variant: "secondary" })}`}>Sign Up</button>
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