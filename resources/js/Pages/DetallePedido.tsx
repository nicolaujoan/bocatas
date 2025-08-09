import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CommonLayout from '@/Layouts/Pedidos/CommonLayout';
import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';

interface PageProps {
    flash?: {
        success?: string;
        error?: string;
    };
    // Add any other props you're using from the backend here
}

export default function DetallePedido({ order }: any) {
    const { props } = usePage() as {
        props: {
            flash?: {
                success?: string;
                error?: string;
            };
        };
    };

    const successMessage = props.flash?.success as string | undefined;

    const [fields, setFields] = useState(order.details);

    const handleAddField = () => {
        setFields([...fields, { key: '', value: '' }]);
    };

    const handleRemoveField = (index: number) => {
        const updatedFields = fields.filter((_: any, i: any) => i !== index);
        setFields(updatedFields);
    };

    const handleFieldChange = (index: number, name: string, value: string) => {
        const updatedFields = fields.map((field: any, i: any) =>
            i === index ? { ...field, [name]: value } : field,
        );
        setFields(updatedFields);
    };

    const handleSubmit = () => {
        console.log(order);
        router.post('update', {
            order_id: order.order_id,
            details: fields,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Detalle Pedido
                </h2>
            }
        >
            {successMessage && (
                <div className="text-green-600">{successMessage}</div>
            )}
            <CommonLayout>
                <div className="space-y-4">
                    {fields.map((field: any, index: number) => (
                        <div
                            key={index}
                            className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-2 sm:space-y-0"
                        >
                            <input
                                type="text"
                                placeholder="Key"
                                value={field.key}
                                className="w-full rounded border px-3 py-2 sm:w-auto"
                                onChange={(e) =>
                                    handleFieldChange(
                                        index,
                                        'key',
                                        e.target.value,
                                    )
                                }
                            />
                            <input
                                type="text"
                                placeholder="Value"
                                value={field.value}
                                className="w-full rounded border px-3 py-2 sm:w-auto"
                                onChange={(e) =>
                                    handleFieldChange(
                                        index,
                                        'value',
                                        e.target.value,
                                    )
                                }
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveField(index)}
                                className="self-start text-sm text-red-500 hover:underline sm:self-auto"
                            >
                                Quitar
                            </button>
                        </div>
                    ))}

                    <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-2 sm:space-y-0">
                        <button
                            type="button"
                            onClick={handleAddField}
                            className="w-full rounded bg-blue-500 px-4 py-2 text-white sm:w-auto"
                        >
                            Añadir item
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="w-full rounded bg-green-500 px-4 py-2 text-white sm:w-auto"
                        >
                            Actualizar
                        </button>
                    </div>
                </div>
            </CommonLayout>
        </AuthenticatedLayout>
    );
}
