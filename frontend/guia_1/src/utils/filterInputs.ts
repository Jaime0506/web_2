const inputs = [
    {
        key: "id",
        label: "id"
    },
    {
        key: "first_name",
        label: "Nombre"
    },
    {
        key: "last_name",
        label: "Apellido"
    },
    {
        key: "phone",
        label: "Telefono"
    },
    {
        key: "address",
        label: "Direccion"
    }
]

export const filterInputs = (excludeKeys: string[]) => {
    if (excludeKeys.length === 0) return inputs
    return inputs.filter(item => !excludeKeys.includes(item.key))
}