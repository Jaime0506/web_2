import type { UserType } from "../types"
import type { Dispatch, SetStateAction } from "react"
import { addUser, findUsersByQueries } from "./api"

interface formControllerTypes {
    formValues: UserType
    submitterName: string
    setUsers: Dispatch<SetStateAction<UserType[] | null>>
}

export const formController = ({formValues, submitterName, setUsers }: formControllerTypes) => {
    if (submitterName === "addUsers") {
        addUser(formValues, setUsers)
    }

    if (submitterName === "findUsers") {
        console.log("Necesito buscar")
        findUsersByQueries(formValues, setUsers)
    }
}