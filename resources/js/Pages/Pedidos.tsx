import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Pedidos({ pedidos }: any) {

    useEffect(() => {
        console.log(pedidos);
    }, [])


    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Mis Pedidos
                </h2>
            }
        >
            <Head title="Pedidos" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {pedidos.length ?
                                <ul>
                                    {pedidos.map((pedido: any) => (
                                        <li key={pedido.id}>
                                            {pedido.name} - {new Date(pedido.created_at).toLocaleString()}
                                        </li>
                                    ))}
                                </ul>
                                : <>
                                    Todavía no has hecho ningún pedido!
                                    <button style={{ border: '1px solid black', marginLeft: '1rem', padding: 4, borderRadius: 25 }}>
                                        <b>Crear pedido</b>
                                    </button>
                                </>

                            }
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
