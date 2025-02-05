import { Button } from '@heroui/button'
import { UserType } from '../types'
import { AddUsersForm } from './AddUsersForm'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'

import type { Dispatch, SetStateAction } from 'react'
import { formController } from '../utils/formController'
import { FindUsersForm } from './FindUsersForm'

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

    return (
        <form onSubmit={handleOnSubmit} className='w-full'>
            <Tabs className="w-full rounded" >
                <TabList>
                    <Tab>Agregar</Tab>
                    <Tab>Buscar</Tab>
                </TabList>
                <TabPanel className="">
                    <AddUsersForm excludeKeys={[]} />
                    <div className='flex items-center justify-center mt-2'>
                        <Button
                            name='addUsers'
                            radius='md'
                            className='bg-black w-[96%] text-white col-span-2'
                            type='submit'
                        >
                            Agregar usuario
                        </Button>
                    </div>
                </TabPanel>

                <TabPanel>
                    <FindUsersForm />

                    <div className='flex items-center justify-center mt-2'>
                        <Button
                            name='findUsers'
                            radius='md'
                            className='bg-black w-[96%] text-white col-span-2'
                            type='submit'
                        >
                            Buscar usuario
                        </Button>
                    </div>

                </TabPanel>
            </Tabs>

        </form>
    )
}
