import { Button } from '@heroui/button'
import { Input } from '@heroui/input'
import { useForm } from '../hooks/useForm'
import { UserType } from '../types'

const inputs = ["ID", "Nombre", "Apellido", "Telefono", "Direccion"]
const INITIAL_STATE_FORM: UserType = {
    id: 0,
    nombre: "",
    apellido: "",
    telefono: "",
    direccion: ""
}

export const Form = () => {
    const { form, handleInputChange } = useForm({initialState: INITIAL_STATE_FORM,})
    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        console.log("Me llamaron")
        console.log(form)
    }

    return (
        <form onSubmit={handleOnSubmit} className='grid grid-cols-2 w-full grid-rows-4 gap-x-10 justify-center p-4 items-center shadow-md rounded'>
            {
                inputs.map((value) => (
                    <Input
                        key={value}
                        label={value}
                        labelPlacement="outside"
                        placeholder={value}
                        type="text"
                        className={value === "Direccion" ? "col-span-2" : ""}
                        variant='bordered'
                        radius='sm'
                        onChange={handleInputChange}
                        // value={}
                    />
                ))
            }

            <Button 
                radius='sm'
                className='bg-black text-white col-span-2'
                type='submit'
            >
                Agregar Datos
            </Button>
        </form>
    )
}
