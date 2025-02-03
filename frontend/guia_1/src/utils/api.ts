import { UserType } from "../types"

const URL = 'http://localhost:4000/users'

export const getUsers = async () => {
    const response = await fetch(`${URL}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })

    const data = await response.json()

    return data
}

export const getUser = async () => { }

export const addUser = async (user: UserType) => {
    const newUser = { ...user }
    delete newUser.id

    // Problemas con las kyes del objeto, no coinciden como lo espera la api

    const response = await fetch(`${URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
    })

    const data = await response.json()
    console.log(data)
}