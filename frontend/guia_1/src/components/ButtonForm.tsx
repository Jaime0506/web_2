import { Button } from "@heroui/button"

interface ButtonFormProps {
    name: string,
    label: string
}

export const ButtonForm = ({ name, label }: ButtonFormProps) => {
    return (
        <div className='flex items-center justify-center mt-2'>
            <Button
                name={name}
                radius='md'
                className='bg-black w-[96%] text-white col-span-2'
                type='submit'
            >
                {label}
            </Button>
        </div>
    )
}
