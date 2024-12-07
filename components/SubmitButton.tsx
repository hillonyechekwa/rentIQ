"use Client"

import {Button} from "@/components/ui/button";
import {PropsWithChildren} from "react"
import {useFormStatus} from 'react-dom'


const SubmitButton = ({children}: PropsWithChildren) => {
    const {pending} = useFormStatus()

    return(
        <Button type="submit" aria-disabled={pending} className="px-5">
            {pending? "Submitting..." : children}
        </Button>
    )
}


export default SubmitButton