"use client"

import { Sidebar, SidebarContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar"
import { Home, User, Bell, Search } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"



//Menu items
const items = [
    {
        title: "Home",
        url: "#",
        icon: Home
    },
    {
        title: "Profile",
        url: "#",
        icon: User
    },
    {
        title: "Notifications",
        url: "#",
        icon: Bell
    },
    {
        title: "Search",
        url: "#",
        icon: Search
    }
]

export const AppSidebar = () => {
    const pathname = usePathname()

    if (pathname === "/auth/signup" || pathname === "/auth/signin") {
        return null
    }

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild>
                                <Link href={item.url}>
                                    <item.icon />
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    )
}