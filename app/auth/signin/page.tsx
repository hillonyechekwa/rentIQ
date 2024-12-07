import {BACKEND_URL} from '@/lib/contants'
import SignInForm from "./SignInForm"
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { buttonVariants } from '@/components/ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import Image from 'next/image';
import dummy from "../../../public/dummy.jpg"


const SignInPage = () => {
    return (
        <main className="grid grid-cols-2 grid-rows-1 justify-evenly items-center w-full h-screen">
            {/* <Link href="" */}
            <Image src={dummy} alt="placeholder image" className="w-full h-full" />
            <section className="w-full h-full grid place-items-center">
        <Card>
            <CardContent className="grid place-items-center gap-y-5">
            <SignInForm />
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

