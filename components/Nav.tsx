"use client"

import Navlink from 'next/link'
import NavButton from './NavButton'
import { usePathname } from "next/navigation"
// import {useState, useEffect} from 'react'
// import {getSession} from "@/lib/session";
// import { Session } from "@/lib/session"





const Nav = () => {
    const pathname = usePathname()
    // const [inSession, setInSession] = useState<Session | null>(null)

    // useEffect(() => {
    //     const fetchSession = async () => {
    //         const session = await getSession()
    //         setInSession(session)
    //     }

    //     fetchSession()
    // }, [])

    // if (pathname === "/auth/signup" || pathname === "/auth/signin") {
    //     return null
    // }

    return (
        <nav className="absolute top-0 left-10 ">
            <ul className="flex justify-between items-center gap-x-20 p-5">
                <li>
                    <Navlink href="#">Home</Navlink>
                </li>
                <li>
                    <Navlink href="#">About</Navlink>
                </li>
                <li>
                    <Navlink href="/auth/signin">SignIn</Navlink>
                </li>
                <li>
                    <NavButton path="/auth/signup">
                        SignUp
                    </NavButton>
                </li>
            </ul>
        </nav>
    )
}


export default Nav;