"use server"

import { SignJWT, jwtVerify} from "jose"
import { SessionPayload } from "@/lib/definitions"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"



const secretKey = process.env.SESSION_SECRET_KEY
const encodedKey = new TextEncoder().encode(secretKey)



export async function encrypt(payload: SessionPayload) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256"})
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(encodedKey)
}


export async function decrypt(session: string | undefined = '') {
    // console.log(session)
    if (!session) {
        // console.error("No session token provided")
        return null
    }



    try {
        const { payload } = await jwtVerify(
            session,
            encodedKey,
            {
            algorithms: ["HS256"]
        })

        
        return payload as SessionPayload
    } catch (error) {
        console.error("Failed to verify session", error.message)
    }
}


export async function createSession(payload: SessionPayload) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    const session = await encrypt(payload)

    const cookieStore = await cookies()


    cookieStore.set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/'
    })
}

//*get session function..
export async function getSession() {
    const cookie = (await cookies()).get("session")?.value

    // if (!session) {
    //     redirect("/")
    // }
    try {
        const session = await decrypt(cookie);

        if (!session) {
            console.error("Session is empty or has no payload")
            return null
        }

        // console.log(session)

         return session
       
    } catch (error) {
        console.error("Failed to verify the session", error);
        redirect("/");
    }
}


export async function updateSession() {
    const session = (await cookies()).get('session')?.value
    const payload = await decrypt(session)


    if (!session || !payload) {
        return null
    }
    
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const cookieStore = await cookies()
    cookieStore.set("session", session, {
      httpOnly: true,
      secure: true,
      expires: expires,
      sameSite: "lax",
      path: "/",
    });
}



export async function deleteSession() {
    const cookieStore = await cookies()
    cookieStore.delete('session')
}