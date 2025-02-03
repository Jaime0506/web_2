import { useState } from "react"
import { UserType } from "../types";

interface useFormProps {
    initialState: UserType
}

export const useForm = ({initialState}: useFormProps) => {
    const [form, setForm] = useState(initialState);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name.toLowerCase()]: e.target.value
        })

        console.log(form)
    }

    return {
        form,

        handleInputChange
    }
}