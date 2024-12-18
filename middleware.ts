import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/session";
import { cookies } from "next/headers";



//specify protected public route
const protectedRoutes = ["/feed"]
const publicRoutes = ["/", "/auth/login", "/auth/register"]

export default async function middleware(req: NextRequest) {
    //check if current route is protected or public
    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)
    const isPublicRoute = publicRoutes.includes(path)

    
    //decrypt session from cookie
    const cookie = (await cookies()).get('session')?.value
    let session

    try {
        session = cookie ? await decrypt(cookie) : null
    } catch (error) {
        console.error("Middleware session verification error", error)
    }


    //redirect to /login if the user is not authenticated
    if (isProtectedRoute && !session?.user?.userId) {
        return NextResponse.redirect(new URL('/auth/login', req.nextUrl))
    }


    //redirect to /feed if user is authenticated
    if (isPublicRoute && session?.user?.userId && !req.nextUrl.pathname.startsWith('/feed')) {
        return NextResponse.redirect(new URL("/feed", req.nextUrl))
    }

    return NextResponse.next()
}


//routes middleware shouldn't run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};