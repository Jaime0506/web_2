import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import { ButtonForm } from './ButtonForm'
import { InputsForm } from './InputsForm'
import { formController } from '../utils/formController'

import type { Dispatch, SetStateAction } from 'react'
import type { UserType } from '../types'
import { getUsers } from '../utils/api'

interface FormProps {
    setUsers: Dispatch<SetStateAction<UserType[] | null>>
}

export const Form = ({ setUsers }: FormProps) => {
    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const submitter = (e.nativeEvent as SubmitEvent).submitter

        if (!(submitter instanceof HTMLButtonElement)) return;

        const formValues = Object.fromEntries(formData)

        // Se hace la respectiva validaciones bla bla bla
        formController({ formValues, submitterName: submitter.name, setUsers })
        e.currentTarget.reset()
    }

    const onSelectTab = (index: number, lastIndex: number) => {
        if (index === lastIndex) return
        getUsers(setUsers)
    }

    return (
        <form onSubmit={handleOnSubmit} className='w-full'>
            <Tabs className="w-full rounded" onSelect={onSelectTab}>
                <TabList>
                    <Tab>Agregar</Tab>
                    <Tab>Buscar</Tab>
                    <Tab>Actualizar</Tab>
                    <Tab>Eliminar</Tab>
                </TabList>
                <TabPanel>
                    <InputsForm />
                    <ButtonForm label='Agregar usuario' name='addUsers'/>
                </TabPanel>

                <TabPanel>
                    <InputsForm />
                    <ButtonForm label='Buscar usuario' name='findUsers' />

                </TabPanel>

                <TabPanel>
                    <InputsForm />
                    <ButtonForm label='Actualizar' name='updateUsers' />
                </TabPanel>

                <TabPanel>
                    <InputsForm excludeKeys={["first_name", "last_name", "phone", "address"]} />
                    <ButtonForm label='Eliminar usuario' name='deleteUsers' />
                </TabPanel>
            </Tabs>
        </form>
    )
}
