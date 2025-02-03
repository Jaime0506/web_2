const URL = 'http://localhost:4000/users'

export const getUsers = async () => {
    const response = await fetch(`${URL}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })

    const data = await response.json()
    
    return data
}