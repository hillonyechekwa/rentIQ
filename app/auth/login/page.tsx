import Link from 'next/link'
import {BACKEND_URL} from '@/lib/constants'
import LoginForm from "./LoginForm"
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { buttonVariants } from '@/components/ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import Image from 'next/image';
import dummy from "../../../public/dummy.jpg"


const SignInPage = () => {
    return (
        <main className="relative grid grid-cols-2 grid-rows-1 justify-evenly items-center w-full h-screen">
            <Link href="/" className={`absolute top-0 left-0 text-white ${buttonVariants({variant: "link"})}`}> <FontAwesomeIcon icon={faArrowLeft} size="xs" /> go back</Link>
            <Image src={dummy} alt="placeholder image" className="w-full h-full" />
            <section className="w-full h-full grid place-items-center">
        <Card>
            <CardContent className="grid place-items-center gap-y-5">
            <LoginForm />
            <Separator orientation='horizontal' className="w-4/5 h-0.5 mx-auto" />
                <a href={`${BACKEND_URL}/auth/google/login`} className={buttonVariants({variant: "secondary"})}>
                    <FontAwesomeIcon icon={faGoogle} size="xs" />
                    Sign In With Google</a>
            </CardContent>
                </Card>
                </section>
            </main>
    )
}

export default SignInPage;

