import {createSession} from "@/lib/session"
import {redirect} from "next/navigation"
import { NextRequest } from "next/server"



export async function GET(req: NextRequest) {
    const {searchParams} = new URL(req.url)

    const accessToken = searchParams.get("access_token")
    const refreshToken = searchParams.get("refresh_token")
    const userId = searchParams.get("userId")
    const username = searchParams.get("username")

    if (!accessToken || !refreshToken || !userId || !username ) throw new Error("Google OAuth Failed!")

    await createSession({
        user: {
            id: userId,
            username: username,
        },
        accessToken,
        refreshToken
    })
    redirect("/")
}