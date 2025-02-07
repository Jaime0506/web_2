import { Dispatch, SetStateAction } from "react"
import { UserType } from "../types"

const URL = 'http://localhost:4000/users'

export const getUsers = async (setUsers: Dispatch<SetStateAction<UserType[] | null>>) => {
    const response = await fetch(`${URL}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })

    const data = await response.json()
    console.log("Me llamaron")
    setUsers(data)
}

export const findUsersByQueries = async (user: UserType, setUsers: Dispatch<SetStateAction<UserType[] | null>>) => {
    const filteredQuery = Object.fromEntries(
        Object.entries(user).filter(([, v]) => v !== "")
    )

    if (Object.keys(filteredQuery).length === 0) {
        return
    }

    try {
        const queryParams = new URLSearchParams(filteredQuery).toString()
        const response = await fetch(`${URL}?${queryParams}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })

        const data = await response.json()
        setUsers(data || [])

    } catch (error) {
        console.log(error)
    }
}

export const addUser = async (user: UserType, setUsers: Dispatch<SetStateAction<UserType[] | null>>) => {
    const newUser = { ...user }
    delete newUser.id

    // Problemas con las kyes del objeto, no coinciden como lo espera la api

    const response = await fetch(`${URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
    })

    const data = await response.json()

    // Tengo que hacer uso de un nullish coalescing, ya que como mi estado
    // puede ser null o un [] de usuarios, cuando usamos el spred operator,
    // va a dar error al tratar de destructurar algo nulo, x lo tanto debo asegurarme
    // que si o si haya un arreglo, asi sea vacio.

    // ?? si el de la izquierda es diferente de null o undefined toma ese valor, en caso
    // contrario toma el valor x defecto de
    setUsers(users => ([
        ...(users ?? []),
        data
    ]))
}

export const deleteUser = async (id: number, setUsers: Dispatch<SetStateAction<UserType[] | null>>) => {
    const response = await fetch(`${URL}/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })

    const data = await response.json()
    setUsers(users => (users?.filter(user => user.id !== data.id) || []))
}

export const updateUser = async (user: UserType, setUsers: Dispatch<SetStateAction<UserType[] | null>>) => {
    const response = await fetch(`${URL}/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    })

    const data = await response.json()
    setUsers((prevUsers) => (
        prevUsers ? prevUsers.map((u) => (u.id === data.id ? data : u)) : []
    ))
}