import {getProfile} from "@/lib/actions"

const Profile = async () => {
    const res = await getProfile()
    return (
        <div>
            Profile page
            <p>{JSON.stringify(res)}</p>
        </div>
    )
}

export default Profile