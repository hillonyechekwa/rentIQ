import Nav from "@/components/Nav";
import React from "react";

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return (
        <main>
            <Nav />
            {children}
        </main>
        
    )
}