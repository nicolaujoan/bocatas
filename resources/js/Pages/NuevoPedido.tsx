import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CommonLayout from "@/Layouts/Pedidos/CommonLayout";
import { useState } from "react";

export default function NuevoPedido({ }: any) {

    const [fields, setFields] = useState([{ key: "", value: "" }]);

    const handleAddField = () => {
        setFields([...fields, { key: "", value: "" }]);
    };

    const handleRemoveField = (index: number) => {
        const updatedFields = fields.filter((_, i) => i !== index);
        setFields(updatedFields);
    };

    const handleFieldChange = (index: number, name: string, value: string) => {
        const updatedFields = fields.map((field, i) =>
            i === index ? { ...field, [name]: value } : field
        );
        setFields(updatedFields);
    };

    const handleSubmit = () => {
        console.log("Submitted Data:", fields);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Nuevo Pedido
                </h2>
            }
        >
            <CommonLayout>
                <div className="space-y-4">
                    {fields.map((field, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <input
                                type="text"
                                placeholder="Key"
                                value={field.key}
                                onChange={(e) =>
                                    handleFieldChange(index, "key", e.target.value)
                                }
                                className="border px-2 py-1 rounded"
                            />
                            <input
                                type="text"
                                placeholder="Value"
                                value={field.value}
                                onChange={(e) =>
                                    handleFieldChange(index, "value", e.target.value)
                                }
                                className="border px-2 py-1 rounded"
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveField(index)}
                                className="text-red-500"
                            >
                                Quitar
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={handleAddField}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Añadir item
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="ml-2 px-4 py-2 bg-green-500 text-white rounded"
                    >
                        Crear
                    </button>
                </div>
            </CommonLayout>
        </AuthenticatedLayout>
    )
}