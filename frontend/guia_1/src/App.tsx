import { useEffect, useState } from "react"
import { Form } from "./components/Form"
import { getUsers } from "./utils/api"
import { UserType } from "./types"
import { DataTable } from "./components/DataTable"

export const App = () => {
    const [users, setUsers] = useState<UserType[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getUsers()
            setUsers(data)
        }

        fetchData()
    },[])

    return (
        <main className='flex flex-col h-screen'>
            <div className='p-8 flex justify-center'>
                <h1 className='text-4xl font-bold'>
                    Formulario de datos
                </h1>
            </div>
            <div className=' p-8 flex-1 flex justify-center'>
                <Form />
            </div>
            <div className='p-8 flex flex-1 flex-col gap-10'>
                <h3 className='text-4xl font-bold'>
                    Registros
                </h3>
                <DataTable users={users}/>
            </div>
        </main>
    )
}