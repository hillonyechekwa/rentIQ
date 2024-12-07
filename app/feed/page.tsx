import {getSession} from "@/lib/session"
import {redirect} from "next/navigation"


const Feed = async () => {
    const session = await getSession()
    if (!session || !session.user) redirect("auth/signin")
    console.log({session})

    return (
        <div>
            Feed
        </div>
    )
}

export default Feed