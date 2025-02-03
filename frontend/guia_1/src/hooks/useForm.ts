import { useEffect, useState } from "react"
import { UserType } from "../types";

interface useFormProps {
    initialState: UserType
}

export const useForm = ({initialState}: useFormProps) => {
    const [form, setForm] = useState(initialState);

    useEffect(() => {
        console.log(form)
    }, [form]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name.toLowerCase()]: e.target.value
        })
    }

    return {
        form,

        handleInputChange
    }
}