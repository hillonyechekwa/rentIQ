import { buttonVariants } from '@/components/ui/button';
import SignUpForm from './SignUpForm';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { BACKEND_URL } from "@/lib/contants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGoogle } from "@fortawesome/free-brands-svg-icons"
import Image from 'next/image';
import dummy from "../../../public/dummy.jpg"


const SignUpPage = () => {
    return (
        <main className="grid grid-cols-2 grid-rows-1 justify-evenly items-center w-full h-screen">
            <Image src={dummy} alt="placeholder image" className="w-full h-full"/>
            <section className="w-full h-full grid place-items-center">
            <Card className="">
                <CardContent className="grid place-items-center gap-y-5">
                    {/* <h1>SignUp</h1> */}
                    <SignUpForm />
                    <Separator orientation='horizontal' className="w-4/5 h-0.5 mx-auto" />
                    <a href={`${BACKEND_URL}/auth/google/login`} className={`${buttonVariants({ variant: "secondary" })}`}>
                        <FontAwesomeIcon icon={faGoogle} size="sm" />
                        Sign Up With Google
                    </a>
                </CardContent>
            </Card>
            </section>
        </main>
    )
}

export default SignUpPage;

