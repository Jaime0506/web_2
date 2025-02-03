import { Button } from '@heroui/button'
import { Input } from '@heroui/input'
import { useForm } from '../hooks/useForm'
import { UserType } from '../types'
import { addUser } from '../utils/api'

const inputs = [
    {
        key: "id",
        label: "ID"
    },
    {
        key: "nombre",
        label: "Nombre"
    },
    {
        key: "apellido",
        label: "Apellido"
    },
    {
        key: "telefono",
        label: "Telefono"
    },
    {
        key: "direccion",
        label: "Direccion"
    }
]
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

        addUser(form)
    }

    return (
        <form onSubmit={handleOnSubmit} className='grid grid-cols-2 w-full grid-rows-4 gap-x-10 gap-y-5 justify-center p-4 items-center shadow-md rounded'>
            {
                inputs.map((item) => (
                    <Input
                        name={item.key}
                        key={item.key}
                        label={item.label}
                        labelPlacement="outside"
                        placeholder={item.label}
                        type={item.key === "id" || item.key === "telefono" ? "number" : "text"}
                        className={item.label === "Direccion" ? "col-span-2" : ""}
                        variant='bordered'
                        radius='sm'
                        onChange={handleInputChange}
                        value={form[item.key as keyof UserType]?.toString() || ""}
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
