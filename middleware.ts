import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'


export function middleware (req: NextRequest){
    const path = req.nextUrl.pathname;

    //public paths thet don't require authentitcation
    const isPublicPath = path === '/login' || path === '/signup' || path === '/';

    //get token from cookies
    const token = req.cookies.get('access_token')?.value || ''


    //if trying to access public path and already authenticated, redirect to feed
    if(isPublicPath && token){
        return NextResponse.redirect(new URL('/feed', req.url))
    }

    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/login', req.url))
    }


    return NextResponse.next()

}



export const config = {
    matcher: [
        '/',
        '/feed/:path*',
        '/login',
        '/signup'
    ]
}