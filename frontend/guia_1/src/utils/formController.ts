import type { UserType } from "../types"
import type { Dispatch, SetStateAction } from "react"
import { addUser, deleteUser, findUsersByQueries, updateUser } from "./api"

interface formControllerTypes {
    formValues: UserType
    submitterName: string
    setUsers: Dispatch<SetStateAction<UserType[] | null>>
}

export const formController = ({formValues, submitterName, setUsers }: formControllerTypes) => {
    if (submitterName === "addUsers") {
        return addUser(formValues, setUsers)
    }

    if (submitterName === "findUsers") {
        return findUsersByQueries(formValues, setUsers)
    }

    if (submitterName === "deleteUsers") {
        if (formValues.id) return deleteUser(formValues.id, setUsers)
    }

    if (submitterName === "updateUsers") {
        if (formValues.id) return updateUser(formValues, setUsers)

        console.log("Tengo que actualizar")
    }
}