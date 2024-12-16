"use client"

import { useSession } from "next-auth/react"


const Feed = () => {
    const {data: session} = useSession()

    

    return (
        <main className="text-3xl font-semibold w-full h-auto">
            <section className="h-screen w-full grid place-items-center">
                <h1>{session?.user.username}, Welcome to your feed!</h1>
            </section>
        </main>
    )
}

export default Feed