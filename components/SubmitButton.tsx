"use Client"

import {Button} from "@/components/ui/button";
import {PropsWithChildren} from "react"
// import {useFormStatus} from 'react-dom'


const SubmitButton = ({children}: PropsWithChildren) => {
    // const {pending} = useFormStatus()

    return(
        <Button type="submit" className="px-5">
            {children}
        </Button>
    )
}


export default SubmitButton