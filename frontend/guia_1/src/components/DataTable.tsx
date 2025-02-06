import { getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/table"
import { UserType } from "../types"

const dataColumns = [
    {
        key: "id",
        label: "ID"
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

interface DataTableProps {
    users: UserType[] | null
}

export const DataTable = ({ users }: DataTableProps) => {
    return (
        <Table aria-label="Table users">
            <TableHeader columns={dataColumns}>
                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            {
                (users && users.length > 0) ? (
                    <TableBody items={users}>
                        {(item) => (
                            <TableRow key={item.id}>
                                {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                ) : (
                    <TableBody emptyContent={"Not users to display"}>
                        {[]}
                    </TableBody>
                )
            }
        </Table>
    )
}
