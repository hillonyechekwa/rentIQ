"use client"
import { usePathname } from "next/navigation";




const Footer = () => {
    const pathname = usePathname()


    if (pathname === "/auth/signup" || pathname === "/auth/signin") {
        return null
    }
    return (
        <nav className="w-full h-screen p-5 bg-secondary"></nav>
    )
}


export default Footer;