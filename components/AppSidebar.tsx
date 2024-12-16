"use client"

import { Sidebar, SidebarContent, SidebarMenu, SidebarGroup, SidebarGroupContent, SidebarMenuButton, SidebarMenuItem, SidebarGroupLabel } from "./ui/sidebar"
import { Home, User, Bell, Search, Bookmark } from "lucide-react"
import { Separator } from "./ui/separator"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { buttonVariants } from "./ui/button"



//Menu items
const items = [
    {
        title: "Home",
        url: "/feed",
        icon: Home
    },
    {
        title: "Profile",
        url: "/profile",
        icon: User
    },
    {
        title: "Notifications",
        url: "/notifications",
        icon: Bell
    },
    {
        title: "Bookmarks",
        url: "/bookmarks",
        icon: Bookmark
    },
    {
        title: "Search",
        url: "/search",
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
            <SidebarContent className="w-full h-full">
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu className="w-full">
                            <SidebarMenuItem>
                                <h3>Welcome</h3>
                            <Separator orientation="horizontal" className="w-4/5"/>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>
                        <h3>Application</h3>
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="flex flex-col w-full p-3 pl-10 h-full justify-center items-start gap-y-10">
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url} className="text-3xl">
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild className={`${buttonVariants({variant: "outline"})}`}>
                                    <a href="/api/auth/signout">Sign Out</a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}