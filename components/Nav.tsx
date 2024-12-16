"use client"

import Navlink from 'next/link'
// import NavButton from './NavButton'
import { useSession, signOut, signIn } from 'next-auth/react'
import { Button, buttonVariants } from './ui/button'
import { User } from 'lucide-react'
import { usePathname } from 'next/navigation'






const Nav = () => {

    const { data: session } = useSession()

    const pathname = usePathname()


    if (pathname === "/auth/signin" || pathname === "/auth/signup") {
        return null
    }



    if (session && session.user)
        return (
            <nav className="absolute top-0 left-3/4 ml-5">
                <ul className="flex justify-between items-center gap-x-16 p-5">
                    
                    <li className="flex gap-x-10 items-center">
                            <User size={20} />
                            <p>Welcome, {session.user.username}</p>
                    </li>
                    <li>
                        <Navlink href="" onClick={() => signOut()} className={`${buttonVariants({ variant: 'outline' })}`}>Signout</Navlink>
                    </li>
                </ul>
            </nav>
    )
  

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
                        <Navlink href="" onClick={() => signIn()} className={`${buttonVariants({ variant: 'link' })}`}>SignIn</Navlink>
                    </li>
                    <li>
                        {/* <NavButton path="/auth/signup">
                            SignUp
                        </NavButton> */}

                        <Navlink href="/auth/signup" className={`${buttonVariants({ variant: 'outline' })}`}>SignUp</Navlink>
                    </li>
                </ul>
            </nav>
        )
}


export default Nav;