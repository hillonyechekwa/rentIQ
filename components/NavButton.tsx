import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";



const NavButton = ({children, path} : Readonly<{children: React.ReactNode, path: string}>) => {
    const router = useRouter()
    return (
        <Button onClick={() => router.push(path as string)}>
            {children}
        </Button>
    )
}

export default NavButton;