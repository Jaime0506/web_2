import { Input } from "@heroui/input"
import { filterInputs } from "../utils/filterInputs"

interface InputsFormProps {
    excludeKeys?: string[]
}

export const InputsForm = ({ excludeKeys = [] }: InputsFormProps) => {
    return (
        <div className="grid items-center w-full">

            {
                filterInputs(excludeKeys).map(item => (
                    <Input
                        name={item.key}
                        key={item.key}
                        label={item.label}
                        labelPlacement="outside"
                        placeholder={item.label}
                        type={item.key === "id" || item.key === "phone" ? "number" : "text"}
                        className={`${item.label === "Direccion" ? "col-span-2" : ""} p-4`}
                        variant='bordered'
                        radius='sm'
                        // onChange={handleInputChange}
                        // value={form[item.key as keyof UserType]?.toString() || ""}
                    />
                ))
            }
        </div>
    )
}
